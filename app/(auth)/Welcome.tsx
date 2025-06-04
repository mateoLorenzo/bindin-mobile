import { router } from "expo-router";
import React from "react";
import { Image, Platform, StyleSheet, View } from "react-native";
import { AppText as Text } from "../../src/components/AppText";
import { AppButton as Button } from "../../src/components/AppButton";
import colors from "@/src/theme/colors";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginBottom: Platform.OS === "ios" ? 10 : 20,
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
    fontSize: Platform.OS === "ios" ? 18 : 16,
    fontWeight: "600",
    color: colors.text.secondary,
    textAlign: "center",
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
