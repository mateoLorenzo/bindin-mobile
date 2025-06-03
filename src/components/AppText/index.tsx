import colors from "@/src/theme/colors";
import { StyleSheet, Text, TextProps } from "react-native";

type TextVariants = "title" | "subtitle" | "button" | "label" | "body" | "link";

interface Props extends TextProps {
  variant?: TextVariants;
}

export function AppText({ variant = "body", style, ...rest }: Props) {
  return <Text style={[styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 20,
    color: colors.text.primary,
  },
  subtitle: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 20,
    color: colors.text.primary,
  },
  button: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 14,
    color: colors.text.primary,
  },
  label: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 14,
    color: colors.text.secondary,
  },
  body: {
    fontFamily: "OpenSauceOneRegular",
    fontSize: 12,
    color: colors.text.primary,
  },
  link: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 14,
    color: colors.text.link,
    textDecorationLine: "underline",
  },
});
