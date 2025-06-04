import * as React from 'react';
import {Platform, ScrollView, TextInput, View} from 'react-native';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';
import {Input} from '@/components/ui/input';
import {Text} from '@/components/ui/text';
import {Button} from "@/components/ui/button";
import {useApi} from "@/hooks/useApi";
import {useUser} from "@/hooks/useUser";
import {User} from "@/context/UserContext";
import {router} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function SearchScreen() {
    const insets = useSafeAreaInsets();
    const {apiFetch} = useApi();
    const [input, setInput] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [err, setErr] = React.useState<string | null>(null);
    const {setUser, unsetUser} = useUser();

    const handleSubmit = async () => {
        if (!input.trim()) return;

        setLoading(true);
        const response = await apiFetch(`/v2/users/${encodeURIComponent(input.trim())}`);
        setLoading(false);
        if (response.data) {
            const user = response.data as User;
            setUser(user);
            router.push({pathname: '/profile/[login]', params: {login: user.login}});
        } else {
            if (response.fetchStatus == 404)
                setErr('login not found');
            else if (response.fetchError)
                setErr(response.fetchError);
            // auth error will sign out user
            unsetUser();
        }
    };

    function onChangeText(text: string) {
        if (err) {
            setErr(null);
        }
        setInput(text);
    }

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
            <View className='web:max-w-xs w-full p-6'>
                <Input
                    placeholder='Enter a login'
                    value={input}
                    onChangeText={onChangeText}
                    onSubmitEditing={handleSubmit}
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    textAlign={'center'}
                    autoCapitalize='none'
                    editable={!loading}
                />
                {err && <ErrorMessage msg={err}/>}
                <View className='h-2'/>
                <Button onPress={handleSubmit} disabled={loading}>
                    <Text>Search</Text>
                </Button>
            </View>
        </ScrollView>
    );
}

function ErrorMessage({msg}: { msg: string }) {
    if (Platform.OS === 'web') {
        return (
            <Text
                className='text-destructive text-sm native:px-1 py-1.5 web:animate-in web:zoom-in-95'
                aria-invalid='true'
                id='inputError'
            >
                {msg}
            </Text>
        );
    }
    return (
        <Animated.Text
            entering={FadeInDown}
            exiting={FadeOut.duration(275)}
            className='text-destructive text-sm native:px-1 py-1.5'
            aria-invalid='true'
            id='inputError'
        >
            {msg}
        </Animated.Text>
    );
}
