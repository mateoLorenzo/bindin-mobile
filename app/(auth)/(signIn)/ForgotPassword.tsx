import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppText as Text } from "../../../src/components/AppText";
import { AppButton as Button } from "../../../src/components/AppButton";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");

  // Make more complex validation for email
  const isEmailInputFilled = email.trim() !== "";

  const navigateBack = () => {
    router.back();
  };

  const naviateToCheckYourEmail = () => {
    if (isEmailInputFilled) {
      router.navigate("/CheckYourEmail");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.continueButtonSectionContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
              <Ionicons name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text variant="title">Recupera tu contraseña</Text>
            </View>
          </View>

          <View style={styles.emailAuthContainer}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Correo electrónico
            </Text>
            <TextInput
              style={styles.emailAuthInput}
              placeholder="Ejemplo@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoFocus
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.signInButtonContainer}>
            <Button
              label="Continuar"
              onPress={naviateToCheckYourEmail}
              disabled={!isEmailInputFilled}
              variant="primary"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  backButtonIcon: {
    width: 20,
    height: 15,
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  emailAuthContainer: {
    paddingHorizontal: 20,
    marginTop: 35,
    gap: 10,
  },
  emailInputGroup: {
    gap: 10,
  },
  emailInputGroupLabel: {
    color: "#fff",
  },
  emailAuthInput: {
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  continueButtonSectionContainer: {
    flex: 1,
  },
  signInButtonContainer: {
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 100,
    backgroundColor: "#C084FC",
    width: "100%",
  },
  signInButtonText: {
    color: "#121212",
  },
});

export default ForgotPasswordScreen;
