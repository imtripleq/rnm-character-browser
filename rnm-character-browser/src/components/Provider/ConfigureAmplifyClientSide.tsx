"use client";

// https://docs.amplify.aws/gen1/nextjs/build-a-backend/troubleshooting/library-not-configured/
import { Amplify } from "aws-amplify";

Amplify.configure(
  {
    Auth: {
      Cognito: {
        userPoolId: process.env.NEXT_PUBLIC_USER_POOL_ID || "",
        userPoolClientId: process.env.NEXT_PUBLIC_APP_CLIENT_ID || "",
        identityPoolId: process.env.NEXT_PUBLIC_IDENTITY_POOL_ID || "",
        loginWith: {
          email: true,
        },
        signUpVerificationMethod: "code",
        userAttributes: {
          email: {
            required: true,
          },
        },
        allowGuestAccess: true,
        passwordFormat: {
          minLength: 8,
          requireLowercase: true,
          requireUppercase: true,
          requireNumbers: true,
          requireSpecialCharacters: false,
        },
      },
    },
  },
  { ssr: true }
);

export default function ConfigureAmplifyClientSide() {
  return null;
}
