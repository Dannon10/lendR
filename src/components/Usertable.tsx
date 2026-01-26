import "./tables.scss";
import { User } from "@/types/api";
import FilterIcon from "./FilterIcon";

interface UsersTableProps {
  users: User[];
}

const UsersTable = ({ users }: UsersTableProps) => {
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

  const formatPhoneNumber = (phoneNumber: string | undefined): string => {
    if (!phoneNumber) return '-'
    
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '')
    
    // If less than 10 digits, return as is
    if (cleaned.length < 10) return phoneNumber
    
    // Format as xxx-xxx-xxxx (take only the last 10 digits if more exist)
    const lastTen = cleaned.slice(-10)
    return `${lastTen.slice(0, 3)}-${lastTen.slice(3, 6)}-${lastTen.slice(6)}`
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
                <td>{user.personalInfo?.fullName || '-'}</td>
                <td>{user.email || '-'}</td>
                <td>{formatPhoneNumber(user.phoneNumber || user.personalInfo?.phoneNumber)}</td>
                <td>{user.dateJoined ? formatDate(user.dateJoined) : '-'}</td>
                <td>
                  <span
                    className={`status status--${user.status.toLowerCase()}`}
                  >
                    {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                  </span>
                </td>
                <td className="actions">⋮</td>
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
