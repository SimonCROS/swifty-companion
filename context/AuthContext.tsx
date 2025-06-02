import {createContext} from "react";
import {TokenType} from "expo-auth-session/src/TokenRequest.types";

interface Session {
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
    signIn: (token: Session) => void;
    signOut: () => void;
    session?: Session | null;
    isLoading: boolean;
}>({
    signIn: () => null,
    signOut: () => null,
    session: null,
    isLoading: false,
});
