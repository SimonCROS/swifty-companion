import {useState, ReactNode, FC} from 'react';
import {AuthContext} from "@/context/AuthContext";

export const SessionProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [token, setToken] = useState<string | null>(null);
    const login = (token: string) => setToken(token);
    const logout = () => setToken(null);

    return (
        <AuthContext.Provider value={{token, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};
