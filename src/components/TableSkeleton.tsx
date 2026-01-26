'use client'

import './tableSkeleton.scss'

export default function TableSkeleton() {
  return (
    <div className='table-wrapper'>
      <table className='users-table'>
        <thead>
          <tr>
            <th>Organization</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Date Joined</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 9 }).map((_, index) => (
            <tr key={index}>
              <td>
                <div className='skeleton skeleton-text'></div>
              </td>
              <td>
                <div className='skeleton skeleton-text'></div>
              </td>
              <td>
                <div className='skeleton skeleton-text'></div>
              </td>
              <td>
                <div className='skeleton skeleton-text'></div>
              </td>
              <td>
                <div className='skeleton skeleton-text'></div>
              </td>
              <td>
                <div className='skeleton skeleton-badge'></div>
              </td>
              <td>
                <div className='skeleton skeleton-text skeleton-sm'></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
