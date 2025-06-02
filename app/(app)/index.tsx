import {useSession} from "@/hooks/useSession";
import {useEffect} from "react";
import {useApi} from "@/hooks/useApi";
import {Button} from "@/components/ui/button";
import {Text} from "@/components/ui/text";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';


export default function Auth() {
    const {signOut} = useSession();
    const {apiFetch} = useApi();

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardDescription>
                    <Avatar alt="Zach Nugent's Avatar">
                        <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
                        <AvatarFallback>
                            <Text>ZN</Text>
                        </AvatarFallback>
                    </Avatar>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Text>Card Content</Text>
            </CardContent>
            <CardFooter>
                <Text>Card Footer</Text>
                <Button onPress={signOut}>
                    <Text>Sign Out</Text>
                </Button>
            </CardFooter>
        </Card>
    );
}
