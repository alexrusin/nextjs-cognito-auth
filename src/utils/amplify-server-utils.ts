import { authConfig } from "@/app/amplify-cognito-config";
import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import {
  fetchAuthSession,
  fetchUserAttributes,
  getCurrentUser,
} from "aws-amplify/auth/server";
import type { NextRequest, NextResponse } from "next/server";

export const { runWithAmplifyServerContext } = createServerRunner({
  config: {
    Auth: authConfig,
  },
});

export async function isAuthenticated(
  request: NextRequest,
  response: NextResponse
) {
  return await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const session = await fetchAuthSession(contextSpec);
        return session.tokens !== undefined;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
}

export async function isAuthenticatedAdmin(
  request: NextRequest,
  response: NextResponse
) {
  return await runWithAmplifyServerContext({
    nextServerContext: { request, response },
    operation: async (contextSpec) => {
      try {
        const userAttributes = await fetchUserAttributes(contextSpec);
        return userAttributes["custom:type"] === "ADMIN";
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  });
}
