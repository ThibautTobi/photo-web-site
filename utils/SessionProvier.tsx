"use client";

import { SessionProvider } from "next-auth/react";

/***** création du provider de NextAuth alternative probleme en import direct avec le app router */
const AuthProvider = ({ children }: any) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;