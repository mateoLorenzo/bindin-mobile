import colors from "@/src/theme/colors";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background.primary } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" options={{ headerShown: false }} />
      <Stack.Screen name="ResetPassword" options={{ headerShown: false }} />
      <Stack.Screen name="CheckYourEmail" options={{ headerShown: false }} />
    </Stack>
  );
}
