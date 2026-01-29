export interface PersonalInfo {
  fullName: string
  phoneNumber?: string
  email?: string
  bvn?: string
  gender?: string
  maritalStatus?: string
  children?: string
  residenceType?: string
}

export interface BankInfo {
  accountNumber?: string
  bankName?: string
}

export interface Education {
  level?: string
  employmentStatus?: string
  sector?: string
  duration?: string
  officeEmail?: string
  monthlyIncome?: string
  loanRepayment?: number
}

export interface Socials {
  twitter?: string
  facebook?: string
  instagram?: string
}

export interface Guarantor {
  fullName?: string
  phoneNumber?: string
  email?: string
  relationship?: string
}

export interface User {
  id: string
  userId?: string
  organization?: string
//   username: string
  fullName: string
  email: string
  phoneNumber?: string
  dateJoined: string
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted' | 'active' | 'inactive' | 'pending'
  avatar?: string
  accountBalance?: number
  tier?: number
  bankInfo?: BankInfo
   profile?: {
    fullName: string
    bvn?: string
    gender?: string
    maritalStatus?: string
    children?: number
    typeOfResidence?: string
  }
  education?: Education
  socials?: Socials
  guarantors?: Guarantor[]
}

export interface UsersResponse {
  data: User[]
  total: number
  page: number
  limit: number
}

export interface ApiError {
  message: string
  status?: number
}
