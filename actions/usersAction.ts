"use server"

import { auth } from "@/auth"
import axios from "axios"

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
  } catch (error: any) {
    return error.response.data
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
  } catch (error: any) {
    return error.response.data
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
  } catch (error: any) {
    return error.response.data
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
  } catch (error: any) {
    return error.response.data
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
  } catch (error: any) {
    return error.response.data
  }
}
