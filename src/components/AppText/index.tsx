import { StyleSheet, Text, TextProps } from "react-native";

type TextVariants = "title" | "subtitle" | "button" | "label" | "body";

interface Props extends TextProps {
  variant?: TextVariants;
}

export function AppText({ variant = "body", style, ...rest }: Props) {
  return <Text style={[styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "PoppinsBold",
    fontSize: 24,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 20,
    color: "#fff",
  },
  button: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 16,
    color: "#fff",
  },
  label: {
    fontFamily: "OpenSauceOneSemiBold",
    fontSize: 14,
    color: "#ADADAD",
  },
  body: {
    fontFamily: "OpenSauceOneRegular",
    fontSize: 12,
    color: "#fff",
  },
});
