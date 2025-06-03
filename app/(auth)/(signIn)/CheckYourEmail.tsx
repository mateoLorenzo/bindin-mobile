import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { CheckYourEmailMessage } from "../../../src/components/CheckYourEmailMessage";
import { usePasswordReset } from "@/src/hooks/usePasswordReset";
import { Linking } from "react-native";

const CheckYourEmail = () => {
  const { mutate: sendPasswordUpdateRequest } = usePasswordReset();
  const { email } = useLocalSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const onResendEmail = () => {
    if (email) {
      sendPasswordUpdateRequest(email as string);
    }
  };

  const onOpenEmail = async () => {
    setIsLoading(true);
    try {
      await Linking.openURL("https://gmail.app.goo.gl");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CheckYourEmailMessage
      email={email as string}
      onResendEmail={onResendEmail}
      onOpenEmail={onOpenEmail}
      onBack={goBack}
      loading={isLoading}
    />
  );
};

export default CheckYourEmail;
