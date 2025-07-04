import { Stack } from "expo-router";

export default function StoriesLayout() {
    return (
        <Stack>
            <Stack.Screen name="new_story" options={{ headerShown: false }} />
            {/* Các màn khác nếu muốn ẩn header tương tự */}
        </Stack>
    );
}