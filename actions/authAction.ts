"use server"

import { signIn, signOut, auth } from "@/auth"
import { AuthError } from "next-auth"
import { z } from "zod"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"

const backendUrl = process.env.BACKEND_URL

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

export const handleSignOut = async () => {
  await signOut({
    redirectTo: "/?alert=logout",
    redirect: true,
  })
}

export const getProfile = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/auth/user`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const updateProfile = async (formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.put(`${backendUrl}/auth/user`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error: any) {
    return axiosErrorHandler(error)
  }
}

export const changePassword = async (formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.put(
      `${backendUrl}/auth/change-password`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.userToken}`,
        },
      }
    )
    return response.data
  } catch (error: any) {
    return axiosErrorHandler(error)
  }
}
