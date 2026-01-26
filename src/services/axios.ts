import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = 'https://td7401f3ad890583e4ea.free.beeceptor.com/users'

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any auth tokens or custom headers here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error('API Error:', error)
    return Promise.reject(error)
  }
)

export default axiosInstance
