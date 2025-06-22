import { Stack } from "expo-router";

export default function TabsLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{
                headerTitle: "Login"
            }} />
            <Stack.Screen name="register" options={{
                headerTitle: "Register"
            }} />
        </Stack>
    );
}
