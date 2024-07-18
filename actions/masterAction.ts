"use server"

import axios from "axios"
import { auth } from "@/auth"

const backendUrl = process.env.BACKEND_URL

export const getUserRoles = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/user-roles`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data.data
  } catch (error: any) {
    return error.response.data
  }
}

export const getUserStatuses = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/user-statuses`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data.data
  } catch (error: any) {
    return error.response.data
  }
}
