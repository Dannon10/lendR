'use client'

import "./tables.scss";
import { User } from "@/types/api";
import FilterDropdown from "./FilterDropdown";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { userService } from '@/services/userService'

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Update filteredUsers when the users prop changes
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [openDropdown]);

  const handleDropdownToggle = (userId: string) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const handleAction = (action: string, userId: string) => {
    setOpenDropdown(null);
    if (action === "View Details") {
      const selected = users.find(u => u.id === userId)
      if (selected && typeof window !== 'undefined') {
        localStorage.setItem('selectedUser', JSON.stringify(selected))
      }
      router.push(`/users/${userId}`)
      return
    }

    if (action === "Activate User" || action === 'Blacklist User') {
      const newStatus = action === 'Activate User' ? 'Active' : 'Blacklisted'
      const updated = userService.updateUserStatus(userId, newStatus)
      if (updated) {
        setFilteredUsers(prev => prev.map(u => u.id === userId ? { ...u, status: newStatus } : u))
      }
      return
    }

  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString)
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }
    return date.toLocaleDateString('en-US', options)
  }

 const formatPhoneNumber = (phoneNumber: string | number | undefined): string => {
  if (!phoneNumber) return '-'
  const str = String(phoneNumber)
  return str
}


  const truncateText = (text: string | undefined, maxLength: number): string => {
    if (!text) return '-'
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...'
    }
    return text
  }

  const handleFilter = (filters: any) => {
    let result = [...users]

    if (filters.organization && filters.organization.trim()) {
      result = result.filter(u => 
        u.organization?.toLowerCase().includes(filters.organization.toLowerCase())
      )
    }

    if (filters.username && filters.username.trim()) {
      result = result.filter(u => 
        (u.profile?.fullName|| '')
          .toLowerCase()
          .includes(filters.username.toLowerCase())
      )
    }

    if (filters.email && filters.email.trim()) {
      result = result.filter(u => 
        u.email?.toLowerCase().includes(filters.email.toLowerCase())
      )
    }

    if (filters.phoneNumber && filters.phoneNumber.trim()) {
      result = result.filter(u => 
        String(u.phoneNumber || '').includes(filters.phoneNumber)
      )
    }

    if (filters.dateJoined && filters.dateJoined.trim()) {
      result = result.filter(u => {
        const userDate = new Date(u.dateJoined).toISOString().split('T')[0]
        return userDate === filters.dateJoined
      })
    }

    if (filters.status && filters.status.trim()) {
      result = result.filter(u => 
        u.status?.toLowerCase() === filters.status.toLowerCase()
      )
    }

    setFilteredUsers(result)
  }

  const handleReset = () => {
    setFilteredUsers(users)
  }

  return (
    <div className="table-wrapper">
      <table className="users-table">
        <thead>
            <tr>
            <th>
              <span className="th-content">
                Organization
               <Image src="/filter.svg" alt="Filter" width={16} height={16} />

              </span>
            </th>
            <th>
              <span className="th-content">
                Username
                <FilterDropdown onFilter={handleFilter} onReset={handleReset} />
              </span>
            </th>
            <th>
              <span className="th-content">
                Email
                <FilterDropdown onFilter={handleFilter} onReset={handleReset} />
              </span>
            </th>
            <th>
              <span className="th-content">
                Phone Number
                <FilterDropdown onFilter={handleFilter} onReset={handleReset} />
              </span>
            </th>
            <th>
              <span className="th-content">
                Date Joined
                <FilterDropdown onFilter={handleFilter} onReset={handleReset} />
              </span>
            </th>
            <th>
              <span className="th-content">
                Status
                <Image src="/filter.svg" alt="Filter" width={16} height={16} />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers && filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr
                key={user.id}
                onClick={() => router.push(`/users/${user.id}`)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    router.push(`/users/${user.id}`)
                  }
                }}
                tabIndex={0}
                style={{ cursor: 'pointer' }}
              >
                <td>{truncateText(user.organization, 17)}</td>
                <td>{user.profile?.fullName || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>0{formatPhoneNumber(user.phoneNumber || user.phoneNumber)}</td>
                <td>{user.dateJoined ? formatDate(user.dateJoined) : '-'}</td>
                <td>
                  <span
                    className={`status status--${user.status.toLowerCase()}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="actions">
                  <div className="action-menu" ref={menuRef}>
                    <button
                      className="action-button"
                      onClick={(e) => { e.stopPropagation(); handleDropdownToggle(user.id); }}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === user.id}
                    >
                      ⋮
                    </button>
                    {openDropdown === user.id && (
                      <div className="dropdown-menu"
                      onClick={(e) => e.stopPropagation()}
                      >
                        <div className="dropdown-content">
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction("View Details", user.id)}
                        >
                          <Image
                            src="/view.svg"
                            alt="View"
                            width={16}
                            height={16}
                          />
                          View Details
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction("Activate User", user.id)}
                        >
                          <Image
                            src="/activate.svg"
                            alt="Activate"
                            width={16}
                            height={16}
                          />
                          Activate User
                        </button>
                        <button
                          className="dropdown-item"
                          onClick={() => handleAction("Blacklist User", user.id)}
                        >
                          <Image
                            src="/blacklist.svg"
                            alt="Blacklist"
                            width={16}
                            height={16}
                          />
                          Blacklist User
                        </button>
                    </div>
                      </div>
                    )}
                  </div>
                </td>
                </tr>
              ))
            ) : (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '2rem' }}>
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
