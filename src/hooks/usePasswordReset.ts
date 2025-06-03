import { useMutation } from "@tanstack/react-query";

const APP_STAGE_URL = "http://localhost:3000";

const sendPasswordUpdateRequest = async (email: string) => {
  try {
    const response = await fetch(`${APP_STAGE_URL}/users/password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email } }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("error from sendPasswordUpdateRequest", error);
    throw error;
  }
};

export const usePasswordReset = () => {
  return useMutation({
    mutationFn: sendPasswordUpdateRequest,
  });
};
