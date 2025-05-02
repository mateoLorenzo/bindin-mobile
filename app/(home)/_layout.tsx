import { Stack } from "expo-router";
import { View } from "react-native";

export default function AppLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#121212" },
        }}
      >
        <Stack.Screen name="home" />
      </Stack>
    </View>
  );
}
