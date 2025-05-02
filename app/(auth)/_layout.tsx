import { Stack } from "expo-router";
import { View } from "react-native";

export default function AuthLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#121212" },
        }}
      >
        <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
        <Stack.Screen
          name="verifyNumber"
          options={{ title: "Verify Number" }}
        />
        <Stack.Screen name="addPassword" options={{ title: "Add Password" }} />
      </Stack>
    </View>
  );
}
