import React, {useEffect, useState} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import {ScrollView, View} from 'react-native';
import {useSession} from "@/hooks/useSession";
import {authDiscovery} from "@/api/auth";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {Text} from "@/components/ui/text";
import {Button} from "@/components/ui/button";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
    const insets = useSafeAreaInsets();
    const {signIn} = useSession();
    const [isSigningIn, setIsSigningIn] = useState(false);

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
            scopes: ['public'],
            redirectUri: AuthSession.makeRedirectUri({
                scheme: 'swifty_companion'
            }),
        },
        authDiscovery
    );

    useEffect(() => {
        if (isSigningIn)
            return;

        if (response?.type === 'success') {
            setIsSigningIn(true);
            signIn(response.params.code).finally(() => setIsSigningIn(false));
        }
    }, [signIn, response, isSigningIn]);

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View className='relative web:max-w-xs w-full h-full p-6 flex flex-col items-stretch justify-center'>
                <Button onPress={() => promptAsync()} disabled={!request && !isSigningIn}>
                    <Text>Sign In</Text>
                </Button>
            </View>
        </ScrollView>
    );
}
