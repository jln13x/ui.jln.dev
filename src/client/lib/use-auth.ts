import { signIn, signOut } from "next-auth/react";

export const useAuth = () => {
  return {
    signIn,
    signOut,
  };
};
