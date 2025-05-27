import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const SignInScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>SignIn screen</Text>
      <Link href="/(auth)/(signIn)/ForgotPassword">Forgot Password</Link>
    </View>
  );
};

export default SignInScreen;
