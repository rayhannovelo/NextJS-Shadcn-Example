import axios from "axios"

export function axiosErrorHandler(error: unknown) {
  const response = { success: false, message: "" }
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data
    } else if (error.request) {
      response.message = "No response received from server."
    } else {
      response.message =
        process.env.NODE_ENV == "production"
          ? `Axios error: ${error.message}`
          : "Erorr."
    }
  } else {
    response.message =
      process.env.NODE_ENV == "production"
        ? `An unexpected error occurred: ${(error as Error).message}`
        : "Error."
  }

  return response
}
