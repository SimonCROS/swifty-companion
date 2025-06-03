import {AuthContext} from "@/context/AuthContext";
import {PropsWithChildren, useCallback, useEffect, useState} from "react";
import {useStorageState} from "@/hooks/useStorageState";
import * as AuthSession from "expo-auth-session";
import {authDiscovery} from "@/api/auth";
import {TokenResponse} from "expo-auth-session";

export function SessionProvider({children}: PropsWithChildren) {
    const [[isStorageLoading, storageSession], setStorageSession] = useStorageState('session');
    const [state, setState] = useState<{
        isLoading: boolean;
        session: TokenResponse | null;
    }>({
        isLoading: true,
        session: null
    });

    useEffect(() => {
        if (isStorageLoading) return;

        try {
            if (!storageSession) {
                setState({isLoading: false, session: null});
                return;
            }

            const parsed = new TokenResponse(JSON.parse(storageSession));
            setState({isLoading: false, session: parsed});
        } catch (e) {
            console.warn('Failed to parse session from storage:', e);
            setStorageSession(null);
            setState({isLoading: false, session: null});
        }
    }, [isStorageLoading, storageSession, setStorageSession]);

    const storeTokenResponse = useCallback((tokenResponse: TokenResponse) => {
        setStorageSession(JSON.stringify(tokenResponse.getRequestConfig()));
    }, [setStorageSession]);

    const signOut = useCallback(() => {
        setStorageSession(null);
    }, [setStorageSession]);

    return (
        <AuthContext.Provider
            value={{
                signIn: async (code: string): Promise<string> => {
                    setState(prev => ({...prev, isLoading: true}));
                    try {
                        const tokenResponse = await AuthSession.exchangeCodeAsync({
                            clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                            clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!,
                            code: code,
                            redirectUri: AuthSession.makeRedirectUri({
                                scheme: process.env.EXPO_PUBLIC_REDIRECT_URI_SCHEME
                            }),
                        }, authDiscovery);

                        storeTokenResponse(tokenResponse);
                        return tokenResponse.accessToken;
                    } catch (error) {
                        setState(prev => ({...prev, isLoading: false}));
                        throw error;
                    }
                },
                getValidToken: async (): Promise<string> => {
                    if (!state.session) throw new Error("No session");

                    if (state.session.shouldRefresh()) {
                        try {
                            const tokenResponse = await state.session.refreshAsync({
                                clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                                clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!
                            }, authDiscovery);

                            storeTokenResponse(tokenResponse);
                            return tokenResponse.accessToken;
                        } catch (error) {
                            console.error('Token refresh failed:', error);
                            signOut();
                            throw new Error('Failed to refresh session');
                        }
                    }

                    return state.session.accessToken;
                },
                signOut,
                session: state.session,
                isLoading: isStorageLoading || state.isLoading,
            }}>
            {children}
        </AuthContext.Provider>
    );
}