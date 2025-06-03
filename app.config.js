import "dotenv/config";

export default ({ config }) => ({
  ...config,
  extra: {
    apiUrl: process.env.API_URL,
    googleAndroidClientId: process.env.GOOGLE_ANDROID_CLIENT_ID,
    googleIosClientId: process.env.GOOGLE_IOS_CLIENT_ID,
  },
});
