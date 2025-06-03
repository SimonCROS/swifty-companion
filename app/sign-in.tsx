import {useEffect, useState} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import {Button, View} from 'react-native';
import {useSession} from "@/hooks/useSession";
import {authDiscovery} from "@/api/auth";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
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
        <View>
            <Button
                disabled={!request && !isSigningIn}
                title="Index"
                onPress={() => {
                    promptAsync();
                }}
            />
        </View>
    );
}
