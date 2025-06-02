import {useSession} from "@/hooks/useSession";

export const useApi = () => {
    const {session} = useSession();

    const apiFetch = async (path: string, options: RequestInit = {}): Promise<object | null> => {
        if (!session?.accessToken) {
            throw new Error('No auth token available');
        }

        const response = await fetch(`${process.env.EXPO_PUBLIC_API_ENDPOINT}${path}`, {
            ...options,
            headers: {
                ...(options.headers || {}),
                'Authorization': `Bearer ${session.accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // TODO Refresh, with a max recursion limit
            // if (response.status === 401 && refreshToken) {
            //     await refreshToken();
            //     const newAuthToken = getUpdatedTokenSomehow(); // depends on your state management
            //     return fetch(url, {
            //         ...options,
            //         headers: {
            //             ...(options.headers || {}),
            //             Authorization: `Bearer ${newAuthToken}`,
            //         },
            //     });
            // }

            throw new Error(`API error: ${response.status}`);
        }

        try {
            return await response.json();
        } catch (error) {
            throw new Error(`API response error: ${error}`);
        }
    };

    return {apiFetch};
};
