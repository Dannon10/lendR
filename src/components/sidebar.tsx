'use client'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { sidebarData } from '@/data/sidebarData'
import SidebarItem from './SidebarItem'
import Link from 'next/link'
import './sidebar.scss'
import { useRouter } from 'next/navigation'
import { userService } from '@/services/userService'

export default function Sidebar() {
    const [isOrgMenuOpen, setIsOrgMenuOpen] = useState(false)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement | null>(null)
    const router = useRouter()
    const pathname = usePathname()
    const isDashboardActive = pathname === '/dashboard'

    useEffect(() => {
        // pre-load users for search
        userService.getAllUsers().catch(() => {})
    }, [])

    useEffect(() => {
        if (!query || query.trim().length < 1) {
            setResults([])
            setOpen(false)
            return
        }

        const q = query.toLowerCase()
        const all = (userService as any).allUsersCached || []
        const filtered = all.filter((u: any) => {
            const name = (u.profile?.fullName || u.username || '').toLowerCase()
            const org = (u.organization || '').toLowerCase()
            const status = (u.status || '').toLowerCase()
            return name.includes(q) || org.includes(q) || status.includes(q)
        }).slice(0, 8)

        setResults(filtered)
        setOpen(filtered.length > 0)
    }, [query])

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!ref.current) return
            if (!ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    function goToUser(id: string) {
        setQuery('')
        setOpen(false)
        // close sidebar on mobile
        if (typeof document !== 'undefined') document.body.classList.remove('sidebar-open')
        router.push(`/users/${id}`)
    }

    function closeSidebar() {
        if (typeof document !== 'undefined') document.body.classList.remove('sidebar-open')
    }

    useEffect(() => {
        const handleOverlayClick = (e: MouseEvent) => {
            // Close sidebar if clicking the overlay (dark background)
            if (e.target === document.querySelector('.sidebar-overlay')) {
                closeSidebar()
            }
        }
        document.addEventListener('click', handleOverlayClick)
        return () => document.removeEventListener('click', handleOverlayClick)
    }, [])

    return (
        <>
            <div className="sidebar-overlay" onClick={closeSidebar}></div>
            <aside className='sidebar'>
            <div className='sidebar-content'>
                <button className='sidebar-close' aria-label='Close' onClick={closeSidebar}>
                    <Image src='/close-line.svg' alt='Close' width={20} height={20} />
                </button>
                {/* Mobile search (visible only on mobile and tablet) */}
                <div className='mobile-search' ref={ref}>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder='Search for anything'
                        className='search-input'
                        onFocus={() => { if (results.length) setOpen(true) }}
                    />
                    <div className='search-icon-wrapper'>
                        <Image src="/search.svg" alt="Search" width={20} height={20} className='search-icon' />
                    </div>

                    {open && (
                        <div className='search-results'>
                            {results.map(r => (
                                <button
                                    key={r.id}
                                    className='search-result-item'
                                    onClick={() => goToUser(r.id)}
                                >
                                    <div className='result-left'>
                                        <div className='result-name'>{r.profile?.fullName || r.username}</div>
                                        <div className='result-meta'>{r.organization} • {r.status}</div>
                                    </div>
                                    <div className='result-right'>View</div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
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
        </>
    )
}
