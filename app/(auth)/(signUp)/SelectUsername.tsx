import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SelectUsernameScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "white" }}>Select Username screen</Text>
      <Link style={{ color: "white" }} href="/(auth)/(signUp)/RegisterWithEmail">
        Register with email{" "}
      </Link>
    </View>
  );
};

export default SelectUsernameScreen;
