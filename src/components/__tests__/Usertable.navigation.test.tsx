import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const push = jest.fn()
jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

import UsersTable from '@/components/Usertable'

const sampleUsers = [
  {
    id: 'u1',
    organization: 'Org',
    profile: { fullName: 'User One' },
    email: 'one@example.com',
    phoneNumber: '1234567890',
    dateJoined: new Date().toISOString(),
    status: 'active'
  }
]

describe('UsersTable navigation', () => {
  afterEach(() => jest.clearAllMocks())

  it('navigates to details page when a row is clicked', async () => {
    render(<UsersTable users={sampleUsers as any} />)
    const row = document.querySelector('table.users-table tbody tr') as HTMLElement
    expect(row).toBeTruthy()
    await userEvent.click(row)
    expect(push).toHaveBeenCalledWith('/users/u1')
  })
})
