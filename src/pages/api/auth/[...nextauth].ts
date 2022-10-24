import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { v4 } from 'uuid';
import * as twoFactor from 'node-2fa';

export const authOptions: NextAuthOptions = {
  theme: {
    colorScheme: "auto", // "auto" | "dark" | "light"
    brandColor: "", 
    logo: "/favicon.ico", // Absolute URL to image
    buttonText: "" 
  },
  // Include user.id on session
  callbacks: {
    jwt({ user, token }) {
      if (user) {
        token.id = user.id
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session({ session, user }) {
      const d = new Date();
      let future: any = d.setTime(d.getTime() + (3600000 * 2));
      future = new Date(future).toISOString();
      if (user) {
        if(session.user) {
          session.user.id = user.id;
          session.user.name = user.name;
          session.user.email = user.email;
          session.expires = future;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: { 
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 2 // 2 hours
  },
  providers: [
    CredentialsProvider({
      id: 'dev-login',
      name: 'Dev Account',
      credentials: {
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if(twoFactor.verifyToken(process.env.DEV_SECRET as string, credentials?.password)) {
          return {
            id: v4(),
            name: 'concept',
            email: 'hello@conceptcodes.dev'
          }
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
