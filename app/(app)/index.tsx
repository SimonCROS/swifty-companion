import {Button} from "react-native";
import {useSession} from "@/hooks/useSession";
import {useEffect} from "react";
import {useApi} from "@/hooks/useApi";

export default function Auth() {
    const {signOut} = useSession();
    const {apiFetch} = useApi();

    useEffect(() => {
        const fetchData = async () => {
            console.log((await apiFetch("/v2/users?range[login]=scros,scrot")).map(e => e.login));
        };
        fetchData();
    }, [apiFetch]);

    return (
        <Button title={"LogOut"} onPress={() => signOut()}></Button>
    );
}
