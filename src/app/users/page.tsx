'use client'

import { useState } from 'react'
import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import './users.scss'
import { userStatsData } from '@/data/userStatsData'
import UserStatCard from '@/components/UserStatCard'
import CardSkeleton from '@/components/CardSkeleton'
import UserTable from '@/components/Usertable'
import TableSkeleton from '@/components/TableSkeleton'
import Pagination from '@/components/Pagination'
import { useGetUsers } from '@/hooks/useUsers'

export default function UsersPage() {
    const [currentPage, setCurrentPage] = useState(1)
    const { data: usersData, isLoading, error } = useGetUsers(currentPage)

    const totalPages = usersData ? Math.ceil(usersData.total / 9) : 0

    return (
        <div className='user-layout'>
            <Navbar />
            <div className='user-content'>
                <Sidebar />
                <div className='user-main'>
                    <h3 className='user-title'>Users</h3>
                    <div className='stats-container'>
                        {isLoading ? (
                            Array.from({ length: 4 }).map((_, index) => (
                                <CardSkeleton key={index} />
                            ))
                        ) : (
                            userStatsData.map((stat) => (
                                <UserStatCard key={stat.id} data={stat} />
                            ))
                        )}
                    </div>
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
