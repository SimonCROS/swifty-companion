import {createContext} from "react";
import {TokenResponse} from "expo-auth-session";

export interface AuthResult {
    accessToken?: string;
    authError?: string;
    fetchError?: string;
}

export const AuthContext = createContext<{
    signIn: (code: string) => Promise<AuthResult>;
    getValidToken: () => Promise<AuthResult>;
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
