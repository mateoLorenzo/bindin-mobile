import "dotenv/config";

export default ({ config }) => ({
  ...config,
  name: "Bindin",
  slug: "bindin-app",
  scheme: "bindinapp",
  extra: {
    apiUrl: process.env.API_URL,
    googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
    googleRedirectUri: process.env.GOOGLE_REDIRECT_URI,
    appStage: process.env.APP_STAGE,
  },
});
