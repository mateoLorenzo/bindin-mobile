import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
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
import { AppButton as Button } from "../../../src/components/AppButton";
import { SOCIAL_PROVIDERS } from "@/src/constants";
import { SocialProvider } from "@/src/types";
import colors from "@/src/theme/colors";

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

  const handleGoogleLogin = () => {
    // Add google oauth
    router.navigate("/(home)");
  };

  const handleTwitchLogin = () => {
    // Add twitch oauth
    router.navigate("/(home)");
  };

  const handleDiscordLogin = () => {
    // Add discord oauth
    router.navigate("/(home)");
  };

  const handleSocialLogin = (provider: SocialProvider) => {
    switch (provider) {
      case "google":
        handleGoogleLogin();
        break;
      case "twitch":
        handleTwitchLogin();
        break;
      case "discord":
        handleDiscordLogin();
        break;
    }
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
              <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
              <Text variant="title">Ingresa a tu cuenta</Text>
            </View>
            <View style={styles.authButtonsContainer}>
              {SOCIAL_PROVIDERS.map((provider) => (
                <Button
                  key={provider.provider}
                  variant="social"
                  label={`Ingresa con ${provider.label}`}
                  onPress={() => handleSocialLogin(provider.provider)}
                  socialProvider={provider.provider}
                />
              ))}
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
                placeholderTextColor={colors.input.placeholder}
                keyboardType="email-address"
                value={email}
                onChangeText={onChangeEmail}
                autoCapitalize="none"
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
                  placeholderTextColor={colors.input.placeholder}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={onChangePassword}
                />
                <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                  <Ionicons
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color={colors.icon.secondary}
                  />
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

            <Button
              label="Continuar"
              onPress={onSubmit}
              disabled={!email || !password || isPending}
              variant="primary"
              loading={isPending}
              style={styles.signInButton}
            />
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
    backgroundColor: colors.background.divider,
  },
  sectionDividerText: {
    color: colors.text.secondary,
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
    color: colors.text.primary,
  },
  emailAuthInput: {
    fontWeight: "500",
    color: colors.input.primary,
    borderWidth: 1,
    borderColor: colors.border.secondary,
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
    color: colors.brand.primary,
  },
  signInButton: {
    marginTop: 20,
  },
  errorText: {
    color: colors.brand.error,
    textAlign: "center",
    marginTop: 5,
    fontFamily: "OpenSauceOneMedium",
  },
});

export default SignInScreen;
