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
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            <Text style={styles.title} variant="title">
              Recupera tu contraseña
            </Text>
          </View>
        </View>

        <View style={styles.emailAuthContainer}>
          <View style={styles.emailInputGroup}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Correo electrónico
            </Text>
            <TextInput
              style={styles.emailAuthInput}
              placeholder="Ejemplo@gmail.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              keyboardAppearance="dark"
              autoFocus
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.continueButtonSectionContainer}
        >
          <View style={styles.signInButtonContainer}>
            <TouchableOpacity
              style={[styles.signInButton, { opacity: isEmailInputFilled ? 1 : 0.4 }]}
              disabled={!isEmailInputFilled}
              onPress={naviateToCheckYourEmail}
            >
              <Text style={styles.signInButtonText} variant="button">
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
    display: "flex",
    flexDirection: "column",
    flex: 1,
  },
  header: {
    display: "flex",
    flexDirection: "column",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#fff",
  },
  emailAuthContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    marginTop: 35,
  },
  emailInputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  emailInputGroupLabel: {
    fontSize: 13,
    color: "#fff",
    fontWeight: "600",
  },
  emailAuthInput: {
    fontSize: 13,
    fontWeight: "500",
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
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  signInButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 23.5,
    backgroundColor: "#C084FC",
    width: "100%",
  },
  signInButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#121212",
  },
});
