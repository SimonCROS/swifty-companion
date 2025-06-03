import * as React from 'react';
import {Platform, ScrollView, TextInput, View} from 'react-native';
import Animated, {FadeInDown, FadeOut} from 'react-native-reanimated';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Text} from '@/components/ui/text';
import {cn} from '@/lib/utils';
import {Button} from "@/components/ui/button";
import {useApi} from "@/hooks/useApi";
import {useUser} from "@/hooks/useUser";
import {User} from "@/context/UserContext";

export default function SearchScreen() {
    const {apiFetch} = useApi();
    const [input, setInput] = React.useState<string>('');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [err, setErr] = React.useState<string | null>(null);
    const {setUser, unsetUser} = useUser();

    const handleSubmit = async () => {
        if (!input.trim()) return;

        setLoading(true);
        try {
            const response = await apiFetch(`/v2/users?filter[login]=${input}`);
            if (Array.isArray(response) && response.length > 0) {
                setUser(response[0] as User);
            } else {
                setErr('login not found');
                unsetUser();
            }
        } catch (error) {
            setErr(`Fetch error: ${error}`);
            unsetUser();
        } finally {
            setLoading(false);
        }
    };

    function onChangeText(text: string) {
        if (err) {
            setErr(null);
        }
        setInput(text);
    }

    return (
        <ScrollView contentContainerClassName='flex-1 justify-center items-center p-6'>
            <View className='web:max-w-xs w-full'>
                <Input
                    placeholder='Enter a login'
                    value={input}
                    onChangeText={onChangeText}
                    onSubmitEditing={handleSubmit}
                    aria-labelledby='inputLabel'
                    aria-errormessage='inputError'
                    textAlign={'center'}
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
