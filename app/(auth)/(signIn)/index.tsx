import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  ActivityIndicator,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../../../src/components/AppText";
import axios, { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

const handleSignIn = async (email: string, password: string) => {
  try {
    const user = { login: email, password: password };
    const response = await axios.post("http://localhost:3000/users/sign_in", { user });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) throw error.response?.data;
    throw error;
  }
};

const SignInScreen = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLoginSuccess = () => {
    setEmail("");
    setPassword("");
    router.navigate("/(home)");
  };

  const handleLoginError = (error: any) => {
    if (error?.code === "wu") {
      setErrorMessage("Credenciales invalidas");
    } else {
      setErrorMessage("Error inesperado");
    }
  };

  const { mutate: requestSignIn, isPending } = useMutation({
    mutationKey: ["signIn"],
    mutationFn: () => handleSignIn(email, password),
    onSuccess: handleLoginSuccess,
    onError: handleLoginError,
  });

  const onSubmit = () => {
    requestSignIn();
  };

  const goBack = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onChangeEmail = (text: string) => {
    setErrorMessage("");
    setEmail(text);
  };

  const onChangePassword = (text: string) => {
    setErrorMessage("");
    setPassword(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView bounces={false}>
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
                value={email}
                onChangeText={onChangeEmail}
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
                  value={password}
                  onChangeText={onChangePassword}
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

            <TouchableOpacity
              style={{ ...styles.signInButton, opacity: !email || !password ? 0.5 : 1 }}
              onPress={onSubmit}
              disabled={!email || !password}
            >
              {isPending && <ActivityIndicator size="small" color="#121212" />}

              {!isPending && (
                <Text style={styles.signInButtonText} variant="button">
                  Continuar
                </Text>
              )}
            </TouchableOpacity>
            {errorMessage && (
              <Text style={styles.errorText} variant="button">
                {errorMessage}
              </Text>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
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
    marginTop: 20,
  },
  signInButton: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    backgroundColor: "#C084FC",
    width: "100%",
    height: 50,
  },
  signInButtonText: {
    color: "#121212",
  },
  errorText: {
    color: "#DD2B53",
    textAlign: "center",
    marginTop: 5,
    fontFamily: "OpenSauceOneMedium",
  },
});

export default SignInScreen;
