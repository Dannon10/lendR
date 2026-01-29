'use client'

import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useParams } from 'next/navigation'
import { userService } from '@/services/userService'
import { User } from '@/types/api'
import './userDetails.scss'
import Image from 'next/image'
import UserDetailsSkeleton from '@/components/UserDetailsSkeleton'

const UserDetailsPage = () => {
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Tabs and tab state must be declared before any returns
  const tabs = [
    'General Details',
    'Documents',
    'Bank Details',
    'Loans',
    'Savings',
    'App and System'
  ]

  const [activeTab, setActiveTab] = useState(0)
  const [visibleCount, setVisibleCount] = useState(4)
  const [visibleTabs, setVisibleTabs] = useState<string[]>(tabs.slice(0, visibleCount))
  const [overflowTabs, setOverflowTabs] = useState<string[]>(tabs.slice(visibleCount))
  const [moreOpen, setMoreOpen] = useState(false)
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([])
  const moreBtnRef = useRef<HTMLButtonElement | null>(null)
  const [morePos, setMorePos] = useState<{ top: number; left: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!params?.id) return

    const id = Array.isArray(params.id) ? params.id[0] : params.id

    // Try to get from cache first
    const cachedUser = userService.getUserByIdFromCache(id)
    if (cachedUser) {
      setUser(cachedUser)
      setLoading(false)
      return
    }

    // Fallback: fetch all users (if needed)
    userService.getAllUsers().then(() => {
      const u = userService.getUserByIdFromCache(id)
      setUser(u || null)
      setLoading(false)
    }).catch(() => {
      setUser(null)
      setLoading(false)
    })
  }, [params?.id])

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth
      const total = tabs.length
      let count: number

      // On large desktops show all tabs (no overflow)
      if (w >= 1200) {
        count = total
      } else {
        // Cap at 5 on mid/desktop to keep room for the more menu
        count = Math.min(5, total)
        if (w < 480) count = Math.min(3, total)
        else if (w < 768) count = Math.min(4, total)
      }

      setVisibleCount(count)
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [tabs.length])

  useEffect(() => {
    setVisibleTabs(tabs.slice(0, visibleCount))
    setOverflowTabs(tabs.slice(visibleCount))
  }, [visibleCount])

  // close more dropdown when clicking outside
  useEffect(() => {
    if (!moreOpen) return

    const handleClickOutside = (e: MouseEvent) => {
      const moreWrapper = document.querySelector('.more-wrapper')
      if (moreWrapper && !moreWrapper.contains(e.target as Node)) {
        setMoreOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [moreOpen])

  // compute portal position when opening the more menu
  useEffect(() => {
    if (!moreOpen) {
      setMorePos(null)
      return
    }
    const btn = moreBtnRef.current
    if (!btn) return
    const rect = btn.getBoundingClientRect()
    setMorePos({ top: rect.bottom + window.scrollY + 8, left: rect.right + window.scrollX - 180 })
  }, [moreOpen])

  // close more dropdown on Escape
  useEffect(() => {
    if (!moreOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMoreOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [moreOpen])

  // underline positioning
  useEffect(() => {
    const underline = document.querySelector('.tab-underline') as HTMLElement | null
    if (!underline) return
    const btns = document.querySelectorAll('.profile-tabs .tab')
    const active = btns[activeTab] as HTMLElement | undefined
    if (active) {
      const rect = active.getBoundingClientRect()
      const parentRect = active.parentElement!.getBoundingClientRect()
      underline.style.width = rect.width + 'px'
      underline.style.transform = `translateX(${rect.left - parentRect.left}px)`
    } else {
      underline.style.width = '0px'
    }
  }, [activeTab, visibleTabs, overflowTabs])

  function handleMoreSelect(index: number) {
    // swap selected overflow tab into the last visible slot
    const lastIdx = visibleTabs.length - 1
    const newVisible = [...visibleTabs]
    const newOverflow = [...overflowTabs]
    const selected = newOverflow.splice(index, 1)[0]
    const displaced = newVisible.splice(lastIdx, 1, selected)[0]
    newOverflow.push(displaced)
    setVisibleTabs(newVisible)
    setOverflowTabs(newOverflow)
    setActiveTab(lastIdx)
    setMoreOpen(false)
  }

  // Action handlers for header action buttons
  const handleActivateUserClick = () => {
    if (!user) return
    const updated = userService.updateUserStatus(user.id, 'Active')
    if (updated) {
      setUser(prev => prev ? { ...prev, status: 'Active' } : prev)
      alert('User activated')
    }
  }

  const handleBlacklistUserClick = () => {
    if (!user) return
    const updated = userService.updateUserStatus(user.id, 'Blacklisted')
    if (updated) {
      setUser(prev => prev ? { ...prev, status: 'Blacklisted' } : prev)
      alert('User blacklisted')
    }
  }

  if (loading) {
    return <UserDetailsSkeleton />
  }

  if (!user) {
    return (
      <div className="user-details">
        <div className="error-state">
          <div className="error-icon">⚠</div>
          <h2>User Not Found</h2>
          <p>The user you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="user-details">
      {/* Header Section */}
      <div className="user-header">
        <div>
          <button className="back-button" onClick={() => window.history.back()}>
            <Image src="/back.svg" alt="Back" width={26} height={9} /> Back to Users
          </button>
        </div>

        <div className="header-actions">
          <button className="action-button blacklist">Blacklist User</button>
          <button className="action-button activate">Activate User</button>
        </div>
      </div>

      {/* User Profile Card */}
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.avatar ? (
              <div className="avatar-placeholder">
                {(user.profile?.fullName || user.fullName || 'U').charAt(0).toUpperCase()}
              </div>
            ) : (
              <Image src='/avatar.svg' alt={user.profile?.fullName || user.fullName} width={100} height={100} />
            )}
          </div>

          <div className="profile-identity">
            <h1 className="profile-name">{user.profile?.fullName || user.fullName}</h1>
            <p className="profile-id">ID: {user.id}</p>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-tier">
            <p className="tier-label">User's Tier</p>
            <div className="tier-stars" aria-label={`Tier ${(user as any).tier || 0} of 3`}>
              {[1, 2, 3].map((n) => (
                <span
                  key={n}
                  className={`star ${(user as any).tier >= n ? 'filled' : 'empty'}`}
                  aria-hidden="true"
                >
                  <Image src={(user as any).tier >= n ? '/star-filled.svg' : '/star.svg'} alt={(user as any).tier >= n ? 'Filled star' : 'Empty star'} width={14} height={14} />
                </span>
              ))}
            </div>
          </div>

          <div className="profile-divider"></div>

          <div className="profile-bank">
            <h3 className="bank-value">
              ₦{user.accountBalance ? user.accountBalance.toLocaleString() : '0'}
            </h3>
            <p className="bank-account">{user.bankInfo?.accountNumber || 'N/A'}/{user.bankInfo?.bankName || 'N/A'}</p>
          </div>
        </div>

        <div className="profile-tabs" ref={containerRef}>
          {visibleTabs.map((t, i) => (
            <button
              key={t}
              className={`tab ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
              ref={(el) => { tabsRef.current[i] = el }}
            >
              {t}
            </button>
          ))}

          {overflowTabs.length > 0 && (
            <div className="more-wrapper">
              <button ref={(el) => { moreBtnRef.current = el }} className={`tab more`} onClick={() => setMoreOpen(!moreOpen)}>...</button>
              {moreOpen && morePos && createPortal(
                <div className="more-dropdown-portal" style={{ position: 'absolute', top: morePos.top, left: morePos.left }}>
                  {overflowTabs.map((ot, idx) => (
                    <button key={ot} className="dropdown-item" onClick={() => handleMoreSelect(idx)}>{ot}</button>
                  ))}
                </div>,
                document.body
              )}
            </div>
          )}

          <div className="tab-underline" aria-hidden="true"></div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="details-head">
        {/* Personal Information */}
        <section className="details-section">
          <h2 className="section-title">Personal Information</h2>
          <div className="details-content">
            <div className='personal-info'>
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{user.profile?.fullName || user.fullName || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number</span>
                <span className="detail-value">{user.phoneNumber ?? 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{user.email || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">BVN</span>
                <span className="detail-value">{user.profile?.bvn ?? 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender</span>

                <span className="detail-value">
                  {user.profile?.gender
                    ? user.profile.gender.charAt(0).toUpperCase() + user.profile.gender.slice(1)
                    : 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Marital Status</span>
                <span className="detail-value">{user.profile?.maritalStatus || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Children</span>
                <span className="detail-value">{user.profile?.children ?? 'None'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type of Residence</span>
                <span className="detail-value">{user.profile?.typeOfResidence || user.profile?.typeOfResidence || 'N/A'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Education and Employment */}
        <section className="details-section">
          <h2 className="section-title">Education and Employment</h2>
          <div className="details-content">
            <div className="content-box">

              <div className="detail-item">
                <span className="detail-label">Level of Education</span>
                <span className="detail-value">{user.education?.level || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Employment Status</span>
                <span className="detail-value">{user.education?.employmentStatus || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Sector of Employment</span>
                <span className="detail-value">{user.education?.sector || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Duration of Employment</span>
                <span className="detail-value">{user.education?.duration || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Office Email</span>
                <span className="detail-value">{user.education?.officeEmail || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Monthly Income</span>
                <span className="detail-value">{user.education?.monthlyIncome || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Loan Repayment</span>
                <span className="detail-value">{user.education?.loanRepayment ? `₦${Number(user.education.loanRepayment).toLocaleString()}` : 'N/A'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Socials */}
        <section className="details-section">
          <h2 className="section-title">Socials</h2>
          <div className="details-content">
            <div className="content-box">

              <div className="detail-item">
                <span className="detail-label">Twitter</span>
                <span className="detail-value">{user.socials?.twitter || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Facebook</span>
                <span className="detail-value">{user.socials?.facebook || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Instagram</span>
                <span className="detail-value">{user.socials?.instagram || 'N/A'}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Guarantor */}
        <section className="details-section">
          <h2 className="section-title">Guarantor</h2>
          <div className="details-content">
            <div className="content-box">

              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{user.guarantors?.[0]?.fullName || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number</span>
                <span className="detail-value">{user.guarantors?.[0]?.phoneNumber || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{user.guarantors?.[0]?.email || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Relationship</span>
                <span className="detail-value">{user.guarantors?.[0]?.relationship || 'N/A'}</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserDetailsPage