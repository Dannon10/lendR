import React from 'react'
import { render, screen } from '@testing-library/react'
import UserStats from '@/components/UserStats'

jest.mock('@/hooks/useUsers', () => ({
  useGetAllUsers: jest.fn(),
}))

const { useGetAllUsers } = require('@/hooks/useUsers')

describe('UserStats', () => {
  afterEach(() => jest.clearAllMocks())

  it('renders CardSkeleton when isLoading is true', () => {
    useGetAllUsers.mockReturnValue({ data: null, isLoading: true, error: null })
    const { container } = render(<UserStats />)
    // Check for skeleton cards instead of text
    expect(container.querySelectorAll('.stat-card-skeleton').length).toBeGreaterThan(0)
  })

  it('renders calculated stats from API data', () => {
    const users = [
      {
        id: '1',
        fullName: 'Alice',
        status: 'Active',
        education: { loanRepayment: 100 },
        accountBalance: 1000,
      },
      {
        id: '2',
        fullName: 'Bob',
        status: 'Inactive',
        education: { loanRepayment: 0 },
        accountBalance: 0,
      },
    ]

    useGetAllUsers.mockReturnValue({ data: users, isLoading: false, error: null })

    const { container } = render(<UserStats />)

    // Check that stat cards are rendered
    const statCards = container.querySelectorAll('.stat-card')
    expect(statCards.length).toBe(4) // 4 stat cards

    // Check for stat values using getByText without ambiguity
    const values = container.querySelectorAll('.stat-value')
    expect(values[0]).toHaveTextContent('2') // Total users
    expect(values[1]).toHaveTextContent('1') // Active users
    expect(values[2]).toHaveTextContent('1') // Users with loans
    expect(values[3]).toHaveTextContent('1') // Users with savings

    // Check for labels (more specific)
    expect(screen.getByText(/^USERS$/i)).toBeInTheDocument()
    expect(screen.getByText(/ACTIVE USERS/i)).toBeInTheDocument()
  })

  it('renders error state when error occurs', () => {
    useGetAllUsers.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Network error'),
    })
    const { container } = render(<UserStats />)
    // Component renders error container
    expect(container.querySelector('.stats-container-error')).toBeInTheDocument()
    expect(screen.getByText(/error loading stats/i)).toBeInTheDocument()
  })

  it('renders 4 stat cards when data is empty', () => {
    useGetAllUsers.mockReturnValue({ data: [], isLoading: false, error: null })
    const { container } = render(<UserStats />)

    const statCards = container.querySelectorAll('.stat-card')
    expect(statCards.length).toBe(4)

    // All values should be 0
    const values = container.querySelectorAll('.stat-value')
    values.forEach((v) => {
      expect(v).toHaveTextContent('0')
    })
  })
})
