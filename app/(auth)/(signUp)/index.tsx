import { Redirect } from "expo-router";
import React from "react";

const index = () => {
  return <Redirect href="/(auth)/(signUp)/SelectUsername" />;
};

export default index;
