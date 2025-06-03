import {Stack} from 'expo-router';
import {UserProvider} from "@/components/UserProvider";

export default function AppLayout() {
    return (
        <UserProvider>
            <Stack screenOptions={{headerShown: false}}>
                <Stack.Screen name="index"/>
                <Stack.Screen name="search" options={{title: 'Search'}}/>
                <Stack.Screen name="profile/[login]" options={{title: 'Profile'}}/>
            </Stack>
        </UserProvider>
    );
}
