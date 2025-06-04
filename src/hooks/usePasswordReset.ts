import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import Constants from "expo-constants";
import { Platform } from "react-native";

// const APP_STAGE_URL = "http://localhost:3000"
const apiUrl = Platform.OS === "ios" ? Constants.expoConfig?.extra?.apiUrl : "http://10.0.2.2:3000";

const sendPasswordUpdateRequest = async (email: string) => {
  try {
    const response = await axios.post(`${apiUrl}/users/password`, {
      user: {
        email,
      },
    });
    const data = response.data;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("error from sendPasswordUpdateRequest", error.response);
    }
    throw error;
  }
};

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: sendPasswordUpdateRequest,
  });
};
