import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const ForgotPasswordScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Forgot Password screen</Text>
      <Link href="/(auth)/(signIn)/ResetPassword">Reset Password</Link>
    </View>
  );
};

export default ForgotPasswordScreen;
