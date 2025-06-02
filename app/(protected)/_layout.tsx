import {Redirect, Stack} from 'expo-router';
import {useAuth} from "@/hooks/useAuth";

export default function ProtectedLayout() {
    const {user} = useAuth();

    if (!user) {
        return <Redirect href="/auth"/>;
    }

    return <Stack/>;
}
