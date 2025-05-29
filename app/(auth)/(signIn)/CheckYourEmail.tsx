import { useRouter } from "expo-router";
import React from "react";
import { CheckYourEmailMessage } from "../../../src/components/CheckYourEmailMessage";

const CheckYourEmail = () => {
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  return (
    <CheckYourEmailMessage
      email="mateolorenzo.dev@gmail.com"
      onResendEmail={() => {}}
      onOpenEmail={() => {}}
      onBack={goBack}
    />
  );
};

export default CheckYourEmail;
