import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = 'https://mock-api-59rp.onrender.com/'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance

