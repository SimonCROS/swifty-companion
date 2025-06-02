import {Button} from "react-native";
import {useSession} from "@/hooks/useSession";
import {useEffect} from "react";

export default function Auth() {
    const {session, signOut} = useSession();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('YOUR_API_URL', {
                    headers: {
                        'Authorization': `Bearer ${session!.accessToken}`
                    }
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    }, [session]);

    return (
        <Button title={"LogOut"} onPress={() => signOut()}></Button>
    );
}
