import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="SelectUsername" options={{ headerShown: false }} />
        <Stack.Screen name="RegisterWithEmail" options={{ headerShown: false }} />
        <Stack.Screen name="CheckYourEmail" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
