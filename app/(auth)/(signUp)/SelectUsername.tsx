/* eslint-disable react-hooks/exhaustive-deps */
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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

  return (
    <GestureHandlerRootView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={goBack}>
              <Ionicons name="arrow-back" size={25} color="#fff" />
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
                // onChangeText={handleUsernameChange}
                onChangeText={handleUsernameChange}
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                autoFocus
              />
              {isLoading && (
                <ActivityIndicator size={24} color="#C084FC" style={styles.usernameInputIcon} />
              )}
              {!isLoading && usernameAvailable === true && (
                <MaterialCommunityIcons
                  name="check-circle"
                  size={24}
                  color="#24B173"
                  style={styles.usernameInputIcon}
                />
              )}
              {!isLoading && usernameAvailable === false && (
                <MaterialCommunityIcons
                  name="close-circle"
                  size={24}
                  color="#EF4444"
                  style={styles.usernameInputIcon}
                />
              )}
            </View>

            <TouchableOpacity
              style={{
                ...styles.signInButton,
                opacity: isUsernameInputFilled && usernameAvailable ? 1 : 0.4,
              }}
              disabled={!isUsernameInputFilled || !usernameAvailable}
              onPress={handleOpenBottomSheet}
            >
              <Text style={styles.signInButtonText} variant="button">
                Continuar
              </Text>
            </TouchableOpacity>
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
                <TouchableOpacity style={styles.authButton} onPress={navigateToCheckYourEmail}>
                  <Ionicons name="mail" size={22} color="#fff" style={styles.authIcon} />
                  <Text variant="button">Ingresa con tu correo</Text>
                </TouchableOpacity>
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
    color: "#9CA3AF",
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
    borderColor: "rgba(228, 230, 234, 0.1)",
    borderRadius: 100,
    borderWidth: 1,
    color: "#fff",
    fontSize: 14,
    paddingHorizontal: 20,
    paddingVertical: 18,
    width: "100%",
  },
  usernameInputIcon: {
    position: "absolute",
    right: 20,
  },
  signInButton: {
    alignItems: "center",
    backgroundColor: "#C084FC",
    borderRadius: 100,
    justifyContent: "center",
    paddingVertical: 16,
    width: "100%",
  },
  signInButtonText: {
    color: "#121212",
  },
  bottomSheetBackground: {
    backgroundColor: "#222222",
  },
  bottomSheetHandleIndicator: {
    backgroundColor: "#D9D9D9",
  },
  bottomSheetContainer: {
    alignItems: "center",
    flex: 1,
    marginTop: 10,
    paddingHorizontal: 20,
  },
  bottomSheetSubtitle: {
    color: "#9CA3AF",
    marginTop: 5,
  },
  authButtonsContainer: {
    gap: 10,
    marginTop: 25,
    width: "100%",
  },
  authButton: {
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.2)",
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
