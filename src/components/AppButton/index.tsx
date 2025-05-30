import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../AppText";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";

type ButtonVariant = "primary" | "secondary" | "social" | "text";
type SocialProvider = "google" | "twitch" | "discord" | null;

interface AppButtonProps {
  variant?: ButtonVariant;
  label: string;
  onPress: () => void;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  socialProvider?: SocialProvider;
  style?: any;
  labelStyle?: any;
  onPressIn?: (e: GestureResponderEvent) => void;
  loading?: boolean;
}

export const AppButton: React.FC<AppButtonProps> = ({
  variant = "primary",
  label,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  socialProvider,
  style,
  labelStyle,
  loading,
  ...props
}) => {
  const getSocialIcon = () => {
    if (!socialProvider) return null;

    switch (socialProvider) {
      case "google":
        return <Ionicons name="logo-google" size={20} color="#fff" />;
      case "twitch":
        return <Ionicons name="logo-twitch" size={20} color="#fff" />;
      case "discord":
        return <FontAwesome6 name="discord" size={18} color="#fff" />;
      default:
        return null;
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.button, styles.primaryButton, disabled && styles.disabledButton, style];
      case "secondary":
        return [styles.button, styles.secondaryButton, disabled && styles.disabledButton, style];
      case "social":
        return [styles.button, styles.socialButton, style];
      case "text":
        return [styles.button, styles.textButton, style];
      default:
        return [styles.button, styles.primaryButton, style];
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "primary":
        return [styles.buttonText, styles.primaryButtonText];
      case "secondary":
        return [styles.buttonText, styles.secondaryButtonText];
      case "social":
        return [styles.buttonText, styles.socialButtonText];
      case "text":
        return [styles.buttonText, styles.textButtonText];
      default:
        return styles.buttonText;
    }
  };

  const finalLeftIcon = variant === "social" ? getSocialIcon() : leftIcon;

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {finalLeftIcon && (
        <View style={[styles.iconContainer, styles.socialIconContainer]}>{finalLeftIcon}</View>
      )}
      {loading ? (
        <ActivityIndicator size="small" color="#212121" />
      ) : (
        <Text variant="button" style={[getTextStyle(), labelStyle]}>
          {label}
        </Text>
      )}
      {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 100,
    paddingVertical: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    minHeight: 50,
  },
  primaryButton: {
    backgroundColor: "#C084FC",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    backgroundColor: "transparent",
  },
  textButton: {
    minHeight: undefined,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
  buttonText: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 14,
    color: "#fff",
  },
  primaryButtonText: {
    color: "#121212",
  },
  secondaryButtonText: {
    color: "#E4E6EA",
  },
  socialButtonText: {
    color: "#fff",
  },
  textButtonText: {
    color: "#9CA3AF",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconContainer: {
    position: "absolute",
    left: 20,
  },
});
