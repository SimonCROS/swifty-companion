import {Redirect} from 'expo-router';
import {useAuth} from "@/hooks/useAuth";

export default function App() {
    const {user} = useAuth();

    if (user) {
        return <Redirect href="/home"/>;
    } else {
        return <Redirect href="/auth"/>;
    }
}
