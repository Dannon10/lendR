import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

const push = jest.fn()
jest.mock('next/navigation', () => ({ useRouter: () => ({ push }) }))

import Home from '@/app/page'

describe('Login page', () => {
  afterEach(() => jest.clearAllMocks())

  it('renders login form and navigates to dashboard on submit', () => {
    render(<Home />)
    const btn = screen.getByRole('button', { name: /log in/i })
    fireEvent.click(btn)
    expect(push).toHaveBeenCalledWith('/dashboard')
  })
})
