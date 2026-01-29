import React from 'react'
import { render } from '@testing-library/react'

jest.mock('next/navigation', () => ({ usePathname: () => '/users/123' }))

import SidebarItem from '@/components/SidebarItem'

describe('SidebarItem', () => {
  it('is active when current path is under the item href', () => {
    const { container } = render(<SidebarItem icon="/icon.svg" label="Users" href="/users" />)
    expect(container.querySelector('.sidebar-item.active')).toBeInTheDocument()
  })
})
