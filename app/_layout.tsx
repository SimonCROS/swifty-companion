import {Stack, Redirect, usePathname} from "expo-router";
import {useSession} from "@/hooks/useSession";
import {SessionProvider} from "@/components/SessionProvider";
import {SplashScreenController} from "@/controllers/SplashScreenController";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {View, ActivityIndicator} from 'react-native';
import "@/global.css";

export default function Root() {
    return (
        <SessionProvider>
            <SafeAreaProvider>
                <SplashScreenController/>
                <RootNavigator/>
            </SafeAreaProvider>
        </SessionProvider>
    );
}

function RootNavigator() {
    const {session, isLoading} = useSession();

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </SafeAreaView>
        );
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(app)"/>
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="sign-in"/>
            </Stack.Protected>
        </Stack>
    );
}