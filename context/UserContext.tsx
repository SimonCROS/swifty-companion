import {createContext} from "react";

export interface User {
    id: number;
    email: string;
    login: string;
    first_name: string;
    last_name: string;
    usual_full_name: string;
    usual_first_name: string;
    url: string;
    phone: string;
    displayname: string;
    kind: string;
    image: Partial<{
        link: string;
        versions: Partial<{
            large: string;
            medium: string;
            small: string;
            micro: string;
        }>;
    }>;
    "staff?": boolean;
    correction_point: number;
    pool_month: string;
    pool_year: string;
    location: string;
    wallet: number;
    anonymize_date: string;
    data_erasure_date: string;
    created_at: string;
    updated_at: string;
    alumnized_at: string;
    "alumni?": boolean;
    "active?": boolean;
    groups: Partial<{
        id: number;
        name: string;
    }>[];
    cursus_users: Partial<{
        id: number;
        begin_at: string;
        end_at: string;
        grade: string;
        level: number;
        skills: Partial<{
            id: number;
            name: string;
            level: number;
        }>[];
        cursus_id: number;
        has_coalition: boolean;
        blackholed_at: string;
        created_at: string;
        updated_at: string;
        user: Partial<User>;
        cursus: Partial<{
            id: number;
            created_at: string;
            name: string;
            slug: string;
            kind: string;
        }>;
    }>[];
    projects_users: Partial<{
        id: number;
        occurrence: number;
        final_mark: number;
        status: string;
        "validated?": boolean;
        current_team_id: number;
        project: Partial<{
            id: number;
            name: string;
            slug: string;
            parent_id: number;
        }>;
        cursus_ids: number[];
        marked_at: string;
        marked: boolean;
        retriable_at: string;
        created_at: string;
        updated_at: string;
    }>[];
    languages_users: Partial<{
        id: number;
        language_id: number;
        user_id: number;
        position: number;
        created_at: string;
    }>[];
    achievements: Partial<{
        id: number;
        name: string;
        description: string;
        tier: string;
        kind: string;
        visible: boolean;
        image: string;
        nbr_of_success: number;
        users_url: string;
    }>[];
    titles: Partial<{
        id: number;
        name: string;
    }>[];
    titles_users: Partial<{
        id: number;
        user_id: number;
        title_id: number;
        selected: boolean;
        created_at: string;
        updated_at: string;
    }>[];
    partnerships: any[]
    patroned: Partial<{
        id: number;
        user_id: number;
        godfather_id: number;
        ongoing: boolean;
        created_at: string;
        updated_at: string;
    }>[];
    patroning: Partial<{
        id: number;
        user_id: number;
        godfather_id: number;
        ongoing: boolean;
        created_at: string;
        updated_at: string;
    }>[];
    expertises_users: Partial<{
        id: number;
        expertise_id: number;
        interested: boolean;
        value: number;
        contact_me: boolean;
        created_at: string;
        user_id: number;
    }>[];
    roles: any[]
    campus: Partial<{
        id: number;
        name: string;
        time_zone: string;
        language: Partial<{
            id: number;
            name: string;
            identifier: string;
            created_at: string;
            updated_at: string;
        }>;
        users_count: number;
        vogsphere_id: number;
        country: string;
        address: string;
        zip: string;
        city: string;
        website: string;
        facebook: string;
        twitter: string;
        active: boolean;
        public: boolean;
        email_extension: string;
        default_hidden_phone: boolean;
    }>[];
    campus_users: Partial<{
        id: number;
        user_id: number;
        campus_id: number;
        is_primary: boolean;
        created_at: string;
        updated_at: string;
    }>[];
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
