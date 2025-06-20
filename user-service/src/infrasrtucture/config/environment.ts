import dotenv from "dotenv";
dotenv.config();

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export default {
  PORT: requireEnv("SERVER_PORT"),
  NODE_ENV: requireEnv("NODE_ENV"),
  MONGO_URI: requireEnv("MONGO_URI"),
  SERVER_PORT: requireEnv("SERVER_PORT"),
  EMAIL: requireEnv("EMAIL"),
  APP_PASSWORD: requireEnv("APP_PASSWORD"),
  JWT_SECRET_KEY: requireEnv("JWT_SECRET_KEY"),
  FRONTEND_URL: requireEnv("FRONTEND_URL"),
  GOOGLE_CLIENT_ID: requireEnv("GOOGLE_CLIENT_ID"),
  GITHUB_CLIENT_ID: requireEnv("GITHUB_CLIENT_ID"),
  GITHUB_CLIENT_SECRET: requireEnv("GITHUB_CLIENT_SECRET"),
  CLOUD_NAME: requireEnv("CLOUD_NAME"),
  API_KEY: requireEnv("API_KEY"),
  API_SECRET: requireEnv("API_SECRET"),
};
