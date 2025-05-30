import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../../../src/components/AppText";
import { AppButton as Button } from "../../../src/components/AppButton";
import colors from "@/src/theme/colors";

const ResetPasswordScreen = () => {
  const [showCode, setShowCode] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const areAllInputsFilled =
    code.trim() !== "" && newPassword.trim() !== "" && confirmPassword.trim() !== "";

  const goBack = () => {
    router.back();
  };

  const toggleCodeVisibility = () => {
    setShowCode(!showCode);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const confirmPasswordReset = () => {
    router.navigate("/(home)");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
        </TouchableOpacity>

        <Text style={styles.title} variant="title">
          Reestablece tu contraseña
        </Text>
      </View>

      <View style={styles.codeAuthContainer}>
        <View style={styles.resetPasswordInputGroup}>
          <Text style={styles.codeInputGroupLabel} variant="label">
            Codigo (te lo enviamos por correo)
          </Text>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeAuthInput}
              placeholder="***********"
              placeholderTextColor={colors.input.placeholder}
              secureTextEntry={!showCode}
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleCodeVisibility}>
              <Ionicons
                name={showCode ? "eye" : "eye-off"}
                size={24}
                color={colors.icon.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.resetPasswordInputGroup}>
          <Text style={styles.codeInputGroupLabel} variant="label">
            Nueva contraseña
          </Text>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeAuthInput}
              placeholder="***********"
              placeholderTextColor={colors.input.placeholder}
              secureTextEntry={!showNewPassword}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleNewPasswordVisibility}>
              <Ionicons
                name={showNewPassword ? "eye" : "eye-off"}
                size={24}
                color={colors.icon.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.resetPasswordInputGroup}>
          <Text style={styles.codeInputGroupLabel} variant="label">
            Confirmar contraseña
          </Text>
          <View style={styles.codeInputContainer}>
            <TextInput
              style={styles.codeAuthInput}
              placeholder="***********"
              placeholderTextColor={colors.input.placeholder}
              secureTextEntry={!showConfirmPassword}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.eyeIcon} onPress={toggleConfirmPasswordVisibility}>
              <Ionicons
                name={showConfirmPassword ? "eye" : "eye-off"}
                size={24}
                color={colors.icon.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.signInButtonContainer}>
          <Button
            label="Confirmar"
            onPress={confirmPasswordReset}
            disabled={!areAllInputsFilled}
            variant="primary"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  title: {
    paddingVertical: 10,
  },
  codeAuthContainer: {
    paddingHorizontal: 20,
    marginTop: 8,
  },
  resetPasswordInputGroup: {
    gap: 10,
    marginTop: 20,
  },
  codeInputGroupLabel: {
    color: colors.input.primary,
  },
  codeAuthInput: {
    color: colors.input.primary,
    borderWidth: 1,
    borderColor: colors.border.secondary,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 18,
    paddingRight: 50,
  },
  codeInputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  signInButtonContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default ResetPasswordScreen;
