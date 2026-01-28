'use client'

import "./tables.scss";
import { User } from "@/types/api";
import FilterIcon from "./FilterIcon";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
        console.log("Navigating to:", `/users/${userId}`);
        console.log('button clicked')
          localStorage.setItem('selectedUser', JSON.stringify(users))
    router.push(`/users/${userId}`);
    return;
  }
  };

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

  return (
    <div className="table-wrapper">
      <table className="users-table">
        <thead>
          <tr>
            <th>
              <span className="th-content">
                Organization
                <FilterIcon />
              </span>
            </th>
            <th>
              <span className="th-content">
                Username
                <FilterIcon />
              </span>
            </th>
            <th>
              <span className="th-content">
                Email
                <FilterIcon />
              </span>
            </th>
            <th>
              <span className="th-content">
                Phone Number
                <FilterIcon />
              </span>
            </th>
            <th>
              <span className="th-content">
                Date Joined
                <FilterIcon />
              </span>
            </th>
            <th>
              <span className="th-content">
                Status
                <FilterIcon />
              </span>
            </th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{truncateText(user.organization, 17)}</td>
                <td>{user.profile?.fullName || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{formatPhoneNumber(user.phoneNumber || user.phoneNumber)}</td>
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
                      onClick={() => handleDropdownToggle(user.id)}
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
