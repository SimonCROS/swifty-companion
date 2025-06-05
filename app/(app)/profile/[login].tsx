import React, {useEffect, useMemo, useState} from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {Card, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Progress} from '@/components/ui/progress';
import {Text} from '@/components/ui/text';
import {useUser} from "@/hooks/useUser";
import {router, useLocalSearchParams} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {useApi} from "@/hooks/useApi";
import {User} from "@/context/UserContext";
import {Picker} from "@react-native-picker/picker";
import {useColorScheme} from "@/lib/useColorScheme";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const {login} = useLocalSearchParams();
    const {isDarkColorScheme} = useColorScheme();
    const {user, setUser} = useUser();
    const {apiFetch} = useApi();
    const [cursusIndex, setCursusIndex] = useState<number>(-1);

    const displayName = user.displayname ?? user.usual_full_name ?? `${user.first_name ?? ''} ${user.last_name ?? ''}`;

    useEffect(() => {
        const fetchUser = async (login: string): Promise<number | null> => {
            const response = await apiFetch(`/v2/users/${encodeURIComponent(login)}`);
            if (response.data) {
                const user = response.data as User;
                setUser(user);
                return user.id;
            } else {
                return null;
            }
        }

        (async () => {
            let userId: number | null = user.id ?? null;
            if (!userId && login && typeof login === 'string')
                userId = await fetchUser(login);

            if (!userId) {
                router.replace('/search');
                return;
            }
        })();
    }, []);

    useEffect(() => {
        if (cursusIndex === -1 && user?.cursus_users) {
            setCursusIndex((user.cursus_users?.length ?? 0) - 1);
        }
    }, [user, cursusIndex, setCursusIndex]);

    const cursus = useMemo(() => {
        return user?.cursus_users?.[cursusIndex ?? 0];
    }, [cursusIndex, user?.cursus_users]);

    return (
        <ScrollView contentContainerStyle={{
            flex: 1,
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View style={styles.container}>
                <Card>
                    <CardHeader style={styles.header}>
                        <Avatar alt="Zach Nugent's Avatar" style={{width: 84, height: 84}}>
                            <AvatarImage source={{uri: user.image?.versions?.small ?? user.image?.link}}/>
                            <AvatarFallback>
                                <Text>{(user.login?.substring(0, 2) ?? '$$').toUpperCase()}</Text>
                            </AvatarFallback>
                        </Avatar>
                        <View className={'flex-1'}>
                            <CardTitle>{user.login}</CardTitle>
                            {displayName?.trim() ?
                                <Text>{displayName}</Text>
                                :
                                <Text className={'text-destructive'}>name unavailable</Text>
                            }
                            {(user.location) ?
                                <Text className={'text-emerald-700'}>{user.location}</Text>
                                :
                                <Text className={'text-destructive'}>Offline</Text>
                            }
                            {(user.email && user.email !== 'hidden') ?
                                <Text className={'text-muted-foreground'}>{user.email}</Text>
                                :
                                <Text className={'text-destructive'}>email unavailable</Text>
                            }
                            {(user.phone && user.phone !== 'hidden') ?
                                <Text className={'text-muted-foreground'}>{user.phone}</Text>
                                :
                                <Text className={'text-destructive'}>phone unavailable</Text>
                            }
                        </View>
                    </CardHeader>
                    <CardFooter>
                        <View className={'w-full'}>
                            <View className={'w-full mb-1'}>
                                <Picker
                                    selectedValue={cursusIndex}
                                    className={'web:mb-2'}
                                    style={{color: isDarkColorScheme ? 'white' : 'black'}}
                                    dropdownIconColor={isDarkColorScheme ? 'white' : 'black'}
                                    mode={'dropdown'}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setCursusIndex(parseInt(itemValue as unknown as string))
                                    }
                                >
                                    {
                                        user.cursus_users?.length ? user.cursus_users?.map((cu, i) => (
                                            <Picker.Item key={i} label={cu.cursus?.name || 'Unknown cursus'} value={i}/>
                                        )) : <Picker.Item key={-1} label={'No cursus'} value={-1}/>}
                                </Picker>
                                <Text className={'mr-3'}>Level {cursus?.level}</Text>
                            </View>
                            <Progress value={((cursus?.level ?? 0) % 1) * 100}/>
                        </View>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader style={styles.header}>
                        <CardTitle style={{marginBottom: 8}}>Recent Activity</CardTitle>
                    </CardHeader>
                </Card>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
});
