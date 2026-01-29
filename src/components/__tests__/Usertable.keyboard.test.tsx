import React from 'react'
import { render } from '@testing-library/react'
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

describe('UsersTable keyboard navigation', () => {
  afterEach(() => jest.clearAllMocks())

  it('navigates to details when Enter key pressed on a row', async () => {
    const { container } = render(<UsersTable users={sampleUsers as any} />)
    const row = container.querySelector('table.users-table tbody tr') as HTMLElement
    row.focus()
    await userEvent.keyboard('{Enter}')
    expect(push).toHaveBeenCalledWith('/users/u1')
  })
})
