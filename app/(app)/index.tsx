import {useSession} from "@/hooks/useSession";
import {useApi} from "@/hooks/useApi";
import SearchScreen from "@/app/(app)/search";
import {Redirect} from "expo-router";

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function Auth() {
    const {signOut} = useSession();
    const {apiFetch} = useApi();

    return (
        // <Card className='w-full max-w-sm'>
        //     <CardHeader>
        //         <CardTitle>Card Title</CardTitle>
        //         <CardDescription>
        //             <Avatar alt="Zach Nugent's Avatar">
        //                 <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} />
        //                 <AvatarFallback>
        //                     <Text>ZN</Text>
        //                 </AvatarFallback>
        //             </Avatar>
        //         </CardDescription>
        //     </CardHeader>
        //     <CardContent>
        //         <Text>Card Content</Text>
        //     </CardContent>
        //     <CardFooter>
        //         <Text>Card Footer</Text>
        //         <Button onPress={signOut}>
        //             <Text>Sign Out</Text>
        //         </Button>
        //     </CardFooter>
        // </Card>
        <Redirect href="./profile"></Redirect>
    );
}
