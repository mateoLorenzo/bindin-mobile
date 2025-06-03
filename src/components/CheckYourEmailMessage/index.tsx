import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StyleSheet, TouchableOpacity, View } from "react-native";
import { AppText as Text } from "../../../src/components/AppText";
import { AppButton as Button } from "../AppButton";
import colors from "@/src/theme/colors";
import React, { useState, useEffect } from "react";
import { RESEND_EMAIL_INTERVAL } from "@/src/constants";

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
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prevCount) => prevCount - 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [countdown]);

  const handleResendEmail = () => {
    if (countdown === 0) {
      onResendEmail();
      setCountdown(RESEND_EMAIL_INTERVAL);
    }
  };

  const getResendButtonLabel = () => {
    if (countdown > 0) {
      return `Reenviar en ${countdown}s`;
    }
    return "Reenviar correo";
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Ionicons name="arrow-back" size={24} color={colors.icon.primary} />
        </TouchableOpacity>

        <Text style={styles.title} variant="title">
          Revisa tu correo
        </Text>

        <View style={styles.verificationContainer}>
          <Text style={styles.verificationMessage} variant="label">
            Te enviamos un enlace de verificacion a:
          </Text>
          <View style={styles.emailIconContainer}>
            <Ionicons name="mail-outline" size={70} color={colors.icon.primary} />
            <View style={styles.notificationDotContainer}>
              <View style={styles.notificationDot} />
            </View>
          </View>
          <Text style={styles.userEmail} variant="body">
            {email}
          </Text>
          <Button
            label={getResendButtonLabel()}
            onPress={handleResendEmail}
            disabled={countdown > 0}
            variant="text"
            style={styles.resendLinkContainer}
            labelStyle={styles.resendLink}
          />
        </View>
      </View>

      <View style={styles.openEmailContainer}>
        <Button label="Abrir correo" onPress={onOpenEmail} variant="primary" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
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
    borderColor: colors.border.tertiary,
    borderRadius: 10,
    marginTop: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.background.primary,
  },
  verificationMessage: {
    color: colors.text.secondary,
    fontFamily: "OpenSauceOneRegular",
  },
  emailIconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  notificationDotContainer: {
    width: 25,
    height: 25,
    backgroundColor: colors.background.primary,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 3,
    right: -5,
  },
  notificationDot: {
    width: 15,
    height: 15,
    backgroundColor: colors.brand.primary,
    borderRadius: 100,
  },
  userEmail: {
    fontSize: 19,
    fontWeight: "600",
    color: colors.text.primary,
    fontFamily: "OpenSauceOneBold",
    textAlign: "center",
  },
  resendLinkContainer: {
    marginVertical: 5,
  },
  resendLink: {
    color: colors.text.link,
  },
  openEmailContainer: {
    justifyContent: "flex-end",
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
