"use client"

import Image from 'next/image'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import './navbar.scss'
import { userService } from '@/services/userService'

export default function navbar() {
    const [query, setQuery] = useState('')
    const [results, setResults] = useState<any[]>([])
    const [open, setOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)
    const router = useRouter()
    const ref = useRef<HTMLDivElement | null>(null)
    const profileRef = useRef<HTMLDivElement | null>(null)
    
    function toggleSidebar() {
        if (typeof document === 'undefined') return
        document.body.classList.toggle('sidebar-open')
    }

    useEffect(() => {
        // load users into cache early
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

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (!profileRef.current) return
            if (!profileRef.current.contains(e.target as Node)) {
                setProfileOpen(false)
            }
        }
        document.addEventListener('click', handleClick)
        return () => document.removeEventListener('click', handleClick)
    }, [])

    function goToUser(id: string) {
        setQuery('')
        setOpen(false)
        router.push(`/users/${id}`)
    }

    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <button className='hamburger-btn' aria-label='Open menu' onClick={toggleSidebar}>
                        <Image src='/menu-line 1.svg' alt='Menu' width={20} height={20} />
                    </button>
                    <Image src="/lendr.png" alt="Logo" width={100} height={70} />
                    <div className='search-wrapper' ref={ref}>
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
                                {results.map(r => {
                                    const highlightMatches = (text: string, query: string): string[] => {
                                        if (!query || !text) return [text]
                                        const parts = text.split(new RegExp(`(${query})`, 'gi'))
                                        return parts
                                    }

                                    const name = r.profile?.fullName || r.username
                                    const org = r.organization || ''
                                    const nameParts = highlightMatches(name, query)
                                    const orgParts = highlightMatches(org, query)

                                    return (
                                        <button
                                            key={r.id}
                                            className='search-result-item'
                                            onClick={() => goToUser(r.id)}
                                        >
                                            <div className='result-left'>
                                                <div className='result-name'>
                                                    {nameParts.map((part: string, i: number) => (
                                                        <span key={i} className={part.toLowerCase() === query.toLowerCase() ? 'highlight' : ''}>
                                                            {part}
                                                        </span>
                                                    ))}
                                                </div>
                                                <div className='result-meta'>
                                                    {orgParts.map((part: string, i: number) => (
                                                        <span key={i} className={part.toLowerCase() === query.toLowerCase() ? 'highlight' : ''}>
                                                            {part}
                                                        </span>
                                                    ))}
                                                    {orgParts.length > 0 && ' • '}
                                                    {r.status}
                                                </div>
                                            </div>
                                            <div className='result-right'>View</div>
                                        </button>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </div>
                <div className='navbar-right'>
                    <a href="#" className='docs-link'>Docs</a>
                    <Image src="/notification-icon.svg" alt="Notifications" width={24} height={24} />
                    <div className='profile-menu' ref={profileRef}>
                        <button 
                            className='profile-btn'
                            onClick={() => setProfileOpen(!profileOpen)}
                        >
                            <Image src="/profile-pic.png" alt="Profile Picture" width={40} height={40} className='profile-pic' />
                            <span className='profile-name'>Adedeji</span>
                            <Image src="/dropdown.svg" alt="dropdown" width={20} height={20} />
                        </button>
                        {profileOpen && (
                            <div className='profile-dropdown'>
                                <a href="#" className='profile-option'>Docs</a>
                                <button className='profile-option'>My Profile</button>
                                <button className='profile-option'>Settings</button>
                                <button className='profile-option'>Sign Out</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
