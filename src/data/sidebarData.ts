export interface SidebarItemType {
    label: string
    icon: string
    href: string
}

export interface SidebarSection {
    title: string
    items: SidebarItemType[]
}

export const sidebarData: Record<string, SidebarSection> = {
    customers: {
        title: 'Customers',
        items: [
            { label: 'Users', icon: '/users.svg', href: '/users' },
            { label: 'Guarantors', icon: '/guarantors.svg', href: '/guarantors' },
            { label: 'Loans', icon: '/loans.svg', href: '/loans' },
            { label: 'Decision Models', icon: '/handshake-regular 1.svg', href: '/decision-models' },
            { label: 'Savings', icon: '/savings-product.svg', href: '/savings' },
            { label: 'Loan Request', icon: '/loan-request.svg', href: '/loan-request' },
            { label: 'Karma', icon: '/karma.svg', href: '/dashboard/karma' },
            { label: 'Whitelist', icon: '/whitelist.svg', href: '/dashboard/whitelist' },
        ]
    },
    businesses: {
        title: 'Businesses',
        items: [
            { label: 'Organization', icon: '/briefcase 1.svg', href: '/dashboard/organization' },
            { label: 'Savings Product', icon: '/savings-product.svg', href: '/dashboard/savings-product' },
            { label: 'Loan Product', icon: '/loan-request.svg', href: '/dashboard/loan-product' },
            { label: 'Fess and Charges', icon: '/fees.svg', href: '/dashboard/fees-charges' },
            { label: 'Transactions', icon: '/transactions.svg', href: '/dashboard/transactions' },
            { label: 'Services', icon: '/services.svg', href: '/dashboard/services' },
            { label: 'Service Account', icon: '/service-account.svg', href: '/dashboard/service-account' },
            { label: 'Settlements', icon: '/settlements.svg', href: '/dashboard/settlements' },
            { label: 'Reports', icon: '/reports.svg', href: '/dashboard/reports' },
        ]
    },
    settings: {
        title: 'Settings',
        items: [
            { label: 'Preferences', icon: '/preferences.svg', href: '/dashboard/preferences' },
            { label: 'Fess and Pricing', icon: '/fees-n-pricing.svg', href: '/dashboard/fees-pricing' },
            { label: 'Audit', icon: '/audit.svg', href: '/dashboard/audit' },
        ]
    }
}
