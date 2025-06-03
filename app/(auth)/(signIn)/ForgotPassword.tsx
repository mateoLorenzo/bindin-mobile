/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
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
import colors from "@/src/theme/colors";
import { usePasswordReset } from "@/src/hooks/usePasswordReset";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const { mutate: sendPasswordUpdateRequest, isPending, data } = usePasswordReset();

  // Add more complex validation for email
  const isEmailInputFilled = email.trim() !== "";

  const navigateBack = () => {
    router.back();
  };

  useEffect(() => {
    if (data) {
      router.navigate({
        pathname: "/CheckYourEmail",
        params: { email },
      });
    }
  }, [data]);

  const handlePasswordUpdateRequest = () => {
    if (isEmailInputFilled) {
      sendPasswordUpdateRequest(email);
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
              <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
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
              placeholderTextColor={colors.input.placeholder}
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
              loading={isPending}
              onPress={handlePasswordUpdateRequest}
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
    color: colors.text.primary,
  },
  emailAuthInput: {
    color: colors.input.primary,
    borderWidth: 1,
    borderColor: colors.border.secondary,
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
});

export default ForgotPasswordScreen;
