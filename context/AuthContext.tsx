import {createContext} from "react";
import {TokenType} from "expo-auth-session/src/TokenRequest.types";

export interface Session {
    accessToken: string;
    tokenType?: TokenType;
    expiresIn?: number;
    refreshToken?: string;
    scope?: string;
    state?: string;
    idToken?: string;
    issuedAt?: number;
}

export const AuthContext = createContext<{
    signIn: (code: string) => Promise<string>;
    refreshToken: () => Promise<string>;
    signOut: () => void;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: async () => {
        throw new Error('Uninitialized');
    },
    refreshToken: async () => {
        throw new Error('Uninitialized');
    },
    signOut: () => {
        throw new Error('Uninitialized');
    },
    session: null,
    isLoading: false,
});
