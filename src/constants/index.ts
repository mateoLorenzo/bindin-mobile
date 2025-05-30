import { SocialProvider } from "../types";

export const SOCIAL_PROVIDERS: {
  label: string;
  provider: SocialProvider;
}[] = [
  {
    label: "Google",
    provider: "google",
  },
  {
    label: "Twitch",
    provider: "twitch",
  },
  {
    label: "Discord",
    provider: "discord",
  },
];
