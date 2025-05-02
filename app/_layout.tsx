import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Sora: require("../assets/fonts/Sora-Regular.ttf"),
    SoraMedium: require("../assets/fonts/Sora-Medium.ttf"),
    SoraSemiBold: require("../assets/fonts/Sora-SemiBold.ttf"),
    SoraBold: require("../assets/fonts/Sora-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  return (
    <View style={{ flex: 1, backgroundColor: "#121212" }}>
      <StatusBar style="light" backgroundColor="#121212" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#121212" },
              animation: Platform.OS === "ios" ? "fade" : "default",
            }}
          >
            <Stack.Screen name="index" />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </GestureHandlerRootView>
    </View>
  );
}
