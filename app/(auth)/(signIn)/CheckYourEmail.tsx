import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { CheckYourEmailMessage } from "../../../src/components/CheckYourEmailMessage";
import { usePasswordReset } from "@/src/hooks/usePasswordReset";

const CheckYourEmail = () => {
  const { mutate: sendPasswordUpdateRequest } = usePasswordReset();
  const { email } = useLocalSearchParams();
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  const onResendEmail = () => {
    if (email) {
      sendPasswordUpdateRequest(email as string);
    }
  };

  // Verify how to handle resend sign up email request
  const onOpenEmail = async () => {
    router.navigate({ pathname: "/ResetPassword" });
    // setIsLoading(true);
    // try {
    //   await Linking.openURL("https://gmail.app.goo.gl");
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  return (
    <CheckYourEmailMessage
      email={email as string}
      onResendEmail={onResendEmail}
      onOpenEmail={onOpenEmail}
      onBack={goBack}
    />
  );
};

export default CheckYourEmail;
