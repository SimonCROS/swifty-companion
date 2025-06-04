import {createContext} from "react";

export interface User {
    id: number,
    email: string,
    login: string,
    first_name: string,
    last_name: string,
    usual_full_name: string,
    usual_first_name: null,
    url: string,
    phone: string,
    displayname: string,
    kind: string,
    image: {
        link: string
        versions: {
            large: string,
            medium: string,
            small: string,
            micro: string
        }
    },
    'staff?': boolean,
    correction_point: number,
    pool_month: string,
    pool_year: string,
    location: string,
    wallet: number,
    anonymize_date: string,
    data_erasure_date: string,
    created_at: string,
    updated_at: string,
    alumnized_at: string,
    'alumni?': boolean,
    'active?': boolean
}

export const UserContext = createContext<{
    setUser: (user: User) => void;
    unsetUser: () => void;
    user: Partial<User>;
}>({
    setUser: () => null,
    unsetUser: () => null,
    user: {},
});
