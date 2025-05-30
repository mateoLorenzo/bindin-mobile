import colors from "@/src/theme/colors";
import { Stack } from "expo-router";

export default function HomeLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: colors.background.primary } }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
