import {useEffect} from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import {Button, Platform} from 'react-native';
import {useSession} from "@/hooks/useSession";
import {authDiscovery} from "@/api/auth";

WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
    const {signIn} = useSession();

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
        if (response?.type === 'success') {
            signIn(response.params.code); // TODO async gestion
        }
    }, [signIn, response]);

    return (
        <Button
            disabled={!request}
            title="Index"
            onPress={() => {
                promptAsync();
            }}
        />
    );
}
