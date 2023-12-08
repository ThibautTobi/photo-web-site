import "next-auth";

declare module "next-auth" {
  // interface User {
  //   role?: string;
  // }

  interface User {
    id: string;
    name: string;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  // interface JWT {
  //   role?: string;
  // }

  interface JWTToken {
      role?: string;
      sub?: string; // Subject (ID de l'utilisateur)
    }
  }