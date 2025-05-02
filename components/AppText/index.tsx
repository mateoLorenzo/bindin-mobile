import { StyleSheet, Text, TextProps } from "react-native";

type TextVariants =
  | "title"
  | "subtitle"
  | "body"
  | "caption"
  | "button"
  | "overline";

interface Props extends TextProps {
  variant?: TextVariants;
}

export function AppText({ variant = "body", style, ...rest }: Props) {
  return <Text style={[styles[variant], style]} {...rest} />;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "SoraBold",
    fontSize: 28,
    color: "#fff",
  },
  subtitle: {
    fontFamily: "SoraSemiBold",
    fontSize: 20,
    color: "#fff",
  },
  body: {
    fontFamily: "Sora",
    fontSize: 14,
    color: "#fff",
  },
  caption: {
    fontFamily: "Sora",
    fontSize: 12,
    color: "#ADADAD",
  },
  button: {
    fontFamily: "SoraSemiBold",
    fontSize: 15,
    color: "#fff",
  },
  overline: {
    fontFamily: "SoraMedium",
    fontSize: 11,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: "#fff",
  },
});
