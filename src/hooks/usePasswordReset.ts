import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { getApiUrl } from "@/src/utils";

const sendPasswordUpdateRequest = async (email: string) => {
  try {
    const apiUrl = getApiUrl();
    const response = await axios.post(`${apiUrl}/users/password`, {
      user: { email },
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
