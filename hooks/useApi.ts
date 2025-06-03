import {useSession} from "@/hooks/useSession";
import {refreshAsync} from "expo-auth-session";
import {authDiscovery} from "@/api/auth";

export const useApi = () => {
    const {session, refreshToken, signOut} = useSession();

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
            if (response.status === 401 && session.refreshToken && retryCount < 1) {
                const accessToken = await refreshToken();
                return await apiFetchInternal(path, options, accessToken, retryCount + 1);
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
