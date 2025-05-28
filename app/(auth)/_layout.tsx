import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#121212" } }}>
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(signUp)" options={{ headerShown: false }} />
      <Stack.Screen name="(signIn)" options={{ headerShown: false }} />
    </Stack>
  );
}
