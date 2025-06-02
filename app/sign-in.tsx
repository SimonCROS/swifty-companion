import { useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as SecureStore from 'expo-secure-store';
import * as AuthSession from 'expo-auth-session';
import { Button, Platform } from 'react-native';
import {useSession} from "@/hooks/useSession";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
    authorizationEndpoint: process.env.EXPO_PUBLIC_AUTH_AUTHORIZATION_ENDPOINT!,
    tokenEndpoint: process.env.EXPO_PUBLIC_AUTH_TOKEN_ENDPOINT!,
};

export default function SignIn() {
    const { signIn } = useSession();

    const [request, response, promptAsync] = AuthSession.useAuthRequest(
        {
            clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
            scopes: ['public'],
            redirectUri: AuthSession.makeRedirectUri({
                scheme: 'swifty_companion'
            }),
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const auth = response.params;
            const storageValue = JSON.stringify(auth);

            if (Platform.OS !== 'web') {
                SecureStore.setItemAsync(process.env.EXPO_PUBLIC_AUTH_STATE_KEY!, storageValue);
            }

            AuthSession.exchangeCodeAsync({
                    clientId: process.env.EXPO_PUBLIC_AUTH_CLIENT_ID!,
                    clientSecret: process.env.EXPO_PUBLIC_AUTH_CLIENT_SECRET!,
                    code: response.params.code,
                    redirectUri: AuthSession.makeRedirectUri({
                        scheme: process.env.EXPO_PUBLIC_REDIRECT_URI_SCHEME
                    }),
                },
                discovery).then(e => signIn(e.accessToken)).catch(e => console.log(e));
        }
    }, [response]);

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
