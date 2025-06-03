import {useSession} from "@/hooks/useSession";
import {useApi} from "@/hooks/useApi";
import SearchScreen from "@/app/(app)/search";
import {Redirect} from "expo-router";
import {View} from "react-native";
import {Input} from "@/components/ui/input";

const GITHUB_AVATAR_URI = 'https://github.com/mrzachnugent.png';

export default function Auth() {
    const {signOut} = useSession();
    const {apiFetch} = useApi();

    return (
        <Redirect href={'/search'}></Redirect>
    );
}
