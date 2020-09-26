import { StrategyOptions as GoogleStrategyOptions } from "passport-google-oauth20";

export const SERVER_HOST_URL: string = process.env.SERVER_HOST_URL || "";

export const ACCESS_TOKEN_SECRET: string = process.env.JWT_ACCESS_TOKEN_SECRET!;
export const ACCESS_TOKEN_LIFE: number = 120;
export const REFRESH_TOKEN_SECRET: string = process.env
  .JWT_REFRESH_TOKEN_SECRET!;
export const REFRESH_TOKEN_LIFE: number = 86400;

export const GOOGLE_STRATEGY_OPTIONS: GoogleStrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  callbackURL: `${SERVER_HOST_URL}/auth/google/callback`,
};

export const CLIENT_HOME_URL: string = SERVER_HOST_URL;
