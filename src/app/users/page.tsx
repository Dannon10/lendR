'use client'

import { useState } from 'react'
import UserStats from '@/components/UserStats'
import CardSkeleton from '@/components/CardSkeleton'
import UserTable from '@/components/Usertable'
import TableSkeleton from '@/components/TableSkeleton'
import Pagination from '@/components/Pagination'
import { useGetUsers } from '@/hooks/useUsers'
import './users.scss'

export default function UsersPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const { data: usersData, isLoading, error } = useGetUsers(currentPage)

    const totalPages = usersData ? Math.ceil(usersData.total / 9) : 0

    return (
        <>
            <h3 className="user-title">Users</h3>
            <div className='stats-container'>
            </div>
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
        </>
    )
}
