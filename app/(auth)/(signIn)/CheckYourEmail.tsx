import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText as Text } from "../../../src/components/AppText";

const CheckYourEmail = () => {
  const openEmail = () => {
    router.navigate("/ResetPassword");
  };

  const resendEmail = () => {
    console.log("resendEmail");
  };

  const goBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title} variant="title">
          Revisa tu correo
        </Text>

        <View style={styles.verificationContainer}>
          <Text style={styles.verificationMessage} variant="label">
            Te enviamos un enlace de verificacion a:
          </Text>
          <View style={styles.emailIconContainer}>
            <Ionicons name="mail-outline" size={70} color="#fff" />
            <View style={styles.emailNotificationDot} />
          </View>
          <Text style={styles.userEmail} variant="body">
            mateolorenzo.dev@gmail.com
          </Text>
          <TouchableOpacity style={styles.resendLinkContainer} onPress={resendEmail}>
            <Text style={styles.resendLink} variant="button">
              Reenviar correo
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.openEmailContainer}>
        <TouchableOpacity style={styles.openEmailButton} onPress={openEmail}>
          <Text variant="button" style={styles.openEmailText}>
            Abrir correo
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CheckYourEmail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121212",
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
  title: {
    paddingVertical: 10,
  },
  verificationContainer: {
    alignItems: "center",
    paddingVertical: 25,
    gap: 20,
    width: "100%",
    borderWidth: 0.5,
    borderColor: "#E4E6EA40",
    borderRadius: 10,
    marginTop: 15,
  },
  verificationMessage: {
    color: "#ADADAD",
    fontFamily: "OpenSauceOneRegular",
  },
  emailIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emailIcon: {
    width: 70,
    height: 70,
  },
  emailNotificationDot: {
    width: 25,
    height: 25,
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "#121212",
    backgroundColor: "#C084FC",
    position: "absolute",
    top: 3,
    right: -5,
  },
  userEmail: {
    fontSize: 19,
    fontWeight: "600",
    color: "#fff",
    fontFamily: "OpenSauceOneBold",
  },
  resendLinkContainer: {
    marginVertical: 5,
  },
  resendLink: {
    color: "#C084FC",
  },
  openEmailContainer: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  openEmailButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 23.5,
    backgroundColor: "#C084FC",
    width: "100%",
  },
  openEmailText: {
    color: "#121212",
  },
});
