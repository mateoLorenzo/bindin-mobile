import { AppText as Text } from "@/components/AppText";
import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import { parsePhoneNumberFromString } from "libphonenumber-js";
export default function SignUp() {
  const [phonePrefix, setPhonePrefix] = useState("+549");
  const [phoneNumber, setPhoneNumber] = useState("");

  const formatPhone = (raw: string) => {
    const phone = parsePhoneNumberFromString(raw, "AR");
    setPhoneNumber(phone?.formatNational().replace(/^0/, "") || raw);
  };

  const navigateToVerify = () => {
    router.push({
      pathname: "/auth/verifyNumber",
      params: {
        phoneNumber: `${phonePrefix} ${phoneNumber.trim() || "1140392404"}`,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={styles.screenContentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={styles.title} variant="subtitle">
          Sign Up
        </Text>
        <Text style={styles.subtitle}>Enter your phone number</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.prefixInput]}
            placeholder="+549"
            value={phonePrefix}
            onChangeText={setPhonePrefix}
            keyboardType="phone-pad"
          />
          <TextInput
            style={[styles.input, styles.numberInput]}
            placeholder="Phone number"
            placeholderTextColor="#9CA3AF"
            value={phoneNumber}
            onChangeText={formatPhone}
            keyboardType="phone-pad"
          />
        </View>
        <Text variant="caption" style={styles.numberInputCaption}>
          We will send you a verification code to this number.
        </Text>
        <CustomButton
          label="Sign Up"
          onPress={navigateToVerify}
          variant="primary"
        />
        <View style={styles.divisor}>
          <View style={styles.divisorLine} />
          <Text variant="caption">OR</Text>
          <View style={styles.divisorLine} />
        </View>

        <View style={styles.signupButtonsContainer}>
          <CustomButton
            label="Sign up with Apple"
            onPress={navigateToVerify}
            variant="social"
            socialProvider="apple"
          />
          <CustomButton
            label="Sign up with Google"
            onPress={navigateToVerify}
            variant="social"
            socialProvider="google"
          />
          <CustomButton
            label="Sign up with Facebook"
            onPress={navigateToVerify}
            variant="social"
            socialProvider="facebook"
          />
          <CustomButton
            label="Sign up with Email"
            onPress={navigateToVerify}
            variant="social"
            socialProvider="email"
          />
        </View>

        <View style={styles.termsContainer}>
          <Text variant="caption" style={styles.termsText}>
            By continuing, you agree to the Bindin.gg&apos;s
          </Text>
          <Text variant="caption" style={styles.termsText}>
            <Text
              variant="caption"
              style={[styles.termsText, styles.termsTextLink]}
            >
              Terms & Conditions
            </Text>{" "}
            and{" "}
            <Text
              variant="caption"
              style={[styles.termsText, styles.termsTextLink]}
            >
              Privacy Policy.
            </Text>
          </Text>
        </View>

        <Text
          variant="body"
          style={[styles.bottomText, styles.bottomTextMargin]}
        >
          Already a user?
          <Text variant="body" style={styles.bottomLink}>
            {" "}
            Log in
          </Text>
        </Text>

        <Text variant="body" style={styles.bottomText}>
          Not ready to sign up?
          <Text variant="body" style={styles.bottomLink}>
            {" "}
            Guest mode
          </Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  screenContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 30,
    width: "100%",
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginTop: 10,
  },
  input: {
    minHeight: 50,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    fontFamily: "Sora",
    color: "#ADADAD",
  },
  prefixInput: {
    minWidth: 70,
    textAlign: "center",
  },
  numberInput: {
    flex: 1,
    paddingLeft: 20,
  },
  numberInputCaption: {
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#C084FC",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 15,
  },
  divisor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginVertical: 30,
  },
  divisorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  signupButtonsContainer: {
    gap: 10,
    width: "100%",
  },
  signupButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  buttonIcon: {
    position: "absolute",
    left: 10,
  },
  signupButtonText: {
    color: "#121212",
  },
  termsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  termsText: {
    width: "100%",
    textAlign: "center",
  },
  termsTextLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  bottomTextMargin: {
    marginTop: 50,
  },
  bottomText: {
    marginTop: 10,
    color: "#ADADAD",
  },
  bottomLink: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#ADADAD",
  },
});
