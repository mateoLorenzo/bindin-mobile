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
import colors from "@/src/theme/colors";

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
        return <Ionicons name="logo-google" size={20} color={colors.icon.primary} />;
      case "twitch":
        return <Ionicons name="logo-twitch" size={20} color={colors.icon.primary} />;
      case "discord":
        return <FontAwesome6 name="discord" size={18} color={colors.icon.primary} />;
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
        return [styles.button, styles.textButton, disabled && styles.disabledButton, style];
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
        <ActivityIndicator size="small" color={colors.brand.tertiary} />
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
    backgroundColor: colors.brand.primary,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: colors.border.tertiary,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: colors.border.tertiary,
  },
  textButton: {
    minHeight: undefined,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  disabledButton: {
    backgroundColor: colors.brand.primaryDisabled,
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
    color: colors.text.primary,
  },
  primaryButtonText: {
    color: colors.text.quaternary,
  },
  secondaryButtonText: {
    color: colors.text.primary,
  },
  socialButtonText: {
    color: colors.text.primary,
  },
  textButtonText: {
    color: colors.text.tertiary,
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
