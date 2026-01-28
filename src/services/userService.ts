// // import { axiosInstance } from './axios'
// // import { User, UsersResponse } from '@/types/api'

// // class UserService {
// //     private readonly ITEMS_PER_PAGE = 9
// //     private allUsersCached: User[] | null = null
// //     private cacheTimestamp: number = 0
// //     private readonly CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

// //     /**
// //      * Fetch all users once and paginate on client side
// //      */
// //     async getAllUsers(): Promise<User[]> {
// //         const now = Date.now()

// //         // Return cached data if still valid
// //         if (this.allUsersCached && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
// //             return this.allUsersCached
// //         }

// //         try {
// //             // const response = await axiosInstance.get<User[]>('/users')

// //             const response = await this.retryRequest(() => axiosInstance.get<User[]>('/users'))
// //             const allUsers = Array.isArray(response.data) ? response.data : (response.data as any)?.data || []

// //             // Cache the data
// //             this.allUsersCached = allUsers
// //             this.cacheTimestamp = now

// //             return allUsers
// //         } catch (error) {
// //             throw this.handleError(error)
// //         }
// //     }

// //     /**
// //      * Fetch users with pagination
// //      */
// //     async getUsers(page: number = 1): Promise<UsersResponse> {
// //         try {
// //             const allUsers = await this.getAllUsers()

// //             // Calculate pagination
// //             const total = allUsers.length
// //             const totalPages = Math.ceil(total / this.ITEMS_PER_PAGE)
// //             const startIndex = (page - 1) * this.ITEMS_PER_PAGE
// //             const endIndex = startIndex + this.ITEMS_PER_PAGE
// //             const paginatedUsers = allUsers.slice(startIndex, endIndex)

// //             return {
// //                 data: paginatedUsers,
// //                 total,
// //                 page,
// //                 limit: this.ITEMS_PER_PAGE,
// //             }
// //         } catch (error) {
// //             throw this.handleError(error)
// //         }
// //     }

// //     /**
// //      * Fetch a single user by ID
// //      */
// //     async getUserById(id: string): Promise<User> {
// //         try {
// //             const response = await axiosInstance.get<User>(`/users/${id}`)
// //             return response.data
// //         } catch (error) {
// //             throw this.handleError(error)
// //         }
// //     }

// // //     async getUserById(id: string): Promise<User> {
// // //   // Ensure users are loaded (and cached)
// // //   const allUsers = await this.getAllUsers()

// // //   const user = allUsers.find(u => String(u.id) === String(id))

// // //   if (!user) {
// // //     throw new Error("User not found")
// // //   }

// // //   return user
// // // }


// //     /**
// //      * Handle API errors
// //      */
// //     private handleError(error: any): Error {
// //         if (error.response) {
// //             // Server responded with error
// //             const message = error.response.data?.message || `Error: ${error.response.status}`
// //             return new Error(message)
// //         } else if (error.request) {
// //             // Request made but no response
// //             return new Error('No response from server')
// //         } else {
// //             // Error in request setup
// //             return new Error(error.message || 'An error occurred')
// //         }
// //     }

// //     /**
// //      * Retry request with exponential backoff for rate limiting
// //      */
// //     private async retryRequest<T>(
// //         fn: () => Promise<T>,
// //         maxRetries: number = 3,
// //         initialDelay: number = 1000
// //     ): Promise<T> {
// //         let lastError: Error | null = null

// //         for (let attempt = 0; attempt < maxRetries; attempt++) {
// //             try {
// //                 return await fn()
// //             } catch (error: any) {
// //                 lastError = error
// //                 // Only retry on 429 (Too Many Requests) or 5xx errors
// //                 const status = error.response?.status
// //                 // if (status !== 429 && (status === undefined || status < 500)) {
// //                 //     throw error
// //                 // }

// //                 // Retry ONLY on 5xx (server errors), never on 429
// // if (status === 429 || (status !== undefined && status < 500)) {
// //   throw error
// // }


// //                 if (attempt < maxRetries - 1) {
// //                     // Exponential backoff: 1s, 2s, 4s
// //                     const delay = initialDelay * Math.pow(2, attempt)
// //                     await new Promise(resolve => setTimeout(resolve, delay))
// //                 }
// //             }
// //         }

// //         throw lastError || new Error('Request failed after retries')
// //     }
// // }

// // export const userService = new UserService()


// import { axiosInstance } from './axios'
// import { User, UsersResponse } from '@/types/api'

// class UserService {
//     private readonly ITEMS_PER_PAGE = 9
//     private readonly CACHE_KEY = 'users_cache'
//     private readonly CACHE_DURATION = 1000 * 60 * 30

//     private allUsersCached: User[] | null = null
//     private cacheTimestamp = 0
//     private usersRequestPromise: Promise<User[]> | null = null

//     async getAllUsers(): Promise<User[]> {
//         const now = Date.now()

//         // Memory cache
//         if (this.allUsersCached && now - this.cacheTimestamp < this.CACHE_DURATION) {
//             return this.allUsersCached
//         }

//         // localStorage cache
//         if (typeof window !== 'undefined') {
//             const cached = localStorage.getItem(this.CACHE_KEY)
//             if (cached) {
//                 const parsed = JSON.parse(cached)
//                 if (now - parsed.timestamp < this.CACHE_DURATION) {
//                     this.allUsersCached = parsed.data
//                     this.cacheTimestamp = parsed.timestamp
//                     return parsed.data
//                 }
//             }
//         }

//         // Prevent concurrent requests
//         if (this.usersRequestPromise) {
//             return this.usersRequestPromise
//         }

