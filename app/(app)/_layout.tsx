import {Text} from 'react-native';
import {Redirect, Stack} from 'expo-router';
import {useSession} from "@/hooks/useSession";
import {UserProvider} from "@/components/UserProvider";

export default function AppLayout() {
    const {session, isLoading} = useSession();

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (!session) {
        return <Redirect href="/sign-in"/>;
    }

    return <UserProvider><Stack screenOptions={{headerShown: false}}/></UserProvider>;
}
