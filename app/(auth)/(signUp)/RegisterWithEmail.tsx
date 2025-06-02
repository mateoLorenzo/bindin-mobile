import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";
import { AppText as Text } from "../../../src/components/AppText";
import { AppButton as Button } from "../../../src/components/AppButton";
import colors from "@/src/theme/colors";

interface PasswordCriteria {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
}

const PasswordStep = ({ completed }: { completed: boolean }) => (
  <View
    style={[
      styles.passwordStep,
      { backgroundColor: completed ? colors.brand.success : colors.background.quaternary },
    ]}
  />
);

const RegisterWithEmailScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const isEmailInputFilled = email.trim() !== "";
  const { username } = useLocalSearchParams();

  const criteriaOpacity = useRef(new Animated.Value(0)).current;
  const criteriaHeight = useRef(new Animated.Value(0)).current;
  const borderColorAnimation = useRef(new Animated.Value(0)).current;
  const emailBorderColorAnimation = useRef(new Animated.Value(0)).current;

  const passwordCriteria = useMemo<PasswordCriteria>(() => {
    return {
      hasMinLength: password.length >= 10,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  }, [password]);

  const isEmailValid = useMemo(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return email.trim() !== "" && emailRegex.test(email.trim());
  }, [email]);

  const criteriaOrder = [
    {
      key: "hasMinLength",
      message: "Mínimo 10 caracteres",
      completed: passwordCriteria.hasMinLength,
    },
    {
      key: "hasUppercase",
      message: "Al menos 1 mayúscula",
      completed: passwordCriteria.hasUppercase,
    },
    {
      key: "hasLowercase",
      message: "Al menos 1 minúscula",
      completed: passwordCriteria.hasLowercase,
    },
    { key: "hasNumber", message: "Al menos 1 número", completed: passwordCriteria.hasNumber },
    {
      key: "hasSpecialChar",
      message: "Al menos 1 carácter especial (!@#$%^&*)",
      completed: passwordCriteria.hasSpecialChar,
    },
  ];

  const completedSteps = criteriaOrder.filter((criterion) => criterion.completed).length;
  const isPasswordValid = completedSteps === 5;
  const nextIncompleteStep = criteriaOrder.find((criterion) => !criterion.completed);

  const animatedBorderColor = borderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border.secondary, colors.brand.success],
  });

  const animatedEmailBorderColor = emailBorderColorAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border.secondary, colors.brand.success],
  });

  useEffect(() => {
    // Password criteria - Fade in and slide up
    if (showCriteria) {
      Animated.parallel([
        Animated.timing(criteriaOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(criteriaHeight, {
          toValue: 50,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      // Password criteria - Fade out and slide down
      Animated.parallel([
        Animated.timing(criteriaOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(criteriaHeight, {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [showCriteria]);

  useEffect(() => {
    // Animate border color when password becomes valid/invalid
    if (showCriteria) {
      Animated.timing(borderColorAnimation, {
        toValue: isPasswordValid ? 1 : 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    } else {
      borderColorAnimation.setValue(0);
    }
  }, [isPasswordValid, showCriteria]);

  useEffect(() => {
    Animated.timing(emailBorderColorAnimation, {
      toValue: isEmailValid ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isEmailValid]);

  const goBack = () => {
    router.back();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value.length > 0 && !showCriteria) {
      setShowCriteria(true);
    } else if (value.length === 0) {
      setShowCriteria(false);
    }
  };

  const navigateToCheckYourEmail = () => {
    router.navigate("/CheckYourEmail");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={25} color={colors.icon.primary} />
          </TouchableOpacity>

          <Text style={styles.title} variant="title">
            Registrate con tu correo
          </Text>

          <Text style={styles.subtitle} variant="body">
            Usuario: {username}
          </Text>
        </View>

        <View style={styles.emailAuthContainer}>
          <View style={styles.emailInputGroup}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Correo electrónico
            </Text>
            <Animated.View
              style={[styles.emailAuthInput, { borderColor: animatedEmailBorderColor }]}
            >
              <TextInput
                style={[styles.emailInput]}
                placeholder="Ejemplo@gmail.com"
                placeholderTextColor={colors.input.placeholder}
                keyboardType="email-address"
                autoFocus
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </Animated.View>
          </View>

          <View style={styles.passwordInputGroup}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Contraseña
            </Text>
            <View style={styles.passwordInputContainer}>
              <Animated.View style={[styles.emailAuthInput, { borderColor: animatedBorderColor }]}>
                <TextInput
                  style={[styles.passwordInput]}
                  placeholder="***********"
                  placeholderTextColor={colors.input.placeholder}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={handlePasswordChange}
                />
              </Animated.View>
              <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color={colors.icon.secondary}
                />
              </TouchableOpacity>
            </View>

            <Animated.View
              style={[
                styles.passwordValidationContainer,
                {
                  height: criteriaHeight,
                  opacity: criteriaOpacity,
                  overflow: "hidden",
                },
              ]}
            >
              <View style={styles.stepsContainer}>
                {criteriaOrder.map((_, index) => (
                  <PasswordStep key={index} completed={index < completedSteps} />
                ))}
              </View>

              <View style={styles.messageContainer}>
                {isPasswordValid ? (
                  <View style={styles.successContainer}>
                    <Ionicons name="checkmark-circle" size={20} color={colors.brand.success} />
                    <Text
                      style={[styles.successText, { color: colors.brand.success }]}
                      variant="label"
                    >
                      ¡Contraseña segura!
                    </Text>
                  </View>
                ) : (
                  nextIncompleteStep && (
                    <View style={styles.stepMessageContainer}>
                      <Text style={styles.stepMessage} variant="label">
                        {nextIncompleteStep.message}
                      </Text>
                    </View>
                  )
                )}
              </View>
            </Animated.View>
          </View>
        </View>

        <View style={styles.signInButtonContainer}>
          <Button
            label="Continuar"
            onPress={navigateToCheckYourEmail}
            disabled={!isEmailInputFilled || !isPasswordValid}
            variant="primary"
          />
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
    marginTop: 10,
  },
  subtitle: {
    color: colors.text.tertiary,
    fontFamily: "OpenSauceOneMedium",
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
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
  passwordInputGroup: {
    gap: 10,
    marginTop: 5,
    marginBottom: 5,
  },
  emailInputGroupLabel: {
    color: colors.input.primary,
  },
  emailAuthInput: {
    color: colors.input.primary,
    borderWidth: 1,
    borderColor: colors.border.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 18,
  },
  emailInput: {
    color: colors.input.primary,
    borderWidth: 0,
  },
  passwordInputContainer: {
    justifyContent: "center",
  },
  passwordInput: {
    paddingRight: 50,
    color: colors.input.primary,
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
  },
  passwordValidationContainer: {
    gap: 5,
    justifyContent: "center",
  },
  stepsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
  },
  passwordStep: {
    width: 40,
    height: 4,
    borderRadius: 2,
  },
  messageContainer: {
    minHeight: 24,
    justifyContent: "center",
  },
  successContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "center",
  },
  successText: {
    fontFamily: "OpenSauceOneSemiBold",
  },
  stepMessageContainer: {
    alignItems: "center",
  },
  stepMessage: {
    color: colors.text.secondary,
    textAlign: "center",
    fontSize: 12,
  },
  signInButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 10,
  },
  termsAndPrivacyText: {
    color: colors.text.secondary,
    textAlign: "center",
  },
});

export default RegisterWithEmailScreen;
