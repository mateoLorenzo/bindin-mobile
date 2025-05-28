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

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.titleContainer}>
            <Text style={styles.title} variant="title">
              Ingresa a tu cuenta
            </Text>
          </View>
          <View style={styles.authButtonsContainer}>
            <TouchableOpacity style={styles.authButton}>
              <Ionicons name="logo-google" size={20} color="#fff" style={styles.authIcon} />
              <Text style={styles.authText} variant="button">
                Ingresa con Google
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton}>
              <Ionicons name="logo-twitch" size={20} color="#fff" style={styles.authIcon} />
              <Text style={styles.authText} variant="button">
                Ingresa con Twitch
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.authButton}>
              <FontAwesome6 name="discord" size={18} color="#fff" style={styles.authIcon} />
              <Text style={styles.authText} variant="button">
                Ingresa con Discord
              </Text>
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
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#969696" />
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

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
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
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
  },
  authButtonsContainer: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 10,
    gap: 10,
    width: "100%",
  },
  authButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 17,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  authIcon: {
    position: "absolute",
    left: 20,
  },
  authText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
  },
  sectionDivider: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  sectionDividerLine: {
    width: "42%",
    height: 1,
    backgroundColor: "#ADADAD",
  },
  sectionDividerText: {
    fontSize: 12,
    color: "#ADADAD",
    fontWeight: "500",
  },
  emailAuthContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 20,
    gap: 5,
  },
  emailInputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingVertical: 5,
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
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 17,
  },
  passwordInputContainer: {
    position: "relative",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: "50%",
    transform: [{ translateY: -12 }],
    width: 24,
    height: 24,
  },
  forgotPasswordContainer: {
    display: "flex",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    fontSize: 13,
    color: "#C084FC",
    fontWeight: "600",
  },
  signInButtonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 23,
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
