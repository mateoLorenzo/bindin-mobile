import { AppText as Text } from "@/components/AppText";
import CustomButton from "@/components/CustomButton";
import { ArrowLeftIcon } from "@/components/icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";

export default function VerifyNumber() {
  const { phoneNumber } = useLocalSearchParams();
  const [otp, setOtp] = useState("");

  const goBack = () => {
    router.back();
  };

  const navigateToAddPassword = () => {
    router.push("/addPassword");
  };

  const handleOtpChange = (code: string) => {
    setOtp(code);
  };

  const isOtpComplete = otp.length === 4;

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.screenContainer}>
        <View style={styles.headerTitle}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={goBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            activeOpacity={0.6}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
          <Text style={styles.subtitle} variant="subtitle">
            Verify your mobile number
          </Text>
        </View>
        <Text variant="body" style={styles.label}>
          Please enter the code we sent to {phoneNumber || "+549 11 4039-2404"}
        </Text>
        <View style={styles.inputContainer}>
          <OTPTextInput
            handleTextChange={handleOtpChange}
            containerStyle={styles.otpContainer}
            textInputStyle={styles.otpInput}
            inputCount={4}
            tintColor="#C084FC"
            offTintColor="rgba(255, 255, 255, 0.3)"
            defaultValue={otp}
            keyboardType="numeric"
            autoFocus={true}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <Text style={styles.aclaration}>
            Just put any combination of 4 numbers
          </Text>

          <CustomButton
            label="Continue"
            onPress={navigateToAddPassword}
            variant="primary"
            disabled={!isOtpComplete}
          />
          <CustomButton
            label="Resend verification code"
            onPress={() => {}}
            variant="secondary"
            style={styles.resendButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
  },
  headerTitle: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: 10,
  },
  subtitle: {
    textAlign: "center",
    flex: 1,
    fontSize: 18,
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
    borderRadius: 10,
    zIndex: 100,
  },
  label: {
    marginTop: 30,
    fontSize: 12,
    width: "100%",
    color: "#fff",
    fontWeight: "600",
  },
  inputContainer: {
    width: "100%",
    marginTop: 10,
  },
  otpContainer: {
    width: "100%",
    height: 65,
  },
  otpInput: {
    width: "20%",
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    color: "#fff",
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Sora",
    borderBottomWidth: 1,
  },
  buttonsContainer: {
    width: "100%",
    position: "absolute",
    top: "40%",
  },
  aclaration: {
    fontSize: 12,
    width: "100%",
    color: "rgba(228, 230, 234, 0.3)",
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  resendButton: {
    width: "100%",
    marginTop: 10,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
});
