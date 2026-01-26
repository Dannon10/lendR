'use client'

import { useGetUsers } from '@/hooks/useUsers'
import UserStatCard from './UserStatCard'
import './userStats.scss'

export default function UserStats() {
  const { data: usersData, isLoading, error } = useGetUsers()

  if (isLoading) {
    return <div className='stats-container-loading'>Loading stats...</div>
  }

  if (error) {
    return <div className='stats-container-error'>Error loading stats</div>
  }

  // Generate stats from the fetched data
  const stats = [
    {
      id: 'total-users',
      label: 'Users',
      value: usersData?.data?.length || 0,
      icon: '/users.svg',
    },
    {
      id: 'active-users',
      label: 'Active Users',
      value: usersData?.data?.filter((u) => u.status === 'active').length || 0,
      icon: '/active-users.svg',
    },
    {
      id: 'users-with-loans',
      label: 'Users With Loans',
      value: usersData?.data?.length || 0, // Replace with actual logic
      icon: '/loans.svg',
    },
    {
      id: 'users-with-savings',
      label: 'Users With Savings',
      value: usersData?.data?.length || 0, // Replace with actual logic
      icon: '/savings-product.svg',
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
