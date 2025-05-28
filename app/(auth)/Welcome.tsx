import { Link } from "expo-router";
import React from "react";
import { View } from "react-native";
import { AppText as Text } from "../../src/components/AppText";

const WelcomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff", fontSize: 18 }}>La Red Social de los Gamers.</Text>
      <Text style={{ color: "#fff" }}>Welcome</Text>
      <Link href="/(auth)/(signUp)" style={{ color: "#fff" }}>
        Sign Up
      </Link>
      <Link href="/(auth)/(signIn)" style={{ color: "#fff" }}>
        Sign In
      </Link>
    </View>
  );
};

export default WelcomeScreen;
