import {Stack} from "expo-router";
import {useSession} from "@/hooks/useSession";
import {SessionProvider} from "@/components/SessionProvider";
import {SplashScreenController} from "@/controllers/SplashScreenController";
import "@/global.css";
import {SafeAreaProvider} from "react-native-safe-area-context";

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
    const {session} = useSession();

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
