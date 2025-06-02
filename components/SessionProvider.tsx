import {AuthContext} from "@/context/AuthContext";
import {PropsWithChildren} from "react";
import {useStorageState} from "@/hooks/useStorageState";

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext
            value={{
                signIn: () => {
                    setSession('xxx');
                },
                signOut: () => {
                    setSession(null);
                },
                session,
                isLoading,
            }}>
            {children}
        </AuthContext>
    );
}
