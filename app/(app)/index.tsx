import {Button} from "react-native";
import {useSession} from "@/hooks/useSession";

export default function Auth() {
    const {signOut} = useSession();

    return (
        <Button title={"LogOut"} onPress={() => signOut()}></Button>
    );
}
