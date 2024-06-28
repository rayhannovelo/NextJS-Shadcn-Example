"use server"

import { signIn } from "@/auth"
import { AuthError } from "next-auth"
import { z } from "zod"

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const handleSignIn = async (credentials: z.infer<typeof formSchema>) => {
  try {
    await signIn("credentials", { ...credentials, redirectTo: "/dashboard" })
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err instanceof Error) {
        return { error: error.cause.err.message }
      }

      switch (error.type) {
        case "CredentialsSignin":
          return {
            error: "Invalid credentials!",
          }
        default:
          return {
            error: "Something went wrong!",
          }
      }
    }

    throw error
  }
}
