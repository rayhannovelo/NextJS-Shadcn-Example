import NextAuth, { type DefaultSession, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin } from "next-auth"
import axios from "axios"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    userRoleId: number
    userStatusId: number
    user_token: {
      token: string
    }
  }

  interface Session {
    user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userRoleId: number
    userStatusId: number
    user_token: {
      token: string
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const backendUrl = process.env.BACKEND_URL
          const response = await axios.post(`${backendUrl}/auth`, credentials)
          const user = response.data.data.user
          user.user_token = response.data.data.user_token

          return user
        } catch (error: any) {
          if (error.response.data.message) {
            throw new CredentialsSignin(error.response.data.message)
          } else {
            throw new Error("Something went wrong!")
          }
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user
      const isOnLogin = nextUrl.pathname == "/"

      if (isLoggedIn) {
        if (isOnLogin) {
          return Response.redirect(new URL("/dashboard", nextUrl))
        } else {
          return true
        }
      } else {
        if (isOnLogin) {
          return false
        } else {
          const loginUrl = new URL("/", nextUrl)
          loginUrl.searchParams.set("alert", "unauthorized")

          return Response.redirect(loginUrl)
        }
      }
    },
    jwt({ token, user }) {
      if (user) {
        token.userRoleId = user.userRoleId
        token.userStatusId = user.userStatusId
        token.user_token = user.user_token
      }

      return token
    },
    session({ session, token }) {
      if (token) {
        session.user.userRoleId = token.userRoleId
        session.user.userStatusId = token.userStatusId
        session.user.user_token = token.user_token
      }

      return session
    },
  },
})
