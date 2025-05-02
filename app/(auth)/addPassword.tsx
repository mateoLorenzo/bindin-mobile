import { AppText as Text } from "@/components/AppText";
import CustomButton from "@/components/CustomButton";
import { ArrowLeftIcon, EyeClosedIcon, EyeOpenIcon } from "@/components/icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const goBack = () => {
    router.back();
  };

  const handleSubmit = () => {
    router.push("/home");
  };

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
            Add your password
          </Text>
        </View>

        <Text variant="body" style={styles.label}>
          Password
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            autoFocus={true}
            style={styles.input}
            placeholderTextColor="#9CA3AF"
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.6}
          >
            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
          </TouchableOpacity>
        </View>

        <Text variant="body" style={styles.inputCaption}>
          Must be 8 or more characters and contain at least 1 number and 1
          special character.
        </Text>

        <View style={styles.buttonContainer}>
          <Text style={styles.aclaration}>
            Just put any combination of 8 characters
          </Text>
          <CustomButton
            label="Continue"
            onPress={handleSubmit}
            variant="primary"
            disabled={password.length < 8}
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
    padding: 20,
    paddingTop: Platform.OS === "android" ? 40 : 20,
    backgroundColor: "#121212",
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
    width: "100%",
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    width: "100%",
    position: "relative",
    justifyContent: "center",
    marginTop: 10,
  },
  eyeButton: {
    position: "absolute",
    right: 0,
    paddingRight: 15,
    borderRadius: 5,
    height: "100%",
    justifyContent: "center",
  },
  input: {
    minHeight: 50,
    borderRadius: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    fontFamily: "Sora",
    color: "#fff",
    width: "100%",
  },
  inputCaption: {
    marginTop: 10,
    width: "100%",
    fontSize: 12,
    fontWeight: "400",
    color: "#ADADAD",
  },
  button: {
    backgroundColor: "#C084FC",
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    paddingVertical: 15,
  },
  aclaration: {
    fontSize: 12,
    width: "100%",
    color: "rgba(228, 230, 234, 0.3)",
    fontWeight: "600",
    marginBottom: 10,
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    position: "absolute",
    top: "40%",
  },
});
