'use client'

import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client with optimized settings for faster performance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 1000 * 60 * 30, // 30 minutes - keep data fresh longer
      gcTime: 1000 * 60 * 60, // 60 minutes - keep data in cache longer
      retry: 1, // Reduced retry attempts
      retryDelay: (attemptIndex) => Math.min(1000 * (2 ** attemptIndex), 30000),
    },
  },
})

interface QueryProviderProps {
  children: ReactNode
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
