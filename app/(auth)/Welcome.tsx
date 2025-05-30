import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { AppText as Text } from "../../src/components/AppText";
import { AppButton as Button } from "../../src/components/AppButton";
import colors from "@/src/theme/colors";
const AppLogo = require("../../assets/images/app-logo.png");

const WelcomeScreen = () => {
  const navigateToSignIn = () => {
    router.navigate("/(auth)/(signIn)");
  };

  const navigateToSignUp = () => {
    router.navigate("/(auth)/(signUp)");
  };

  const navigateToHome = () => {
    router.navigate("/(home)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoSection}>
        <Image source={AppLogo} style={styles.appLogo} />
        <Text style={styles.appLogoText} variant="label">
          La Red Social de los Gamers.
        </Text>
      </View>

      <View style={styles.signInButtonsContainer}>
        <Button
          label="Iniciar sesión"
          onPress={navigateToSignIn}
          variant="secondary"
          style={styles.signInButton}
        />
        <Button label="Registrarme" onPress={navigateToSignUp} variant="primary" />
        <Button
          label="Continuar como invitado"
          onPress={navigateToHome}
          variant="text"
          style={styles.guestContainer}
        />
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
  appLogo: {
    width: 270,
  },
  appLogoText: {
    fontSize: 19,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  signInButtonsContainer: {
    alignItems: "center",
    gap: 10,
    width: "100%",
  },
  signInButton: {
    borderColor: colors.border.quaternary,
  },
  guestContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
});

export default WelcomeScreen;
