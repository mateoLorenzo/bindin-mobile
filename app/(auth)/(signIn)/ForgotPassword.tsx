/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState, useRef } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
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
import { usePasswordReset } from "@/src/hooks/usePasswordReset";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEmailValidation } from "@/src/hooks/useEmailValidation";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const { mutate: sendPasswordUpdateRequest, isPending, data } = usePasswordReset();

  const {
    isValid: isEmailValid,
    status: emailStatus,
    errorMessage: emailErrorMessage,
  } = useEmailValidation(email, 600);

  const emailBorderColorAnimation = useRef(new Animated.Value(0)).current;
  const errorMessageOpacity = useRef(new Animated.Value(0)).current;

  const animatedEmailBorderColor = emailBorderColorAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [colors.brand.error, colors.border.secondary, colors.brand.success],
  });

  const navigateBack = () => {
    router.back();
  };

  useEffect(() => {
    if (data) {
      router.navigate({
        pathname: "/CheckYourEmail",
        params: { email },
      });
    }
  }, [data]);

  useEffect(() => {
    // Update animation based on email status
    let animationValue = 0;
    let errorOpacity = 0;

    if (emailStatus === "valid") {
      animationValue = 1;
      errorOpacity = 0;
    } else if (emailStatus === "error") {
      animationValue = -1;
      errorOpacity = 1;
    } else {
      animationValue = 0;
      errorOpacity = 0;
    }

    Animated.parallel([
      Animated.timing(emailBorderColorAnimation, {
        toValue: animationValue,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(errorMessageOpacity, {
        toValue: errorOpacity,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [emailStatus]);

  const handlePasswordUpdateRequest = () => {
    if (isEmailValid) {
      sendPasswordUpdateRequest(email);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.continueButtonSectionContainer}
        >
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={navigateBack}>
              <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text variant="title">Recupera tu contraseña</Text>
            </View>
          </View>

          <View style={styles.emailAuthContainer}>
            <Text style={styles.emailInputGroupLabel} variant="label">
              Correo electrónico
            </Text>
            <Animated.View
              style={[styles.emailAuthInput, { borderColor: animatedEmailBorderColor }]}
            >
              <TextInput
                style={styles.emailInput}
                placeholder="Ejemplo@gmail.com"
                placeholderTextColor={colors.input.placeholder}
                keyboardType="email-address"
                autoFocus
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                multiline={false}
                numberOfLines={1}
                textContentType="emailAddress"
              />
            </Animated.View>

            <Animated.View style={{ opacity: errorMessageOpacity }}>
              <Text style={styles.errorText} variant="label">
                {emailErrorMessage || " "}
              </Text>
            </Animated.View>
          </View>

          <View style={styles.signInButtonContainer}>
            <Button
              label="Continuar"
              loading={isPending}
              onPress={handlePasswordUpdateRequest}
              disabled={!isEmailValid}
              variant="primary"
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 10 : 20,
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
  emailAuthContainer: {
    paddingHorizontal: 20,
    marginTop: 35,
    gap: 10,
  },
  emailInputGroup: {
    gap: 10,
  },
  emailInputGroupLabel: {
    color: colors.text.primary,
  },
  emailAuthInput: {
    color: colors.input.primary,
    borderWidth: 1,
    borderColor: colors.border.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    minHeight: 60,
    justifyContent: "center",
  },
  emailInput: {
    color: colors.input.primary,
    borderWidth: 0,
  },
  continueButtonSectionContainer: {
    flex: 1,
  },
  signInButtonContainer: {
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  errorText: {
    color: colors.brand.error,
    textAlign: "center",
    marginTop: 5,
    minHeight: 18,
  },
});

export default ForgotPasswordScreen;
