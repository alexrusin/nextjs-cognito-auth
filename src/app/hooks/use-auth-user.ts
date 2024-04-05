import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

type AuthUser = {
  isAdmin: boolean;
  signInDetails?: Record<string, any>;
  username: string;
  userId: string;
};

export default function useAuthUser() {
  const [user, setUser] = useState<AuthUser>();

  useEffect(() => {
    async function getUser() {
      const session = await fetchAuthSession();
      if (!session.tokens) {
        return;
      }
      const user = {
        ...(await getCurrentUser()),
        isAdmin: false,
      };
      const groups = session.tokens.accessToken.payload["cognito:groups"];
      // @ts-ignore
      user.isAdmin = Boolean(groups && groups.includes("Admins"));
      setUser(user);
    }

    getUser();
  }, []);

  return user;
}
