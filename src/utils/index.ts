import Constants from "expo-constants";
import { Platform } from "react-native";

export const getApiUrl = () => {
  if (Constants.expoConfig?.extra?.appStage === "development") {
    if (Platform.OS === "android") {
      return "http://10.0.2.2:3000";
    }
    return "http://192.168.100.8:3000";
  }
  return Constants.expoConfig?.extra?.apiUrl;
};
