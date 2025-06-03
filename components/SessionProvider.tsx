import {AuthContext, Session} from "@/context/AuthContext";
import {PropsWithChildren, useEffect, useRef, useState} from "react";
import {useStorageState} from "@/hooks/useStorageState";
import * as AuthSession from "expo-auth-session";
import {authDiscovery} from "@/api/auth";
import {refreshAsync, TokenResponse} from "expo-auth-session";

export function SessionProvider({children}: PropsWithChildren) {
    const [[isLoading, storageSession], setStorageSession] = useStorageState('session');
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        if (!isLoading && storageSession) {
            try {
                const parsed = JSON.parse(storageSession);
                setSession(parsed);
            } catch (e) {
                console.warn('Failed to parse session from storage', e);
                setSession(null);
                setStorageSession(null);
            }
        }
    }, [isLoading, storageSession, setStorageSession, setSession]);

    const storeTokenResponse = (tokenResponse: TokenResponse) => {
        const newSession: Session = {
            accessToken: tokenResponse.accessToken,
            tokenType: tokenResponse.tokenType,
            expiresIn: tokenResponse.expiresIn,
            refreshToken: tokenResponse.refreshToken,
            scope: tokenResponse.scope,
            state: tokenResponse.state,
            idToken: tokenResponse.idToken,
            issuedAt: tokenResponse.issuedAt,
        };
        setStorageSession(JSON.stringify(newSession));
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
                refreshToken: async (): Promise<string> => {
                    if (!session || !session.refreshToken)
                        throw new Error("No refresh token available");

                    const tokenResponse = await refreshAsync({
                        refreshToken: session.refreshToken,
                        clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                        clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!
                    }, authDiscovery);

                    storeTokenResponse(tokenResponse);
                    return tokenResponse.accessToken;
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
