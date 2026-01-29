import React from 'react'
import { render } from '@testing-library/react'
import UserDetailsSkeleton from '@/components/UserDetailsSkeleton'

describe('UserDetailsSkeleton', () => {
  it('renders skeleton structure', () => {
    const { container } = render(<UserDetailsSkeleton />)
    // check for a few key skeleton elements
    expect(container.querySelector('.skeleton-avatar')).not.toBeNull()
    expect(container.querySelector('.skeleton-profile-card')).not.toBeNull()
    expect(container.querySelectorAll('.skeleton-tab').length).toBeGreaterThan(0)
  })
})
