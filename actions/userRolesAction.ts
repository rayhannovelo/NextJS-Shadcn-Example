"use server"

import { auth } from "@/auth"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"

const backendUrl = process.env.BACKEND_URL

export const getUserRoles = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/user-roles`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const createUserRole = async (formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.post(`${backendUrl}/user-roles`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const getUserRole = async (id: string | null) => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/user-roles/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const editUserRole = async (id: number, formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.put(
      `${backendUrl}/user-roles/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${session?.user.userToken}`,
        },
      }
    )
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const deleteUserRole = async (id: string) => {
  try {
    const session = await auth()
    const response = await axios.delete(`${backendUrl}/user-roles/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
