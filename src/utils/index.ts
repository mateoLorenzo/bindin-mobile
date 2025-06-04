import Constants from "expo-constants";
import { Platform } from "react-native";

export const getApiUrl = () => {
  const appStage = Constants.expoConfig?.extra?.appStage;
  const apiUrl = Constants.expoConfig?.extra?.apiUrl;

  // Para desarrollo local, puedes descomentar estas líneas si necesitas conectarte a un servidor local
  if (appStage === "development" && __DEV__) {
    if (Platform.OS === "android") {
      // return "http://10.0.2.2:3000"; // Para emulador Android
      // return "http://192.168.100.8:3000"; // Para dispositivo físico
    }
    // return "http://localhost:3000"; // Para iOS simulator
  }

  // Usar la URL configurada en las variables de entorno
  return apiUrl || "https://staging.bindin.gg/api"; // Fallback por seguridad
};
