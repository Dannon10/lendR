'use client'
import Image from 'next/image'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { sidebarData } from '@/data/sidebarData'
import SidebarItem from './SidebarItem'
import Link from 'next/link'
import './sidebar.scss'

export default function Sidebar() {
    const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false)
    const pathname = usePathname()
    const isDashboardActive = pathname === '/dashboard'

    return (
        <aside className='sidebar'>
            <div className='sidebar-content'>
                {/* Switch Organizations */}
                <div className='switch-org' onClick={() => setIsOrgMenuOpen(!isOrgMenuOpen)}>
                    <Image src="/briefcase 1.svg" alt="Briefcase" width={16} height={16} className='briefcase-icon' />
                    <span>Switch Organisations</span>
                    <Image 
                        src="/chevron.svg" 
                        alt="Chevron" 
                        width={20} 
                        height={20} 
                        className={`chevron-icon ${isOrgMenuOpen ? 'open' : 'closed'}`}
                    />
                </div>

                {/* Dashboard */}
                <Link href="/dashboard">
                <div className={`sidebar-item dashboard-item ${isDashboardActive ? 'active' : 'inactive'}`}>
                    <Image src="/dashboard.svg" alt="Dashboard" width={16} height={14} />
                    <span>Dashboard</span>
                </div>
</Link>

                {/* Sections */}
                {Object.values(sidebarData).map((section) => (
                    <div key={section.title} className='sidebar-section'>
                        <h3 className='section-title'>{section.title}</h3>
                        <div className='sidebar-items'>
                            {section.items.map((item) => (
                                <SidebarItem key={item.label} {...item} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </aside>
    )
}
