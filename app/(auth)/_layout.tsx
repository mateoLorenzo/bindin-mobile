import colors from "@/src/theme/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background.primary } }}>
      <Stack.Screen name="Welcome" options={{ headerShown: false }} />
      <Stack.Screen name="(signUp)" options={{ headerShown: false }} />
      <Stack.Screen name="(signIn)" options={{ headerShown: false }} />
    </Stack>
  );
}
