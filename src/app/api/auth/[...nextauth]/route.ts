import NextAuth, {
  NextAuthOptions,
  TokenSet,
  Session,
  User,
  Account,
} from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import LinkedInProvider from "next-auth/providers/linkedin";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";

interface Credentials {
  username: string;
  password: string;
}

interface Token extends JWT {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
  error?: string;
}

interface UserWithTokens extends User {
  accessToken: string;
  refreshToken: string;
  accessTokenExpires: number;
}

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    // LinkedInProvider({
    //   clientId: process.env.LINKEDIN_CLIENT_ID!,
    //   clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials?: Credentials
      ): Promise<UserWithTokens | null> {
        if (!credentials) return null;

        try {
          const response = await axios.post(
            "https://localhost:8000/auth/login",
            {
              username: credentials.username,
              password: credentials.password,
            }
          );

          const result = response.data;

          if (result && response.status === 200) {
            return {
              ...result.user,
              accessToken: result.access_token,
              refreshToken: result.refresh_token,
              accessTokenExpires: Date.now() + 7 * 1000,
            };
          }
        } catch (error) {
          console.error("Error in credentials authorization:", error);
          return null;
        }

        return null;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account && user) {
        return {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: Date.now() + user.accessTokenExpires,
        };
      }

      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      return refreshAccessToken(token);
    },

    async session({ session, token }: any) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  debug: process.env.NODE_ENV === "development",
};

async function refreshAccessToken(token: Token): Promise<Token> {
  try {
    const response = await axios.post(
      `${process.env.BACKEND_URL}/auth/refresh`,
      {
        refreshToken: token.refreshToken,
      }
    );

    const refreshedTokens = response.data;

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      accessTokenExpires: Date.now() + refreshedTokens.expiresIn * 1000,
      refreshToken: refreshedTokens.refreshToken ?? token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing access token:", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
