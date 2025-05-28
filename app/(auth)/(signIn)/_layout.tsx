import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#121212" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
    </Stack>
  );
}
