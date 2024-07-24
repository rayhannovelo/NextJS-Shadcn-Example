"use server"

import { auth } from "@/auth"
import axios from "axios"
import { axiosErrorHandler } from "@/lib/errorHandler"

const backendUrl = process.env.BACKEND_URL

export const getPosts = async () => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/posts`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const createPost = async (formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.post(`${backendUrl}/posts`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const getPost = async (id: string | null) => {
  try {
    const session = await auth()
    const response = await axios.get(`${backendUrl}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const editPost = async (id: number, formData: FormData) => {
  try {
    const session = await auth()
    const response = await axios.put(`${backendUrl}/posts/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}

export const deletePost = async (id: string) => {
  try {
    const session = await auth()
    const response = await axios.delete(`${backendUrl}/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${session?.user.userToken}`,
      },
    })
    return response.data
  } catch (error) {
    return axiosErrorHandler(error)
  }
}
