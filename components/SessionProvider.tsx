import {AuthContext} from "@/context/AuthContext";
import {PropsWithChildren, useEffect, useState} from "react";
import {useStorageState} from "@/hooks/useStorageState";
import * as AuthSession from "expo-auth-session";
import {authDiscovery} from "@/api/auth";
import {TokenResponse} from "expo-auth-session";

export function SessionProvider({children}: PropsWithChildren) {
    const [[isLoading, storageSession], setStorageSession] = useStorageState('session');
    const [session, setSession] = useState<TokenResponse | null>(null);

    useEffect(() => {
        if (!isLoading) {
            if (!storageSession) {
                setSession(null);
                return;
            }

            try {
                const parsed = new TokenResponse(JSON.parse(storageSession));
                setSession(parsed);
            } catch (e) {
                console.warn('Failed to parse session from storage', e);
                setSession(null);
                setStorageSession(null);
            }
        }
    }, [isLoading, storageSession, setStorageSession, setSession]);

    const storeTokenResponse = (tokenResponse: TokenResponse) => {
        setStorageSession(JSON.stringify(tokenResponse.getRequestConfig()));
    };

    return (
        <AuthContext
            value={{
                signIn: async (code: string): Promise<string> => {
                    const tokenResponse = await AuthSession.exchangeCodeAsync({
                            clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                            clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!,
                            code: code,
                            redirectUri: AuthSession.makeRedirectUri({
                                scheme: process.env.EXPO_PUBLIC_REDIRECT_URI_SCHEME
                            }),
                        },
                        authDiscovery);

                    storeTokenResponse(tokenResponse);
                    return tokenResponse.accessToken;
                },
                getValidToken: async (): Promise<string> => {
                    if (!session) throw new Error("No session");

                    if (session.shouldRefresh()) {
                        try {
                            const tokenResponse = await session.refreshAsync({
                                clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                                clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!
                            }, authDiscovery);

                            storeTokenResponse(tokenResponse);
                            return tokenResponse.accessToken;
                        }
                        catch (error)
                        {
                            console.error(error);
                            setStorageSession(null);
                            throw new Error("Failed to refresh session");
                        }
                    }

                    return session.accessToken;
                },
                signOut: () => {
                    setStorageSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext>
    );
}
