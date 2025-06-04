import { useMutation } from "@tanstack/react-query";
import axios, { isAxiosError } from "axios";
import { getApiUrl } from "@/src/utils";

interface UserDataToRegister {
  user: {
    email: string;
    password: string;
    username: string;
    password_confirmation: string;
  };
}

const registerUser = async (userData: UserDataToRegister) => {
  try {
    const apiUrl = getApiUrl();
    const response = await axios.post(`${apiUrl}/users`, JSON.stringify(userData), {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.log("Error registering user:", error.response?.data);
    }
    console.log("Error registering user:", error);
    return false;
  }
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};

export type { UserDataToRegister };
