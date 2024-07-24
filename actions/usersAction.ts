"use server"

import { auth } from "@/auth"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"

const backendUrl = process.env.BACKEND_URL

export const getUsers = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/users`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const createUser = async (formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.post(`${backendUrl}/users`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const getUser = async (id: string | null) => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const editUser = async (id: number, formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.put(`${backendUrl}/users/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const deleteUser = async (id: string) => {
  try {
    const session = await auth()
    const response = await axios.delete(`${backendUrl}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
