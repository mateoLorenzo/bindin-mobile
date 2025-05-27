import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const WelcomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Welcome</Text>
      <Link href="/(auth)/(signUp)">Sign Up</Link>
      <Link href="/(auth)/(signIn)">Sign In</Link>
    </View>
  );
};

export default WelcomeScreen;
