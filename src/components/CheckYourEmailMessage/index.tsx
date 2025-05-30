import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText as Text } from "../../../src/components/AppText";
import { AppButton as Button } from "../AppButton";

interface IProps {
  email: string;
  onResendEmail: () => void;
  onOpenEmail: () => void;
  onBack: () => void;
}

export const CheckYourEmailMessage = ({
  email = "",
  onResendEmail = () => {},
  onOpenEmail = () => {},
  onBack = () => {},
}: IProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
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
            {email}
          </Text>
          <Button
            label="Reenviar correo"
            onPress={onResendEmail}
            variant="text"
            style={styles.resendLinkContainer}
            labelStyle={styles.resendLink}
          />
        </View>
      </View>

      <View style={styles.openEmailContainer}>
        <Button
          label="Abrir correo"
          onPress={onOpenEmail}
          variant="primary"
          style={styles.openEmailButton}
        />
      </View>
    </SafeAreaView>
  );
};

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
    paddingHorizontal: 20,
  },
  verificationMessage: {
    color: "#ADADAD",
    fontFamily: "OpenSauceOneRegular",
  },
  emailIconContainer: {
    justifyContent: "center",
    alignItems: "center",
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
    textAlign: "center",
  },
  resendLinkContainer: {
    marginVertical: 5,
  },
  resendLink: {
    color: "#C084FC",
  },
  openEmailContainer: {
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
});
