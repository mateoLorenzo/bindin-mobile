/* eslint-disable react-hooks/exhaustive-deps */
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppText as Text } from "../../../src/components/AppText";
import debounce from "lodash.debounce";
import { AppButton as Button } from "../../../src/components/AppButton";
import { SOCIAL_PROVIDERS } from "@/src/constants";
import { SocialProvider } from "@/src/types";
import colors from "@/src/theme/colors";
import { useQuery } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";

const APP_STAGE_URL = "http://localhost:3000";

const checkUsername = async (username: string) => {
  try {
    // Delay to always show at least 500ms of loading
    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
    const requestPromise = axios
      .get(`${APP_STAGE_URL}/users/availability?username=${username}`, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => response.data);
    const [data] = await Promise.all([requestPromise, minDelay]);
    return data.availability;
  } catch (e) {
    if (isAxiosError(e)) {
      console.log("error.response.data from checkUsername", e.response?.data);
    }
    console.log("error from checkUsername", e);
    return false;
  }
};

const SelectUsernameScreen = () => {
  const [username, setUsername] = useState("");
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const isUsernameInputFilled = username.trim() !== "";
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const usernameBorderColorAnimation = useRef(new Animated.Value(0)).current;
  const usernameSuccessOpacity = useRef(new Animated.Value(0)).current;
  const usernameErrorOpacity = useRef(new Animated.Value(0)).current;

  const {
    data,
    isFetching: isLoading,
    refetch,
  } = useQuery({
    queryKey: ["check-username", username],
    queryFn: () => checkUsername(username),
    enabled: false,
    staleTime: 0,
    gcTime: 0,
  });

  const animatedUsernameBorderColor = usernameBorderColorAnimation.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [colors.brand.error, colors.border.secondary, colors.brand.success],
  });

  useEffect(() => {
    if (data !== undefined) {
      setUsernameAvailable(data);
    }
  }, [data]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(usernameBorderColorAnimation, {
        toValue: usernameAvailable === true ? 1 : usernameAvailable === false ? -1 : 0,
        duration: 150,
        useNativeDriver: false,
      }),
      Animated.timing(usernameSuccessOpacity, {
        toValue: usernameAvailable === true ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(usernameErrorOpacity, {
        toValue: usernameAvailable === false ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
  }, [usernameAvailable]);

  const validateUsername = (value: string) => {
    if (value.trim() === "") return;
    setUsernameAvailable(null);
    refetch();
  };

  const debouncedValidate = useRef(
    debounce((value: string) => validateUsername(value), 500)
  ).current;

  useEffect(() => {
    debouncedValidate(username);
  }, [username]);

  const handleUsernameChange = (value: string) => {
    setUsernameAvailable(null);
    setUsername(value);
  };

  const goBack = () => {
    router.back();
  };

  const navigateToCheckYourEmail = () => {
    router.navigate({
      pathname: "/RegisterWithEmail",
      params: { username: username },
    });
  };

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
    Keyboard.dismiss();
  };

  const handleGoogleLogin = () => {
    router.navigate("/(onboarding)");
  };

  const handleTwitchLogin = () => {
    router.navigate("/(onboarding)");
  };

  const handleDiscordLogin = () => {
    router.navigate("/(onboarding)");
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
      default:
        break;
    }
  };

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Ionicons name="arrow-back" size={25} color={colors.icon.primary} />
            </TouchableOpacity>

            <Text style={styles.title} variant="title">
              Elegi tu nombre de usuario
            </Text>

            <Text style={styles.subtitle} variant="body">
              Podes cambiarlo cada 2 semanas
            </Text>
          </View>

          <View style={styles.usernameContainer}>
            <View style={styles.usernameInputGroup}>
              <Animated.View
                style={[styles.usernameInput, { borderColor: animatedUsernameBorderColor }]}
              >
                <TextInput
                  style={[styles.usernameTextInput]}
                  placeholder="Nombre de usuario"
                  value={username}
                  onChangeText={handleUsernameChange}
                  placeholderTextColor={colors.input.placeholder}
                  autoCapitalize="none"
                  autoCorrect={false}
                  returnKeyType="done"
                  autoFocus
                />
              </Animated.View>
              {isLoading && (
                <ActivityIndicator
                  size={24}
                  color={colors.brand.primary}
                  style={styles.usernameInputIcon}
                />
              )}
              {!isLoading && usernameAvailable === true && (
                <Animated.View
                  style={[styles.usernameInputIcon, { opacity: usernameSuccessOpacity }]}
                >
                  <MaterialCommunityIcons
                    name="check-circle"
                    size={24}
                    color={colors.brand.success}
                  />
                </Animated.View>
              )}
              {!isLoading && usernameAvailable === false && (
                <Animated.View
                  style={[styles.usernameInputIcon, { opacity: usernameErrorOpacity }]}
                >
                  <MaterialCommunityIcons
                    name="close-circle"
                    size={24}
                    color={colors.brand.error}
                  />
                </Animated.View>
              )}
            </View>

            <Button
              label="Continuar"
              onPress={handleOpenBottomSheet}
              disabled={!isUsernameInputFilled || !usernameAvailable || isLoading}
              variant="primary"
            />
            {!isLoading && usernameAvailable === false && (
              <Animated.View style={{ opacity: usernameErrorOpacity }}>
                <Text
                  variant="body"
                  style={{ ...styles.usernameInputMessage, color: colors.brand.error }}
                >
                  Usuario no disponible
                </Text>
              </Animated.View>
            )}
            {!isLoading && usernameAvailable === true && (
              <Animated.View style={{ opacity: usernameSuccessOpacity }}>
                <Text
                  variant="body"
                  style={{ ...styles.usernameInputMessage, color: colors.brand.success }}
                >
                  ¡Usuario disponible!
                </Text>
              </Animated.View>
            )}
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            index={-1}
            enablePanDownToClose
            backgroundStyle={styles.bottomSheetBackground}
            handleIndicatorStyle={styles.bottomSheetHandleIndicator}
            backdropComponent={(props) => (
              <BottomSheetBackdrop
                {...props}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                opacity={0.7}
                pressBehavior="close"
                enableTouchThrough={false}
              />
            )}
          >
            <BottomSheetView style={styles.bottomSheetContainer}>
              <Text variant="title">Creemos tu cuenta</Text>
              <Text variant="body" style={styles.bottomSheetSubtitle}>
                Y que empiece lo bueno
              </Text>

              <View style={styles.authButtonsContainer}>
                {SOCIAL_PROVIDERS.map((provider) => (
                  <Button
                    key={provider.provider}
                    label={`Ingresa con ${provider.label}`}
                    onPress={() => handleSocialLogin(provider.provider)}
                    variant="social"
                    socialProvider={provider.provider}
                  />
                ))}
                <Button
                  label="Ingresa con tu correo"
                  onPress={navigateToCheckYourEmail}
                  variant="secondary"
                  leftIcon={<Ionicons name="mail" size={22} color={colors.icon.primary} />}
                />
              </View>
            </BottomSheetView>
          </BottomSheet>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  backButton: {
    alignSelf: "flex-start",
  },
  title: {
    marginTop: 15,
  },
  subtitle: {
    color: colors.text.tertiary,
    fontFamily: "OpenSauceOneMedium",
    fontSize: 14,
    marginTop: 5,
  },
  usernameContainer: {
    gap: 10,
    paddingHorizontal: 20,
  },
  usernameInputGroup: {
    alignItems: "center",
    flexDirection: "row",
  },
  usernameInput: {
    borderColor: colors.border.secondary,
    borderRadius: 100,
    borderWidth: 1,
    color: colors.input.primary,
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    width: "100%",
  },
  usernameTextInput: {
    color: colors.input.primary,
    fontSize: 14,
    borderWidth: 0,
    width: "100%",
  },
  usernameInputIcon: {
    position: "absolute",
    right: 20,
  },
  usernameInputMessage: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
    fontFamily: "OpenSauceOneSemiBold",
  },
  bottomSheetBackground: {
    backgroundColor: colors.background.tertiary,
  },
  bottomSheetHandleIndicator: {
    backgroundColor: colors.background.quaternary,
  },
  bottomSheetContainer: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  bottomSheetSubtitle: {
    color: colors.text.tertiary,
    fontFamily: "OpenSauceOneMedium",
    marginTop: 5,
  },
  authButtonsContainer: {
    gap: 10,
    marginTop: 25,
    width: "100%",
  },
  authButton: {
    alignItems: "center",
    borderColor: colors.border.tertiary,
    borderWidth: 1,
    borderRadius: 100,
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 18,
  },
  authIcon: {
    left: 20,
    position: "absolute",
  },
});

export default SelectUsernameScreen;
