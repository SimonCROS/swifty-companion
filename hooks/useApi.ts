import {useSession} from "@/hooks/useSession";
import {useCallback} from "react";

export const useApi = () => {
    const {getValidToken} = useSession();

    const apiFetch = useCallback(async (path: string, options: RequestInit = {}): Promise<object | object[] | null> => {
        const response = await fetch(`${process.env.EXPO_PUBLIC_API_ENDPOINT}${path}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${await getValidToken()}`,
                'Content-Type': 'application/json',
                ...(options.headers || {}),
            },
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        try {
            return await response.json();
        } catch (error) {
            throw new Error(`API response error: ${error}`);
        }
    }, [getValidToken]);

    return {apiFetch};
};
