'use client'

import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import './dashboard.scss'
import { useState } from 'react'
import CardSkeleton from '@/components/CardSkeleton'
import UserTable from '@/components/Usertable'
import TableSkeleton from '@/components/TableSkeleton'
import Pagination from '@/components/Pagination'
import { useGetUsers } from '@/hooks/useUsers'
import UserStats from '@/components/UserStats'

export default function DashboardPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const { data: usersData, isLoading, error } = useGetUsers(currentPage)

  const totalPages = usersData ? Math.ceil(usersData.total / 9) : 0

  return (
    <div className='dashboard-layout'>
      <Navbar />
      <div className='dashboard-content'>
        <Sidebar />
        <div className='dashboard-main'>
          <h3 className="dashboard-title">Dashboard</h3>

          <UserStats />

          <div>
            {isLoading && <TableSkeleton />}
            {error && <p>Error loading users: {error.message}</p>}
            {!isLoading && usersData && <UserTable users={usersData.data} />}
          </div>

          {usersData && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={usersData.total}
              itemsPerPage={9}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}
