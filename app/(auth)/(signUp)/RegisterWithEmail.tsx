import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const RegisterWithEmailScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Register with email screen</Text>
      <Link href="/(auth)/(signUp)/CheckYourEmail">Check Your Email</Link>
    </View>
  );
};

export default RegisterWithEmailScreen;
