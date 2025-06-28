import { router, Tabs } from "expo-router";
import { useEffect } from 'react';
import { auth } from "@/firebase/firebaseConfig";
import { onAuthStateChanged } from 'firebase/auth';


export default function TabsLayout() {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.replace('/(auth)/login');
            }
        });

        return unsubscribe;
    }, []);



    return (
        <Tabs>
            <Tabs.Screen name="index" options={{
                headerTitle: "Sticker Smash"
            }} />
            <Tabs.Screen name="about" options={{
                headerTitle: "About"
            }} />
        </Tabs>
    );
}
