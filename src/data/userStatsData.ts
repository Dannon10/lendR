export interface StatCardData {
  id: string
  label: string
  value: number
  icon: string
}

export const userStatsData: StatCardData[] = [
  {
    id: 'total-users',
    label: 'Users',
    value: 2453,
    icon: '/user-icon.svg',
  },
  {
    id: 'active-users',
    label: 'Active Users',
    value: 1823,
    icon: '/active-user-icon.svg',
  },
  {
    id: 'users-with-loans',
    label: 'Users With Loans',
    value: 1234,
    icon: '/user-loan-icon.svg',
  },
  {
    id: 'users-with-savings',
    label: 'Users With Savings',
    value: 987,
    icon: '/user-savings-icon.svg',
  },
]
