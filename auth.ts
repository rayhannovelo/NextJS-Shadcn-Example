import NextAuth, { type DefaultSession } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin } from "next-auth"
import axios from "axios"
import { DateTime } from "next-auth/providers/kakao"

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      id: number
      userRoleId: number
      userStatusId: number
      username: string
      name: string
      photo: string
      email: string
      emailVerifiedAt: string
      createdAt: DateTime
      updatedAt: DateTime
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
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
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
  callbacks: {
    jwt({ token, user, trigger, session }) {
      if (user) {
        // User is available during sign-in
        // token.user = user
      }
      return token
    },
    session({ session, token }) {
      // console.log("session")
      // session.user = token.user
      // console.log("session-token", token)
      return session
    },
  },
})