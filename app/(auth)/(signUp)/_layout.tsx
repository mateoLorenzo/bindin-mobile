import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#121212" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="SelectUsername" options={{ headerShown: false }} />
      <Stack.Screen name="RegisterWithEmail" options={{ headerShown: false }} />
      <Stack.Screen name="CheckYourEmail" options={{ headerShown: false }} />
    </Stack>
  );
}
