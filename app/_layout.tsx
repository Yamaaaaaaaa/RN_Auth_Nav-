import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{
        headerShown: false,
        headerLeft: () => <></>
      }} />
      <Stack.Screen name="(auth)" options={{
        headerShown: false,
        headerLeft: () => <></>
      }} />
      <Stack.Screen name="+not-found" options={{}} />
    </Stack>
  );
}
