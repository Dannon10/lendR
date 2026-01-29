import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'

import FilterDropdown from '@/components/FilterDropdown'

describe('FilterDropdown', () => {
  it('opens/closes and calls filter/reset callbacks', () => {
    const onFilter = jest.fn()
    const onReset = jest.fn()

    render(<FilterDropdown onFilter={onFilter} onReset={onReset} />)

    const trigger = screen.getByRole('button')
    // open
    fireEvent.click(trigger)
    expect(screen.getByLabelText(/organization/i)).toBeInTheDocument()

    // fill username and click Filter
    const username = screen.getByPlaceholderText(/user/i)
    fireEvent.change(username, { target: { value: 'Alice' } })
    // multiple buttons match 'filter' (trigger + form button) - pick the form button
    const filterBtns = screen.getAllByRole('button', { name: /filter/i })
    const filterBtn = filterBtns.find(b => b.classList.contains('btn-filter')) || filterBtns[0]
    fireEvent.click(filterBtn)
    expect(onFilter).toHaveBeenCalled()

    // reopen and click Reset
    fireEvent.click(trigger)
    const resetBtn = screen.getByRole('button', { name: /reset/i })
    fireEvent.click(resetBtn)
    expect(onReset).toHaveBeenCalled()
  })
})
