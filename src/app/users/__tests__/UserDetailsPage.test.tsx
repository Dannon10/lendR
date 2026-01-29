import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'

jest.mock('next/navigation', () => ({
  useParams: () => ({ id: '1' }),
}))

jest.mock('@/services/userService', () => ({
  userService: {
    getUserByIdFromCache: jest.fn(),
    getAllUsers: jest.fn(),
  },
}))

const { userService } = require('@/services/userService')

// Import after mocks
const UserDetailsPage = require('@/app/users/[id]/page').default

describe('UserDetailsPage', () => {
  afterEach(() => jest.clearAllMocks())

  it('renders user info when user is found in cache', async () => {
    const mockUser = {
      id: '1',
      fullName: 'Cached User',
      profile: { fullName: 'Cached User' },
      accountBalance: 5000,
      bankInfo: { accountNumber: '123', bankName: 'Test Bank' },
      education: {},
      socials: {},
      guarantors: [],
      status: 'Active',
    }

    userService.getUserByIdFromCache.mockReturnValue(mockUser)

    render(<UserDetailsPage />)

    // Look for the profile name heading
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /cached user/i })).toBeInTheDocument()
    })
  })

  it('shows "User Not Found" when API fails and no cache', async () => {
    userService.getUserByIdFromCache.mockReturnValue(undefined)
    userService.getAllUsers.mockImplementation(() => Promise.reject(new Error('Network')))

    render(<UserDetailsPage />)

    await waitFor(() => {
      expect(screen.getByText(/user not found/i)).toBeInTheDocument()
    })
  })
})
