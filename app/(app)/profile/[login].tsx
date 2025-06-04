import React, {useEffect} from 'react';
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

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const {login} = useLocalSearchParams();
    const {user, setUser} = useUser();
    const {apiFetch} = useApi();

    const displayName = user.displayname ?? user.usual_full_name ?? `${user.first_name ?? ''} ${user.last_name ?? ''}`;

    useEffect(() => {
        const fetchUser = async (login: string): Promise<number | null> => {
            const response = await apiFetch(`/v2/users/${encodeURIComponent(login)}`);
            if (response != null) {
                const user = response as User;
                setUser(user);
                return user.id;
            } else {
                return null;
            }
        }

        (async () => {
            try {
                let userId: number | null = user.id ?? null;
                if (!userId && login && typeof login === 'string')
                    userId = await fetchUser(login);

                if (!userId) {
                    router.replace('/search');
                    return;
                }
            } catch (error) {
                console.error(`Failed to fetch user: ${error}`);
                router.replace('/search');
                return;
            }
        })();
    }, []);

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
                            <Text className={'mb-3'}>Level {user.cursus_users?.[0]?.level}</Text>
                            <Progress value={((user.cursus_users?.[0]?.level ?? 0) % 1) * 100}/>
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
