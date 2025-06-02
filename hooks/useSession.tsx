import {use} from "react";
import {AuthContext} from "@/context/AuthContext";

export const useSession = () => {
    const context = use(AuthContext);

    if (!context) {
        throw new Error('useSession must be wrapped in a <SessionProvider />');
    }

    return context;
};
