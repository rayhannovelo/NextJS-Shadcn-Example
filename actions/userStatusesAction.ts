"use server"

import { auth } from "@/auth"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"

const backendUrl = process.env.BACKEND_URL

export const getUserStatuses = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/user-statuses`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const createUserStatus = async (formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.post(`${backendUrl}/user-statuses`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const getUserStatus = async (id: string | null) => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/user-statuses/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const editUserStatus = async (id: number, formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.put(
      `${backendUrl}/user-statuses/${id}`,
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

export const deleteUserStatus = async (id: string) => {
  try {
    const session = await auth()
    const response = await axios.delete(`${backendUrl}/user-statuses/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
