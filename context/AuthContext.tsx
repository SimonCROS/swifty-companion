import {createContext} from "react";
import {TokenResponse} from "expo-auth-session";

export const AuthContext = createContext<{
    signIn: (code: string) => Promise<string>;
    getValidToken: () => Promise<string>;
    signOut: () => void;
    session?: TokenResponse | null;
    isLoading: boolean;
}>({
    signIn: async () => {
        throw new Error('Uninitialized');
    },
    getValidToken: async () => {
        throw new Error('Uninitialized');
    },
    signOut: () => {
        throw new Error('Uninitialized');
    },
    session: null,
    isLoading: false,
});
