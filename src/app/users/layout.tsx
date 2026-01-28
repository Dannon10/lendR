'use client'

import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import './users.scss'

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="user-layout">
      <Navbar />
      <div className="user-content">
        <Sidebar />
        <div className="user-main">
          {children}
        </div>
      </div>
    </div>
  )
}
