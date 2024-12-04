import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";
import { JWT } from "next-auth/jwt";

interface User {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch("http://localhost:8080/api/v1/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        });

        const user: User = await res.json();

        if (res.ok && user) {
          return {
            ...user,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    async encode({ token }) {
      return (token as unknown as JWT).accessToken as string;
    },
    async decode({ token }) {
      return jwt.verify(token as string, process.env.NEXTAUTH_SECRET!) as JWT;
    },
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as User).accessToken;
        token.refreshToken = (user as User).refreshToken;
        token.id = (user as User).id;
        token.email = (user as User).email;
      }

      // Handle access token expiration and refresh
      const accessTokenExpires = (
        jwt.decode(token.accessToken as string) as { exp: number }
      ).exp;
      if (Date.now() >= accessTokenExpires * 1000) {
        const res = await fetch("http://localhost:8080/api/v1/auth/refresh", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken: token.refreshToken }),
        });

        const refreshedTokens = await res.json();
        if (res.ok && refreshedTokens) {
          token.accessToken = refreshedTokens.accessToken;
          token.refreshToken = refreshedTokens.refreshToken;
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      return session;
    },
  },
});
