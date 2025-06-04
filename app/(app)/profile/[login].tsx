import React from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Progress} from '@/components/ui/progress';
import {Text} from '@/components/ui/text';
import {useUser} from "@/hooks/useUser";
import {useLocalSearchParams} from "expo-router";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const {login} = useLocalSearchParams();
    const {user} = useUser();

    if (!user) {
        return <></>
    }

    const displayName = user.usual_full_name ?? `${user.first_name} ${user.last_name}`;

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
                            {displayName ?
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
