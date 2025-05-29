import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { AppText as Text } from "../../../src/components/AppText";

const RegisterWithEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const isEmailInputFilled = email.trim() !== "";
  const isPasswordInputFilled = password.trim() !== "";

  const goBack = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToCheckYourEmail = () => {
    router.navigate("/CheckYourEmail");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={25} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.title} variant="title">
            Correo y contraseña
          </Text>
        </View>

        <View style={styles.emailAuthContainer}>
          <View style={styles.emailInputGroup}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Correo electrónico
            </Text>
            <TextInput
              style={styles.emailAuthInput}
              placeholder="Ejemplo@gmail.com"
              placeholderTextColor="#ADADAD"
              keyboardType="email-address"
              autoFocus
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.emailInputGroup}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Contraseña
            </Text>
            <View style={styles.passwordInputContainer}>
              <TextInput
                style={{ ...styles.emailAuthInput, ...styles.passwordInput }}
                placeholder="***********"
                placeholderTextColor="#ADADAD"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                <Ionicons name={showPassword ? "eye" : "eye-off"} size={24} color="#ADADAD" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.signInButtonContainer}>
          <TouchableOpacity
            style={{
              ...styles.signInButton,
              opacity: isEmailInputFilled && isPasswordInputFilled ? 1 : 0.4,
            }}
            disabled={!isEmailInputFilled || !isPasswordInputFilled}
            onPress={navigateToCheckYourEmail}
          >
            <Text style={styles.signInButtonText} variant="button">
              Continuar
            </Text>
          </TouchableOpacity>

          <Text style={styles.termsAndPrivacyText} variant="label">
            Al registrarte aceptas nuestros <Text variant="link">Términos</Text> y{" "}
            <Text variant="link">Política de Privacidad</Text>
          </Text>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    paddingVertical: 10,
  },
  emailAuthContainer: {
    paddingHorizontal: 20,
    gap: 5,
    marginTop: 15,
  },
  emailInputGroup: {
    gap: 10,
    marginVertical: 5,
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
  passwordInputContainer: {
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
  signInButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    paddingHorizontal: 20,
    gap: 10,
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 23.5,
    backgroundColor: "#C084FC",
    width: "100%",
  },
  signInButtonText: {
    color: "#121212",
  },
  termsAndPrivacyText: {
    color: "#ADADAD",
    textAlign: "center",
  },
});

export default RegisterWithEmailScreen;
