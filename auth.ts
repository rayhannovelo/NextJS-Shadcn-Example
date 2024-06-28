import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { CredentialsSignin } from "next-auth"
import axios from "axios"

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
          return response.data.data
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
})
