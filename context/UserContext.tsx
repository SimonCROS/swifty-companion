import {createContext} from "react";
import {TokenType} from "expo-auth-session/src/TokenRequest.types";

export interface User {
    accessToken: string;
    tokenType?: TokenType;
    expiresIn?: number;
    refreshToken?: string;
    scope?: string;
    state?: string;
    idToken?: string;
    issuedAt?: number;
}

export const UserContext = createContext<{
    setUser: (user: User) => void;
    unsetUser: () => void;
    user?: User | null;
}>({
    setUser: () => null,
    unsetUser: () => null,
    user: null,
});
