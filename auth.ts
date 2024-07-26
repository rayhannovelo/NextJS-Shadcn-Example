import NextAuth, { type DefaultSession, User } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin } from "next-auth"
import axios from "axios"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    userRoleId: number
    userStatusId: number
    username: string
    photo: string
    userToken: string
    emailVerifiedAt: Date
    createdAt: Date
    updatedAt: Date
    user_role: {
      userRoleName: string
    }
    user_status: {
      userStatusName: string
    }
  }

  interface Session {
    user: User & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User
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
          user.userToken = response.data.data.user_token.token

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
    jwt({ token, user, trigger, session }) {
      // login data
      if (user) {
        return { ...token, user }
      }

      // update profile
      if (trigger === "update") {
        return { ...token, user: { ...token.user, ...session.user } }
      }

      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session?.user,
          ...token.user,
        },
      }
    },
  },
})
