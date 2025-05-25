import { AppText as Text } from "@/components/AppText";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import CustomButton from "@/components/CustomButton";
import { useQuery } from "@tanstack/react-query";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const getTodos = async (id: number) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${id}`
    );
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default function SignUp() {
  const [id, setId] = useState(1);
  const [phonePrefix, setPhonePrefix] = useState("+549");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { data, isFetching, refetch, error } = useQuery({
    // El id es un parametro para que react query no cachee el resultado si el ID cambia
    queryKey: ["signup", id],
    queryFn: () => getTodos(id),
  });

  const formatPhone = (raw: string) => {
    const phone = parsePhoneNumberFromString(raw, "AR");
    setPhoneNumber(phone?.formatNational().replace(/^0/, "") || raw);
  };

  const navigateToVerify = () => {
    router.push({
      pathname: "/verifyNumber",
      params: {
        phoneNumber: `${phonePrefix} ${phoneNumber.trim() || "1140392404"}`,
      },
    });
  };

  if (error) {
    return Alert.alert("Error", error.message);
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ScrollView
        style={styles.screenContainer}
        contentContainerStyle={styles.screenContentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        bounces={false}
      >
        <Text style={styles.title} variant="caption">
          {isFetching ? "Loading..." : JSON.stringify(data.slice(0, 10))}
        </Text>
        <Text>{id}</Text>
        <View style={{ flex: 1 }} />
        {/* Esta funcion parece no ejecutarse porque react query cachea el
        resultado, si queremos que se muestre el loader entonces habria que usar
        el isFetching */}
        <CustomButton onPress={refetch} label="Refetch" />
        <CustomButton
          style={{ marginTop: 10 }}
          onPress={() => setId(id + 1)}
          label="Change ID"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  screenContentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    alignItems: "center",
    flex: 1,
  },
  title: {
    marginTop: Platform.OS === "android" ? 30 : 0,
    width: "100%",
    textAlign: "center",
    fontWeight: "600",
  },
  subtitle: {
    marginTop: 30,
    width: "100%",
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginTop: 10,
  },
  input: {
    minHeight: 50,
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    fontFamily: "Sora",
    color: "#ADADAD",
  },
  prefixInput: {
    minWidth: 70,
    textAlign: "center",
  },
  numberInput: {
    flex: 1,
    paddingLeft: 20,
  },
  numberInputCaption: {
    marginTop: 10,
    marginBottom: 20,
    width: "100%",
  },
  button: {
    backgroundColor: "#C084FC",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    marginTop: 20,
    alignItems: "center",
    paddingVertical: 15,
  },
  divisor: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    width: "100%",
    marginVertical: 30,
  },
  divisorLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  signupButtonsContainer: {
    gap: 10,
    width: "100%",
  },
  signupButton: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    paddingVertical: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  buttonIcon: {
    position: "absolute",
    left: 10,
  },
  signupButtonText: {
    color: "#121212",
  },
  termsContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  termsText: {
    width: "100%",
    textAlign: "center",
  },
  termsTextLink: {
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  bottomTextMargin: {
    marginTop: 50,
  },
  bottomText: {
    marginTop: 10,
    color: "#ADADAD",
  },
  bottomLink: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    color: "#ADADAD",
  },
});
