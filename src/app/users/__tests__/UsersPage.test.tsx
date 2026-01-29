import React from 'react'
import { render } from '@testing-library/react'

jest.mock('@/hooks/useUsers', () => ({ useGetUsers: jest.fn(), useGetAllUsers: jest.fn() }))
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }))
const { useGetUsers, useGetAllUsers } = require('@/hooks/useUsers')

// mock Navbar/Sidebar
jest.mock('@/components/navbar', () => () => <div />)
jest.mock('@/components/sidebar', () => () => <div />)

import UsersPage from '@/app/users/page'

describe('Users page', () => {
  afterEach(() => jest.clearAllMocks())

  it('renders pagination when usersData exists', () => {
    const mockUsers = []
    for (let i = 0; i < 9; i++) {
      mockUsers.push({ id: String(i + 1), profile: { fullName: 'U' + i }, email: i + '@a.com', phoneNumber: '0', dateJoined: new Date().toISOString(), status: 'active' })
    }

    useGetUsers.mockReturnValue({ data: { data: mockUsers, total: 20, page: 1, limit: 9 }, isLoading: false, error: null })
    useGetAllUsers.mockReturnValue({ data: [], isLoading: false, error: null })

    const { container } = render(<UsersPage />)
    expect(container.querySelector('.pagination-container')).toBeInTheDocument()
  })
})
