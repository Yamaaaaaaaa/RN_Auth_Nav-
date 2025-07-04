import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import React, { useEffect } from "react";

export default function RootLayout() {
  const [loaded] = useFonts({
    Alberts: require('../assets/fonts/AlbertSans-Regular.ttf'),
    Judson: require('../assets/fonts/Judson-Regular.ttf'),
    Inika: require('../assets/fonts/Inika-Regular.ttf'),
    Montserrat: require('../assets/fonts/Montserrat-Regular.ttf'),
  });


  if (!loaded) return null;

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
      <Stack.Screen name="story" options={{
        headerShown: false,
        headerLeft: () => <></>
      }} />
      <Stack.Screen name="+not-found" options={{}} />
    </Stack>
  );
}
