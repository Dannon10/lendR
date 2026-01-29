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
            { label: 'Guarantors', icon: '/guarantors.svg', href: '/#' },
            { label: 'Loans', icon: '/loans.svg', href: '/#' },
            { label: 'Decision Models', icon: '/handshake-regular 1.svg', href: '/#' },
            { label: 'Savings', icon: '/savings-product.svg', href: '/#' },
            { label: 'Loan Request', icon: '/loan-request.svg', href: '/#' },
            { label: 'Karma', icon: '/karma.svg', href: '/#'},
            { label: 'Whitelist', icon: '/whitelist.svg', href: '/#' },
        ]
    },
    businesses: {
        title: 'Businesses',
        items: [
            { label: 'Organization', icon: '/briefcase 1.svg', href: '/#' },
            { label: 'Savings Product', icon: '/savings-product.svg', href: '/#' },
            { label: 'Loan Product', icon: '/loan-request.svg', href: '/#' },
            { label: 'Fess and Charges', icon: '/fees.svg', href: '/#' },
            { label: 'Transactions', icon: '/transactions.svg', href: '/#' },
            { label: 'Services', icon: '/services.svg', href: '/#' },
            { label: 'Service Account', icon: '/service-account.svg', href: '/#' },
            { label: 'Settlements', icon: '/settlements.svg', href: '/#' },
            { label: 'Reports', icon: '/reports.svg', href: '/#' },
        ]
    },
    settings: {
        title: 'Settings',
        items: [
            { label: 'Preferences', icon: '/preferences.svg', href: '/#' },
            { label: 'Fess and Pricing', icon: '/fees-n-pricing.svg', href: '/#' },
            { label: 'Audit', icon: '/audit.svg', href: '/#' },
        ]
    }
}
