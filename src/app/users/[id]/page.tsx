'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { userService } from '@/services/userService'
import { User } from '@/types/api'
import './userDetails.scss'

const UserDetailsPage = () => {
  const params = useParams()       
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    if (!params?.id) return

    const id = Array.isArray(params.id) ? params.id[0] : params.id

    // Try to get from cache first
    const cachedUser = userService.getUserByIdFromCache(id)
    if (cachedUser) {
      setUser(cachedUser)
      return
    }

    // Fallback: fetch all users (if needed)
    userService.getAllUsers().then(() => {
      const u = userService.getUserByIdFromCache(id)
      setUser(u || null)
    }).catch(() => setUser(null))
  }, [params?.id])

  if (!user) return <p>User not found</p>
return (
  <div className="user-details-container">
    {/* Back link */}
    <button className="back-btn">← Back to Users</button>

    {/* Page header */}
    <div className="page-header">
      <h1>User Details</h1>

      <div className="actions">
        <button className="btn-outline danger">Blacklist User</button>
        <button className="btn-outline success">Activate User</button>
      </div>
    </div>

    {/* User summary card */}
    <div className="user-summary">
      <div className="profile">
        <div className="avatar">
          {user.profile?.fullName?.charAt(0) || user.fullName.charAt(0)}
        </div>

        <div className="info">
          <h2>{user.profile?.fullName || user.fullName}</h2>
          {/* <span className="id">{user.accountNumber}</span> */}
        </div>
      </div>

      <div className="tier">
        <p>User’s Tier</p>
        <span>⭐⭐⭐</span>
      </div>

      <div className="balance">
        <h3>₦{Number(user.accountBalance).toLocaleString()}</h3>
        {/* <p>{user.accountNumber}/Providus Bank</p> */}
      </div>
    </div>

    {/* Tabs */}
    <div className="tabs">
      <span className="active">General Details</span>
      <span>Documents</span>
      <span>Bank Details</span>
      <span>Loans</span>
      <span>Savings</span>
      <span>App and System</span>
    </div>

    {/* Details card */}
    <div className="details-card">
      <section>
        <h4>Personal Information</h4>

        <div className="grid">
          <div>
            <label>Full Name</label>
            <p>{user.profile?.fullName}</p>
          </div>
          <div>
            <label>Phone Number</label>
            <p>{user.phoneNumber}</p>
          </div>
          <div>
            <label>Email Address</label>
            <p>{user.email}</p>
          </div>
          <div>
            <label>BVN</label>
            <p>{user.profile?.bvn}</p>
          </div>
          <div>
            <label>Gender</label>
            <p>{user.profile?.gender}</p>
          </div>
        </div>
      </section>

      <section>
        <h4>Education and Employment</h4>

        <div className="grid">
          <div>
            <label>Level of Education</label>
            <p>{user.education?.level}</p>
          </div>
          <div>
            <label>Employment Status</label>
            <p>{user.education?.employmentStatus}</p>
          </div>
          <div>
            <label>Sector</label>
            <p>{user.education?.sector}</p>
          </div>
          <div>
            <label>Duration</label>
            <p>{user.education?.duration}</p>
          </div>
        </div>
      </section>
    </div>
  </div>
)
}

export default UserDetailsPage
