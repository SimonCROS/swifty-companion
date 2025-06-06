import {Stack} from "expo-router";
import {useSession} from "@/hooks/useSession";
import {SessionProvider} from "@/components/SessionProvider";
import {SplashScreenController} from "@/controllers/SplashScreenController";
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {ActivityIndicator} from 'react-native';
import "@/global.css";
import {DarkTheme, DefaultTheme, Theme, ThemeProvider} from "@react-navigation/native";
import {useColorScheme} from "@/lib/useColorScheme";
import { NAV_THEME } from '@/lib/constants';

const LIGHT_THEME: Theme = {
    ...DefaultTheme,
    colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
    ...DarkTheme,
    colors: NAV_THEME.dark,
};

export default function Root() {
    const {isDarkColorScheme} = useColorScheme();

    return (
        <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
            <SessionProvider>
                <SafeAreaProvider>
                    <SplashScreenController/>
                    <RootNavigator/>
                </SafeAreaProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}

function RootNavigator() {
    const {session, isLoading} = useSession();

    if (isLoading) {
        return (
            <SafeAreaView style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="large"/>
            </SafeAreaView>
        );
    }

    return (
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Protected guard={!!session}>
                <Stack.Screen name="(app)" options={{headerShown: false}}/>
            </Stack.Protected>

            <Stack.Protected guard={!session}>
                <Stack.Screen name="sign-in"/>
            </Stack.Protected>
        </Stack>
    );
}