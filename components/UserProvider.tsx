import {PropsWithChildren, useState} from "react";
import {UserContext, User} from "@/context/UserContext";

export function UserProvider({ children }: PropsWithChildren) {
    const [user, setUser] = useState<User | null>(null);

    return (
        <UserContext
            value={{
                setUser: (value) => {
                    setUser(value);
                },
                unsetUser: () => {
                    setUser(null)
                },
                user,
            }}>
            {children}
        </UserContext>
    );
}
