import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          
          // This is where you would normally look up the user from your database
          // For now, we'll use a mock user for demonstration
          if (email === "user@example.com" && password === "password123") {
            return {
              id: "1",
              name: "Demo User",
              email: "user@example.com",
            };
          }
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnGenerating = nextUrl.pathname.startsWith("/generating");
      const isOnPreview = nextUrl.pathname.startsWith("/preview");
      
      if (isOnGenerating || isOnPreview) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
  },
});
