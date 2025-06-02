import {Slot} from "expo-router";
import {AuthProvider} from "@/components/AuthProvider";
import {SafeAreaView} from "react-native-safe-area-context";

export default function RootLayout() {
    return <SafeAreaView>
        <AuthProvider>
            <Slot/>
        </AuthProvider>
    </SafeAreaView>;
}
