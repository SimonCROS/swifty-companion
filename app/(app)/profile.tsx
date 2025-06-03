import React from 'react';
import {View, ScrollView, StyleSheet, FlatList} from 'react-native';
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Progress} from '@/components/ui/progress';
import {Text} from '@/components/ui/text';

const profile = {
    "id": 2,
    "email": "andre@42.fr",
    "login": "andre",
    "first_name": "André",
    "last_name": "Aubin",
    "usual_full_name": "Juliette Aubin",
    "usual_first_name": "Juliette",
    "url": "https://api.intra.42.fr/v2/users/andre",
    "phone": null,
    "displayname": "André Aubin",
    "kind": "admin",
    "image": {
        "link": "https://cdn.intra.42.fr/users/1234567890/andre.jpg",
        "versions": {
            "large": "https://cdn.intra.42.fr/users/1234567890/large_andre.jpg",
            "medium": "https://cdn.intra.42.fr/users/1234567890/medium_andre.jpg",
            "small": "https://cdn.intra.42.fr/users/1234567890/small_andre.jpg",
            "micro": "https://cdn.intra.42.fr/users/1234567890/micro_andre.jpgg"
        }
    },
    "staff?": false,
    "correction_point": 4,
    "pool_month": "july",
    "pool_year": "2016",
    "location": null,
    "wallet": 0,
    "anonymize_date": "2021-02-20T00:00:00.000+03:00",
    "data_erasure_date": null,
    "alumni?": false,
    "active?": true,
    "groups": [],
    "cursus_users": [
        {
            "id": 2,
            "begin_at": "2017-05-14T21:37:50.172Z",
            "end_at": null,
            "grade": null,
            "level": 4.8,
            "skills": [],
            "cursus_id": 1,
            "has_coalition": true,
            "user": {
                "id": 2,
                "login": "andre",
                "url": "https://api.intra.42.fr/v2/users/andre"
            },
            "cursus": {
                "id": 1,
                "created_at": "2017-11-22T13:41:00.750Z",
                "name": "Piscine C",
                "slug": "piscine-c"
            }
        }
    ],
    "projects_users": [],
    "languages_users": [
        {
            "id": 2,
            "language_id": 3,
            "user_id": 2,
            "position": 1,
            "created_at": "2017-11-22T13:41:03.638Z"
        }
    ],
    "achievements": [],
    "titles": [],
    "titles_users": [],
    "partnerships": [],
    "patroned": [
        {
            "id": 4,
            "user_id": 2,
            "godfather_id": 15,
            "ongoing": true,
            "created_at": "2017-11-22T13:42:11.565Z",
            "updated_at": "2017-11-22T13:42:11.572Z"
        }
    ],
    "patroning": [],
    "expertises_users": [
        {
            "id": 2,
            "expertise_id": 3,
            "interested": false,
            "value": 2,
            "contact_me": false,
            "created_at": "2017-11-22T13:41:22.504Z",
            "user_id": 2
        }
    ],
    "roles": [],
    "campus": [
        {
            "id": 1,
            "name": "Cluj",
            "time_zone": "Europe/Bucharest",
            "language": {
                "id": 3,
                "name": "Romanian",
                "identifier": "ro",
                "created_at": "2017-11-22T13:40:59.468Z",
                "updated_at": "2017-11-22T13:41:26.139Z"
            },
            "users_count": 28,
            "vogsphere_id": 1
        }
    ],
    "campus_users": [
        {
            "id": 2,
            "user_id": 2,
            "campus_id": 1,
            "is_primary": true
        }
    ]
};

export default function ProfileScreen() {
    const displayName = profile.usual_full_name ?? `${profile.first_name} ${profile.last_name}`;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Card>
                <CardHeader style={styles.header}>
                    <Avatar alt="Zach Nugent's Avatar" style={{width: 84, height: 84}}>
                        <AvatarImage source={{uri: profile.image?.versions?.small ?? profile.image?.link}}/>
                        <AvatarFallback>
                            <Text>{(profile.login?.substring(0, 2) ?? '$$').toUpperCase()}</Text>
                        </AvatarFallback>
                    </Avatar>
                    <View className={'flex-1'}>
                        <CardTitle>{profile.login}</CardTitle>
                        {displayName ?
                            <Text>{displayName}</Text>
                            :
                            <Text className={'text-destructive'}>name unavailable</Text>
                        }
                        {profile.email ?
                            <Text className={'text-muted-foreground'}>{profile.email}</Text>
                            :
                            <Text className={'text-destructive'}>email unavailable</Text>
                        }
                        {profile.phone ?
                            <Text className={'text-muted-foreground'}>{profile.phone}</Text>
                            :
                            <Text className={'text-destructive'}>phone unavailable</Text>
                        }
                    </View>
                </CardHeader>
                <CardFooter>
                    <View className={'w-full'}>
                        <Text className={'mb-3'}>Level {profile.cursus_users?.[0]?.level}</Text>
                        <Progress value={((profile.cursus_users?.[0]?.level ?? 0) % 1) * 100}/>
                    </View>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader style={styles.header}>
                    <CardTitle style={{marginBottom: 8}}>Recent Activity</CardTitle>
                </CardHeader>
            </Card>
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
