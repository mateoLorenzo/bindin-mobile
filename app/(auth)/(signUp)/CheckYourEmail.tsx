import { useRouter, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { CheckYourEmailMessage } from "../../../src/components/CheckYourEmailMessage";
import { Linking } from "react-native";

const CheckYourEmail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { email } = useLocalSearchParams();

  const goBack = () => {
    router.back();
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

  const handleResendEmail = () => {
    // if (email && password && username) {
    //   const userData: UserDataToRegister = {
    //     user: {
    //       email: email as string,
    //       password: password as string,
    //       username: username as string,
    //       password_confirmation: password as string,
    //     },
    //   };
    //   registerUserMutation(userData);
    // }
  };

  return (
    <CheckYourEmailMessage
      email={email as string}
      onResendEmail={handleResendEmail}
      onOpenEmail={onOpenEmail}
      onBack={goBack}
      loading={isLoading}
    />
  );
};

export default CheckYourEmail;
