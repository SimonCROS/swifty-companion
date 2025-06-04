import {PropsWithChildren, useState} from "react";
import {UserContext, User} from "@/context/UserContext";

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUserState] = useState<User | null>(null);

    return (
        <UserContext
            value={{
                setUser: (value) => {
                    setUserState(value);
                },
                unsetUser: () => {
                    setUserState(null)
                },
                user: user ?? {},
            }}>
            {children}
        </UserContext>
    );
}
