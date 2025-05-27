import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SelectUsernameScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Select Username screen</Text>
      <Link href="/(auth)/(signUp)/RegisterWithEmail">Register with email </Link>
    </View>
  );
};

export default SelectUsernameScreen;
