import { axiosInstance } from './axios'
import { User, UsersResponse } from '@/types/api'

class UserService {
    private readonly ITEMS_PER_PAGE = 9
    private allUsersCached: User[] | null = null
    private cacheTimestamp: number = 0
    private readonly CACHE_DURATION = 1000 * 60 * 30 // 30 minutes

    /**
     * Fetch all users once and paginate on client side
     */
    async getAllUsers(): Promise<User[]> {
        const now = Date.now()
        
        // Return cached data if still valid
        if (this.allUsersCached && (now - this.cacheTimestamp) < this.CACHE_DURATION) {
            return this.allUsersCached
        }

        try {
            const response = await axiosInstance.get<User[]>('/users')
            const allUsers = Array.isArray(response.data) ? response.data : (response.data as any)?.data || []
            
            // Cache the data
            this.allUsersCached = allUsers
            this.cacheTimestamp = now
            
            return allUsers
        } catch (error) {
            throw this.handleError(error)
        }
    }

    /**
     * Fetch users with pagination
     */
    async getUsers(page: number = 1): Promise<UsersResponse> {
        try {
            const allUsers = await this.getAllUsers()
            
            // Calculate pagination
            const total = allUsers.length
            const totalPages = Math.ceil(total / this.ITEMS_PER_PAGE)
            const startIndex = (page - 1) * this.ITEMS_PER_PAGE
            const endIndex = startIndex + this.ITEMS_PER_PAGE
            const paginatedUsers = allUsers.slice(startIndex, endIndex)

            return {
                data: paginatedUsers,
                total,
                page,
                limit: this.ITEMS_PER_PAGE,
            }
        } catch (error) {
            throw this.handleError(error)
        }
    }

    /**
     * Fetch a single user by ID
     */
    async getUserById(id: string): Promise<User> {
        try {
            const response = await axiosInstance.get<User>(`/users/${id}`)
            return response.data
        } catch (error) {
            throw this.handleError(error)
        }
    }

    /**
     * Handle API errors
     */
    private handleError(error: any): Error {
        if (error.response) {
            // Server responded with error
            const message = error.response.data?.message || `Error: ${error.response.status}`
            return new Error(message)
        } else if (error.request) {
            // Request made but no response
            return new Error('No response from server')
        } else {
            // Error in request setup
            return new Error(error.message || 'An error occurred')
        }
    }
}

export const userService = new UserService()
