import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@db/prisma-client";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },

      // @ts-ignore
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: credentials.email,
          },
        });

        console.log(user)

        if (!user || !user.password || !user.activated) {
          return null;
        }

        const isPasswordValid = bcrypt.compareSync(
          credentials.password,
          user.password
        );
        console.log(isPasswordValid)

        if (!isPasswordValid) {
          return null;
        }
        return {
          id: user.id,
          email: user.email,
          name: user.username,
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }
        if (!user.email || !account) {
          return false;
        }

        const foundUser = await prisma.user.findFirst({
          where: {
            email: user.email,
          },
        });

        if (!foundUser) {
          await prisma.user.create({
            data: {
              email: user.email,
              username: user.name || `User #${user.id}`,
              activated: true,
              provider: account.provider,
              providerId: account.providerAccountId,
            },
          });
          return true;
        }

        await prisma.user.update({
          where: {
            email: foundUser.email,
          },

          data: {
            provider: account.provider,
            providerId: account.providerAccountId,
          },
        });
        return true;
      } catch (error) {
        console.error("SIGNIN error", error);
        return false;
      }
    },

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const foundUser = await prisma.user.findFirst({
        where: {
          email: token.email,
        },
      });

      if (foundUser) {
        token.role = foundUser.role;
        token.id = foundUser.id
      }
      return token;
    },

    async session({ session, token }: any) {
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.role = token.role;
      session.user.id = token.id;

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
