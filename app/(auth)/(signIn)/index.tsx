import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../../../src/components/AppText";

const SignInScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const goBack = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView bounces={false}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text variant="title">Ingresa a tu cuenta</Text>
          </View>
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.authButton}>
              <Ionicons name="logo-google" size={20} color="#fff" style={styles.authIcon} />
              <Text variant="button">Ingresa con Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton}>
              <Ionicons name="logo-twitch" size={20} color="#fff" style={styles.authIcon} />
              <Text variant="button">Ingresa con Twitch</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton}>
              <FontAwesome6 name="discord" size={18} color="#fff" style={styles.authIcon} />
              <Text variant="button">Ingresa con Discord</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.sectionDivider}>
          <View style={styles.sectionDividerLine} />
          <Text style={styles.sectionDividerText}>o</Text>
          <View style={styles.sectionDividerLine} />
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
            />
          </View>

          <View style={styles.emailInputGroup}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Contraseña
            </Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={[styles.emailAuthInput, styles.passwordInput]}
                placeholder="***********"
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#ADADAD" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forgotPasswordContainer}>
            <Link href="/ForgotPassword">
              <Text style={styles.forgotPasswordText} variant="button">
                ¿Olvidaste tu contraseña?
              </Text>
            </Link>
          </View>

          <View style={styles.signInButtonContainer}>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInButtonText} variant="button">
                Continuar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  authButtonsContainer: {
    paddingVertical: 10,
    gap: 10,
    width: "100%",
  },
  authButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  authIcon: {
    position: "absolute",
    left: 20,
  },
  sectionDivider: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionDividerLine: {
    width: "40%",
    height: 1,
    backgroundColor: "#ADADAD",
  },
  sectionDividerText: {
    color: "#ADADAD",
  },
  emailAuthContainer: {
    paddingHorizontal: 20,
    gap: 5,
  },
  emailInputGroup: {
    gap: 10,
    paddingVertical: 5,
  },
  emailInputGroupLabel: {
    color: "#fff",
  },
  emailAuthInput: {
    fontWeight: "500",
    color: "#fff",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  passwordInputContainer: {
    position: "relative",
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#C084FC",
  },
  signInButtonContainer: {
    alignItems: "center",
    marginTop: 20,
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

export default SignInScreen;
