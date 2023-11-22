import "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
  }

  interface Session {
    user: {
      role?: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    role?: string;
  }

 interface User {
      id: string;
      email: string;
      name: string;
      role: string;
    }
  }