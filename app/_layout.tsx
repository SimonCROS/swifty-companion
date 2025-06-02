import {Stack} from "expo-router";
import {useSession} from "@/hooks/useSession";
import {SessionProvider} from "@/components/SessionProvider";
import {SplashScreenController} from "@/controllers/SplashScreenController";
import "@/global.css";

export default function Root() {
    return (
        <SessionProvider>
            <SplashScreenController />
            <RootNavigator />
        </SessionProvider>
    );
}

function RootNavigator() {
    const { session } = useSession();

    return (
        <Stack>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(app)" />
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="sign-in" />
            </Stack.Protected>
        </Stack>
    );
}
