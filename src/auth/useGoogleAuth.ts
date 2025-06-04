import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import Constants from "expo-constants";
import { getApiUrl } from "../utils";
import axios, { AxiosError } from "axios";

WebBrowser.maybeCompleteAuthSession();

export default function useGoogleAuth() {
  const googleAndroidClientId = Constants.expoConfig?.extra?.googleAndroidClientId;
  const googleIosClientId = Constants.expoConfig?.extra?.googleIosClientId;
  const redirectUri = Constants.expoConfig?.extra?.googleRedirectUri;

  console.log("🔧 Google OAuth Config:", {
    androidClientId: googleAndroidClientId,
    iosClientId: googleIosClientId,
    redirectUri: redirectUri,
  });

  const [request, response, promptAsync] = Google.useAuthRequest({
    // TODO: Check android config modifying the SHA1
    // androidClientId: googleAndroidClientId,
    androidClientId: "171967361588-qh7dhj6gc0f2u56udmfktg6cisf2s232.apps.googleusercontent.com",
    iosClientId: googleIosClientId,
    redirectUri: redirectUri,
    scopes: ["openid", "profile", "email"],
  });

  // TODO: Clean logs
  useEffect(() => {
    console.log("response", response);
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("🎉 Google OAuth Success!");
      console.log("Access Token:", authentication?.accessToken);
      handleGoogleAuthSuccess(authentication?.accessToken);
    } else if (response?.type === "error") {
      console.error("❌ Google OAuth Error:", response.error);
      console.error("Error details:", response.error?.message);
    } else if (response?.type === "cancel") {
      console.log("🚫 Google OAuth Cancelled");
    }
  }, [response]);

  const handleGoogleAuthSuccess = async (accessToken?: string) => {
    try {
      const apiUrl = getApiUrl();

      console.log("📤 Sending request to backend:");
      console.log("URL:", `${apiUrl}/users/social_auth`);
      console.log("Headers:", {
        "x-Provider": "google",
        "x-Access-Token": accessToken,
      });

      const response = await axios.post(
        `${apiUrl}/users/social_auth`,
        {},
        {
          headers: {
            "x-Provider": "google",
            "x-Access-Token": accessToken,
          },
        }
      );
      console.log("✅ Google OAuth Response from backend:", response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        console.error("❌ Error response from backend:", error.response?.data);
        console.error("❌ Error status:", error.response?.status);
      }
      console.error("❌ Error handling Google auth:", error);
    }
  };

  return {
    request,
    promptAsync,
    response,
    isLoading: !request, // true mientras se prepara la request
  };
}
