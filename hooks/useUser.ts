import {use} from "react";
import {UserContext} from "@/context/UserContext";

export const useUser = () => {
    const context = use(UserContext);

    if (!context) {
        throw new Error('useUser must be wrapped in a <UserProvider />');
    }

    return context;
};