//         // Single API request
//         this.usersRequestPromise = axiosInstance
//             .get<User[]>('/users')
//             .then(res => {
//                 const users = Array.isArray(res.data)
//                     ? res.data
//                     : (res.data as any)?.data || []

//                 this.allUsersCached = users
//                 this.cacheTimestamp = now

//                 if (typeof window !== 'undefined') {
//                     localStorage.setItem(
//                         this.CACHE_KEY,
//                         JSON.stringify({ data: users, timestamp: now })
//                     )
//                 }

//                 return users
//             })
//             .finally(() => {
//                 this.usersRequestPromise = null
//             })

//         return this.usersRequestPromise
//     }

//     async getUsers(page = 1): Promise<UsersResponse> {
//         const allUsers = await this.getAllUsers()

//         const startIndex = (page - 1) * this.ITEMS_PER_PAGE
//         const endIndex = startIndex + this.ITEMS_PER_PAGE

//         return {
//             data: allUsers.slice(startIndex, endIndex),
//             total: allUsers.length,
//             page,
//             limit: this.ITEMS_PER_PAGE,
//         }
//     }

//     async getUserByIdFromCache(id: string): Promise<User> {
//         const allUsers = await this.getAllUsers()
//         const user = allUsers.find(u => String(u.id) === String(id))

//         if (!user) throw new Error('User not found')

//         return user
//     }
// }

// export const userService = new UserService()






// src/services/userService.ts
import { axiosInstance } from './axios'
import { User, UsersResponse } from '@/types/api'

class UserService {
    private readonly ITEMS_PER_PAGE = 9
    private readonly CACHE_KEY = 'users_cache'
    private readonly CACHE_DURATION = 1000 * 60 * 30

    private allUsersCached: User[] | null = null
    private cacheTimestamp = 0
    private usersRequestPromise: Promise<User[]> | null = null
    private lastRequestTime = 0
    private readonly MIN_REQUEST_INTERVAL = 2000 // 2 seconds minimum between requests

    async getAllUsers(): Promise<User[]> {
        const now = Date.now()

        // Memory cache
        if (this.allUsersCached && now - this.cacheTimestamp < this.CACHE_DURATION) {
            console.log('✅ Returning from memory cache')
            return this.allUsersCached
        }

        // localStorage cache
        if (typeof window !== 'undefined') {
            const cached = localStorage.getItem(this.CACHE_KEY)
            if (cached) {
                try {
                    const parsed = JSON.parse(cached)
                    if (now - parsed.timestamp < this.CACHE_DURATION) {
                        console.log('✅ Returning from localStorage cache')
                        this.allUsersCached = parsed.data
                        this.cacheTimestamp = parsed.timestamp
                        return parsed.data
                    }
                } catch (e) {
                    console.error('Failed to parse cache', e)
                    localStorage.removeItem(this.CACHE_KEY)
                }
            }
        }

        // Prevent concurrent requests - return existing promise
        if (this.usersRequestPromise) {
            console.log('⏳ Request already in progress, waiting...')
            return this.usersRequestPromise
        }

        // Rate limiting - prevent requests too close together
        const timeSinceLastRequest = now - this.lastRequestTime
        if (timeSinceLastRequest < this.MIN_REQUEST_INTERVAL) {
            const waitTime = this.MIN_REQUEST_INTERVAL - timeSinceLastRequest
            console.log(`⏱️ Rate limiting: waiting ${waitTime}ms`)
            await new Promise(resolve => setTimeout(resolve, waitTime))
        }

        console.log('🔥 Making API request to /users')
        this.lastRequestTime = Date.now()

        // Single API request with error handling
        this.usersRequestPromise = axiosInstance
            .get<User[]>('/users')
            .then(res => {
                const users = Array.isArray(res.data)
                    ? res.data
                    : (res.data as any)?.data || []

                console.log(`✅ Received ${users.length} users`)

                this.allUsersCached = users
                this.cacheTimestamp = Date.now()

                if (typeof window !== 'undefined') {
                    try {
                        localStorage.setItem(
                            this.CACHE_KEY,
                            JSON.stringify({ 
                                data: users, 
                                timestamp: this.cacheTimestamp 
                            })
                        )
                    } catch (e) {
                        console.error('Failed to save to localStorage', e)
                    }
                }

                return users
            })
            .catch(error => {
                console.error('❌ API request failed:', error.message)
                
                // If we have cached data, return it even if expired
                if (this.allUsersCached) {
                    console.log('⚠️ Using stale cache due to error')
                    return this.allUsersCached
                }
                
                throw error
            })
            .finally(() => {
                this.usersRequestPromise = null
            })

        return this.usersRequestPromise
    }

    getUsers(page = 1): UsersResponse {
        // This should now be synchronous since we have cached data
        if (!this.allUsersCached) {
            return {
                data: [],
                total: 0,
                page,
                limit: this.ITEMS_PER_PAGE,
            }
        }

        const startIndex = (page - 1) * this.ITEMS_PER_PAGE
        const endIndex = startIndex + this.ITEMS_PER_PAGE

        return {
            data: this.allUsersCached.slice(startIndex, endIndex),
            total: this.allUsersCached.length,
            page,
            limit: this.ITEMS_PER_PAGE,
        }
    }

    getUserByIdFromCache(id: string): User | undefined {
        if (!this.allUsersCached) return undefined
        return this.allUsersCached.find(u => String(u.id) === String(id))
    }

    // Method to clear cache if needed
    clearCache(): void {
        this.allUsersCached = null
        this.cacheTimestamp = 0
        if (typeof window !== 'undefined') {
            localStorage.removeItem(this.CACHE_KEY)
        }
    }
}

export const userService = new UserService()