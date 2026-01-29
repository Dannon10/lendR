import React from 'react'
import { render } from '@testing-library/react'

// mock next/navigation globally for this test (used by several components)
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: jest.fn() }) }))

jest.mock('@/hooks/useUsers', () => ({
  useGetUsers: jest.fn(),
  useGetAllUsers: jest.fn(),
}))

// avoid rendering Navbar/Sidebar (they use next/navigation hooks)
jest.mock('@/components/navbar', () => () => <div data-testid="nav" />)
jest.mock('@/components/sidebar', () => () => <div data-testid="sidebar" />)

const { useGetUsers, useGetAllUsers } = require('@/hooks/useUsers')

import DashboardPage from '@/app/dashboard/page'

describe('Dashboard page', () => {
  afterEach(() => jest.clearAllMocks())

  it('renders users table when users data is available', () => {
    useGetUsers.mockReturnValue({ data: { data: [{ id: '1', profile: { fullName: 'A' }, email: 'a@x.com', phoneNumber: '123', dateJoined: new Date().toISOString(), status: 'active', organization: 'Org' }], total: 1, page: 1, limit: 9 }, isLoading: false, error: null })
    useGetAllUsers.mockReturnValue({ data: [{ id: '1', profile: { fullName: 'A' }, status: 'active', education: {}, accountBalance: 0 }], isLoading: false, error: null })

    const { container } = render(<DashboardPage />)
    // table should be rendered inside the dashboard
    expect(container.querySelector('table.users-table')).toBeInTheDocument()
  })
})
