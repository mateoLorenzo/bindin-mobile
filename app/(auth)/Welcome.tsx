import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText as Text } from "../../src/components/AppText";
const AppLogo = require("../../assets/images/app-logo.png");

const WelcomeScreen = () => {
  const navigateToSignIn = () => {
    router.navigate("/(auth)/(signIn)");
  };

  const navigateToSignUp = () => {
    router.navigate("/(auth)/(signUp)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image source={AppLogo} style={styles.appLogo} />
        <Text style={styles.appLogoText} variant="label">
          La Red Social de los Gamers.
        </Text>
      </View>

      <View style={styles.signInButtonContainer}>
        <TouchableOpacity style={styles.signInButton} onPress={navigateToSignIn}>
          <Text style={styles.signInButtonText} variant="button">
            Iniciar sesión
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.signUpButton} onPress={navigateToSignUp}>
          <Text style={styles.signUpButtonText} variant="button">
            Registrarme
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.guestContainer}>
          <Text style={styles.guestText} variant="button">
            Continuar como invitado
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  logoSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  appLogoContainer: {
    alignItems: "center",
    gap: 5,
  },
  appLogo: {
    width: 270,
  },
  appLogoText: {
    fontSize: 19,
    fontWeight: "600",
    color: "#ADADAD",
  },
  signInButtonContainer: {
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  signUpButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 100,
    width: "100%",
    backgroundColor: "#C084FC",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.2)",
  },
  signUpButtonText: {
    color: "#121212",
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 100,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
  },
  signInButtonText: {
    color: "#fff",
  },
  guestContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  guestText: {
    color: "#9CA3AF",
  },
});

export default WelcomeScreen;
