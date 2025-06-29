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
                headerTitle: "Sticker Smash",
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Ẩn toàn bộ tab bar khi ở tab này
            }} />
            <Tabs.Screen name="about" options={{
                headerTitle: "About",
                headerShown: false,
            }} />
            <Tabs.Screen name="profile" options={{
                headerTitle: "Profile",
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Ẩn toàn bộ tab bar khi ở tab này
            }} />
            <Tabs.Screen name="friend_list" options={{
                headerTitle: "Friend List",
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Ẩn toàn bộ tab bar khi ở tab này
            }} />
            <Tabs.Screen name="invite_contact" options={{
                headerTitle: "Invite Contacts",
                headerShown: false,
                tabBarStyle: { display: 'none' }, // Ẩn toàn bộ tab bar khi ở tab này
            }} />
        </Tabs>
    );
}
