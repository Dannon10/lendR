'use client'

import { useGetAllUsers } from '@/hooks/useUsers'
import UserStatCard from './UserStatCard'
import './userStats.scss'
import CardSkeleton from './CardSkeleton'

export default function UserStats() {
  const { data: allUsers, isLoading, error } = useGetAllUsers()

  if (isLoading) {
    return <div className='stats-container'>
      {isLoading && Array.from({ length: 4 }, (_, i) => <CardSkeleton key={i} />)} 
    </div>
  }

  if (error) {
    return (
      <>
        <div className='stats-container-error'>Error loading stats Kindly Refresh the page</div>
        <div className="error-icon">⚠</div>
      </>
    )
  }

  // Calculate stats from actual data
  const totalUsers = allUsers?.length || 0
  const activeUsers = allUsers?.filter((u) => u.status?.toLowerCase() === 'active').length || 0
  const usersWithLoans = allUsers?.filter((u) => u.education?.loanRepayment && u.education.loanRepayment > 0).length || 0
  const usersWithSavings = allUsers?.filter((u) => u.accountBalance && u.accountBalance > 0).length || 0

  const stats = [
    {
      id: 'total-users',
      label: 'Users',
      value: totalUsers,
      icon: '/user-icon.svg',
    },
    {
      id: 'active-users',
      label: 'Active Users',
      value: activeUsers,
      icon: '/active-user-icon.svg',
    },
    {
      id: 'users-with-loans',
      label: 'Users With Loans',
      value: usersWithLoans,
      icon: '/user-loan-icon.svg',
    },
    {
      id: 'users-with-savings',
      label: 'Users With Savings',
      value: usersWithSavings,
      icon: '/user-savings-icon.svg',
    },
  ]

  return (
    <div className='stats-container'>
      {stats.map((stat) => (
        <UserStatCard key={stat.id} data={stat} />
      ))}
    </div>
  )
}
