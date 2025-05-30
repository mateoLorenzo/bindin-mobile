import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    OpenSauceOneRegular: require("../assets/fonts/OpenSauceOne-Regular.ttf"),
    OpenSauceOneMedium: require("../assets/fonts/OpenSauceOne-Medium.ttf"),
    OpenSauceOneSemiBold: require("../assets/fonts/OpenSauceOne-SemiBold.ttf"),
    OpenSauceOneBold: require("../assets/fonts/OpenSauceOne-Bold.ttf"),
    PoppinsRegular: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsMedium: require("../assets/fonts/Poppins-Medium.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
  });

  const queryClient = new QueryClient();

  if (!fontsLoaded) return null;
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" />
        <Stack>
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="(onboarding)" options={{ headerShown: false }} />
          <Stack.Screen name="(home)" options={{ headerShown: false }} />
        </Stack>
      </View>
    </QueryClientProvider>
  );
}
