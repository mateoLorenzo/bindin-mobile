import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Stack>
        <Stack.Screen name="Welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(signUp)" options={{ headerShown: false }} />
        <Stack.Screen name="(signIn)" options={{ headerShown: false }} />
      </Stack>
    </View>
  );
}
