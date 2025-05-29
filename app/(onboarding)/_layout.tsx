import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: "#121212" } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
