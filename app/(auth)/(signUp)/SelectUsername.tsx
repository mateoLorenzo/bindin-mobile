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
} from "react-native";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppText as Text } from "../../../src/components/AppText";
import debounce from "lodash.debounce";
import { AppButton as Button } from "../../../src/components/AppButton";
import { SOCIAL_PROVIDERS } from "@/src/constants";
import { SocialProvider } from "@/src/types";
import colors from "@/src/theme/colors";

const SelectUsernameScreen = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const isUsernameInputFilled = username.trim() !== "";
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%"], []);

  const validateUsername = (value: string) => {
    if (value.trim() === "") return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUsernameAvailable(true);
    }, 1000);
  };

  const debouncedValidate = useRef(
    debounce((value: string) => validateUsername(value), 1000)
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
    router.navigate("/RegisterWithEmail");
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
              <TextInput
                style={styles.usernameInput}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={handleUsernameChange}
                placeholderTextColor={colors.input.placeholder}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                autoFocus
              />
              {isLoading && (
                <ActivityIndicator
                  size={24}
                  color={colors.brand.primary}
                  style={styles.usernameInputIcon}
                />
              )}
              {!isLoading && usernameAvailable === true && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color={colors.brand.success}
                  style={styles.usernameInputIcon}
                />
              )}
              {!isLoading && usernameAvailable === false && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color={colors.brand.error}
                  style={styles.usernameInputIcon}
                />
              )}
            </View>

            <Button
              label="Continuar"
              onPress={handleOpenBottomSheet}
              disabled={!isUsernameInputFilled || !usernameAvailable}
              variant="primary"
            />
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
  usernameInputIcon: {
    position: "absolute",
    right: 20,
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
