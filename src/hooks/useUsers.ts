import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { userService } from '@/services/userService'
import { UsersResponse, User } from '@/types/api'

/**
 * Hook to fetch users with pagination - ultra fast with intelligent caching
 */
export const useGetAllUsers = () => {
  return useQuery<User[]>({
    queryKey: ['users', 'all'],
    queryFn: () => userService.getAllUsers(),
    staleTime: 1000 * 60 * 30,
    gcTime: 1000 * 60 * 60,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
}

/**
 * Get paginated slice of cached users - NO additional API calls
 */
export const useGetUsers = (page: number = 1) => {
  const query = useGetAllUsers()
  
  const ITEMS_PER_PAGE = 9
  const startIndex = (page - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE

  return {
    ...query,
    data: query.data ? {
      data: query.data.slice(startIndex, endIndex),
      total: query.data.length,
      page,
      limit: ITEMS_PER_PAGE,
    } : undefined,
  }
}

// export const useGetUsers = (
//   page: number = 1,
//   queryOptions?: any
// ): UseQueryResult<UsersResponse> => {
//   return useQuery<UsersResponse>({
//     queryKey: ['users', page], // Include page in key so each page is calculated correctly
//     queryFn: () => userService.getUsers(page),
//     staleTime: Infinity, // Never refetch - service handles caching
//     gcTime: 1000 * 60 * 60, // 60 minutes
//     retry: 1,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchInterval: false,
//     ...queryOptions,
//   })
// }

/**
 * Hook to fetch a single user by ID
 */
// export const useGetUser = (
//   userId: string | null,
//   queryOptions?: any
// ): UseQueryResult<User> => {
//   return useQuery<User>({
//     queryKey: ['user', userId],
//     queryFn: () => userService.getUserById(userId!),
//     enabled: !!userId,
//     staleTime: Infinity,
//     gcTime: 1000 * 60 * 60,
//     retry: 1,
//     refetchOnWindowFocus: false,
//     refetchOnMount: false,
//     refetchInterval: false,
//     ...queryOptions,
//   })
// }