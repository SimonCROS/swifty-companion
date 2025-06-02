import {Stack} from "expo-router";
import {useSession} from "@/hooks/useSession";

export default function RootLayout() {
    const { session } = useSession();

    return <Stack>
        <Stack.Protected guard={!!session}>
            <Stack.Screen name="/" />
        </Stack.Protected>

        <Stack.Protected guard={!session}>
            <Stack.Screen name="/sign-in" />
        </Stack.Protected>
    </Stack>
}
