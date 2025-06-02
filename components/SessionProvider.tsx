import {AuthContext} from "@/context/AuthContext";
import {PropsWithChildren} from "react";
import {useStorageState} from "@/hooks/useStorageState";

export function SessionProvider({ children }: PropsWithChildren) {
    const [[isLoading, session], setSession] = useStorageState('session');

    return (
        <AuthContext
            value={{
                signIn: (value) => {
                    setSession(JSON.stringify(value));
                },
                signOut: () => {
                    setSession(null);
                },
                session: JSON.parse(session!), // JSON.parse(null) return null
                isLoading,
            }}>
            {children}
        </AuthContext>
    );
}
