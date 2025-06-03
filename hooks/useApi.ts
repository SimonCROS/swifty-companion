import {useSession} from "@/hooks/useSession";
import {refreshAsync} from "expo-auth-session";
import {authDiscovery} from "@/api/auth";

export const useApi = () => {
    const {session, signIn} = useSession();

    const apiFetchInternal = async (path: string, options: RequestInit = {}, accessToken: string, retryCount: number): Promise<object | object[] | null> => {
        if (!session?.accessToken) {
            throw new Error('No auth token available');
        }

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_ENDPOINT}${path}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        if (!response.ok) {
            if (retryCount < 1 && response.status === 401 && session.refreshToken) {
                const refreshTokenResponse = await refreshAsync({
                    refreshToken: session.refreshToken,
                    clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                    clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!,
                }, authDiscovery);
                signIn({
                    accessToken: refreshTokenResponse.accessToken,
                    tokenType: refreshTokenResponse.tokenType,
                    expiresIn: refreshTokenResponse.expiresIn,
                    refreshToken: refreshTokenResponse.refreshToken,
                    scope: refreshTokenResponse.scope,
                    state: refreshTokenResponse.state,
                    idToken: refreshTokenResponse.idToken,
                    issuedAt: refreshTokenResponse.issuedAt,
                });

                return await apiFetchInternal(path, options, refreshTokenResponse.accessToken, retryCount + 1);
            }

            throw new Error(`API error: ${response.status}`);
        }

        try {
            return await response.json();
        } catch (error) {
            throw new Error(`API response error: ${error}`);
        }
    };

    const apiFetch = async (path: string, options: RequestInit = {}) => {
        if (!session || !session.refreshToken) {
            throw new Error('No auth token available');
        }
        return await apiFetchInternal(path, options, session.accessToken, 0);
    }

    return {apiFetch};
};
