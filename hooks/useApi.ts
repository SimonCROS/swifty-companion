import {useSession} from "@/hooks/useSession";
import {useCallback} from "react";

export interface ApiResult {
    data?: object | object[];
    authError?: string;
    fetchError?: string;
    fetchStatus?: number;
}

export const useApi = () => {
    const {getValidToken} = useSession();

    const apiFetch = useCallback(async (path: string, options: RequestInit = {}): Promise<ApiResult> => {
        const authResult = await getValidToken();
        if (authResult.accessToken === undefined) {
            return authResult as ApiResult;
        }

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_API_ENDPOINT}${path}`, {
                ...options,
                headers: {
                    'Authorization': `Bearer ${authResult.accessToken}`,
                    'Content-Type': 'application/json',
                    ...(options.headers || {}),
                },
            });

            if (response.status === 404) {
                return {fetchStatus: response.status};
            }

            if (!response.ok) {
                console.error(`Error fetching data: ${await response.text()}`);
                return {fetchError: 'Unknown error', fetchStatus: response.status};
            }

            try {
                return {data: await response.json()};
            } catch (error) {
                console.error(error);
                return {fetchError: 'Unprocessable data received from API', fetchStatus: response.status};
            }
        } catch (error) {
            console.error(error);
            if (error instanceof Error) {
                if (error.message === 'Timeout') {
                    return {fetchError: 'Request timed out, please retry'};
                } else if (error.message === 'Network request failed') {
                    return {fetchError: 'Unable to fetch informations, please, verify your internet connection'};
                }
            }
            return {fetchError: 'Unknown error'};
        }
    }, [getValidToken]);

    return {apiFetch};
};
