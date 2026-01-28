import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = 'http://localhost:4000'

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

// src/services/axios.ts
// import axios from 'axios'

// export const axiosInstance = axios.create({
//   baseURL: 'http://localhost:4000/users',
//   timeout: 10000,
// })

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const config = error.config
    
//     if (!config || config.__retryCount >= 2) {
//       return Promise.reject(error)
//     }

//     config.__retryCount = config.__retryCount || 0

//     if (error.response?.status === 429) {
//       config.__retryCount += 1
      
//       // Wait before retrying (exponential backoff)
//       const delay = Math.min(1000 * Math.pow(2, config.__retryCount), 10000)
//       console.log(`Rate limited. Retrying in ${delay}ms (attempt ${config.__retryCount}/2)`)
      
//       await new Promise(resolve => setTimeout(resolve, delay))
//       return axiosInstance.request(config)
//     }
    
//     return Promise.reject(error)
//   }
// )