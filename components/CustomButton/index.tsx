import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppText as Text } from "../AppText";
import { AppleLogo, EmailLogo, FacebookLogo, GoogleLogo } from "../icons";

type ButtonVariant = "primary" | "secondary" | "social";
type SocialProvider = "apple" | "google" | "facebook" | "email" | null;

interface CustomButtonProps {
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
}

const CustomButton: React.FC<CustomButtonProps> = ({
  variant = "primary",
  label,
  onPress,
  disabled = false,
  leftIcon,
  rightIcon,
  socialProvider,
  style,
  labelStyle,
  ...props
}) => {
  const getSocialIcon = () => {
    if (!socialProvider) return null;
    const iconProps = {
      width: 24,
      height: 24,
      fill: "#fff",
    };
    switch (socialProvider) {
      case "apple":
        return <AppleLogo {...iconProps} />;
      case "google":
        return <GoogleLogo {...iconProps} />;
      case "facebook":
        return <FacebookLogo {...iconProps} />;
      case "email":
        return <EmailLogo {...iconProps} />;
      default:
        return null;
    }
  };

  const getButtonStyle = () => {
    switch (variant) {
      case "primary":
        return [
          styles.button,
          styles.primaryButton,
          disabled && styles.disabledButton,
          style,
        ];
      case "secondary":
        return [
          styles.button,
          styles.secondaryButton,
          disabled && styles.disabledButton,
          style,
        ];
      case "social":
        return [styles.button, styles.socialButton, style];
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
      <View style={styles.buttonContent}>
        {finalLeftIcon && (
          <View
            style={[
              styles.iconContainer,
              variant === "social" && styles.socialIconContainer,
            ]}
          >
            {finalLeftIcon}
          </View>
        )}
        <Text variant="button" style={[getTextStyle(), labelStyle]}>
          {label}
        </Text>
        {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    paddingVertical: 15,
    width: "100%",
  },
  primaryButton: {
    backgroundColor: "#C084FC",
  },
  secondaryButton: {
    backgroundColor: "#212121",
    borderWidth: 1,
    borderColor: "rgba(228, 230, 234, 0.1)",
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    backgroundColor: "transparent",
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
    fontSize: 14,
    fontFamily: "SoraSemiBold",
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
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  socialIconContainer: {
    position: "absolute",
    left: 20,
  },
});

export default CustomButton;
