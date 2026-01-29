"use client"

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import './filterDropdown.scss'

interface FilterFormData {
    organization: string
    username: string
    email: string
    phoneNumber: string
    dateJoined: string
    status: string
}

interface FilterDropdownProps {
    onFilter: (filters: Partial<FilterFormData>) => void
    onReset: () => void
}

const FilterDropdown = ({ onFilter, onReset }: FilterDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState<FilterFormData>({
        organization: '',
        username: '',
        email: '',
        phoneNumber: '',
        dateJoined: '',
        status: '',
    })
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [showDatePicker, setShowDatePicker] = useState(false)
    const dateInputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('click', handleClickOutside)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleCalendarClick = () => {
        dateInputRef.current?.click()
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({
            ...prev,
            dateJoined: e.target.value
        }))
    }

    const handleFilter = () => {
        onFilter(formData)
        setIsOpen(false)
    }

    const handleReset = () => {
        setFormData({
            organization: '',
            username: '',
            email: '',
            phoneNumber: '',
            dateJoined: '',
            status: '',
        })
        onReset()
        setIsOpen(false)
    }

    return (
        <div className="filter-dropdown" ref={dropdownRef}>
            <button
                className="filter-trigger"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Image
                    src="/filter.svg"
                    alt="Filter"
                    width={16}
                    height={16}
                />
            </button>

            {isOpen && (
                <div className="filter-dropdown-content">
                    <div className="filter-form">
                        <div className="form-group">
                            <label htmlFor="organization">Organization</label>
                            <select
                                id="organization"
                                name="organization"
                                value={formData.organization}
                                onChange={handleInputChange}
                            >
                                <option value="">Select</option>
                                <option value="Active">Carbon</option>
                                <option value="Inactive">Lendstar</option>
                                <option value="Pending">Tesla</option>
                                <option value="Blacklisted">Lendsqr</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="User"
                                value={formData.username}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group date-group">
                            <label htmlFor="dateJoined">Date</label>
                            <div className="date-input-wrapper">
                                <input
                                    type="text"
                                    id="dateJoined"
                                    placeholder="Date Joined"
                                    value={formData.dateJoined}
                                    readOnly
                                    className="date-input"
                                />
                                <button
                                    type="button"
                                    className="calendar-btn"
                                    onClick={handleCalendarClick}
                                    aria-label="Open calendar"
                                >
                                    <Image
                                        src="/calendar.svg"
                                        alt="Calendar"
                                        width={18}
                                        height={18}
                                    />
                                </button>
                                <input
                                    ref={dateInputRef}
                                    type="date"
                                    value={formData.dateJoined}
                                    onChange={handleDateChange}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input
                                type="text"
                                id="phoneNumber"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                value={formData.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="form-group">
                            <label htmlFor="status">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                            >
                                <option value="">Select</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="Pending">Pending</option>
                                <option value="Blacklisted">Blacklisted</option>
                            </select>
                        </div>

                        <div className="form-actions">
                            <button
                                type="button"
                                className="btn-reset"
                                onClick={handleReset}
                            >
                                Reset
                            </button>
                            <button
                                type="button"
                                className="btn-filter"
                                onClick={handleFilter}
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default FilterDropdown
//  'use client'

// import { useState, useRef, useEffect } from 'react'
// import { createPortal } from 'react-dom'
// import Image from 'next/image'
// import './filterDropdown.scss'

// interface FilterFormData {
//     organization: string
//     username: string
//     email: string
//     phoneNumber: string
//     dateJoined: string
//     status: string
// }

// interface FilterDropdownProps {
//     onFilter: (filters: Partial<FilterFormData>) => void
//     onReset: () => void
// }

// const FilterDropdown = ({ onFilter, onReset }: FilterDropdownProps) => {
//     const [isOpen, setIsOpen] = useState(false)
//     const [formData, setFormData] = useState<FilterFormData>({
//         organization: '',
//         username: '',
//         email: '',
//         phoneNumber: '',
//         dateJoined: '',
//         status: '',
//     })
//     const dropdownRef = useRef<HTMLDivElement>(null)
//     const triggerRef = useRef<HTMLButtonElement | null>(null)
//     const portalRef = useRef<HTMLDivElement | null>(null)
//     const [portalPos, setPortalPos] = useState<{ top: number; left: number } | null>(null)
//     const [showDatePicker, setShowDatePicker] = useState(false)
//     const dateInputRef = useRef<HTMLInputElement>(null)

//     useEffect(() => {
//         const handleClickOutside = (event: MouseEvent) => {
//             const target = event.target as Node
//             const insideTrigger = triggerRef.current && triggerRef.current.contains(target)
//             const insideDropdown = dropdownRef.current && dropdownRef.current.contains(target)
//             const insidePortal = portalRef.current && portalRef.current.contains(target)
//             if (!insideTrigger && !insideDropdown && !insidePortal) {
//                 setIsOpen(false)
//             }
//         }

//         if (isOpen) {
//             document.addEventListener('click', handleClickOutside)
//         }

//         return () => {
//             document.removeEventListener('click', handleClickOutside)
//         }
//     }, [isOpen])

//     // compute portal position when opening and keep it updated on scroll/resize
//     useEffect(() => {
//         const computePos = () => {
//             const btn = triggerRef.current
//             if (!btn) return
//             const rect = btn.getBoundingClientRect()
//             const vw = window.innerWidth
//             // desired width for portal (matches CSS max-width)
//             const portalWidth = Math.min(340, Math.max(240, Math.floor(vw * 0.45)))
//             let left = rect.right + window.scrollX - portalWidth
//             const top = rect.bottom + window.scrollY + 8

//             // if viewport is small (mobile), make portal full-bleed with small padding
//             if (vw < 480) {
//                 const pad = 8
//                 left = pad + window.scrollX
//             } else {
//                 // clamp so portal doesn't overflow viewport
//                 const minLeft = 8 + window.scrollX
//                 const maxLeft = window.scrollX + vw - portalWidth - 8
//                 left = Math.max(minLeft, Math.min(left, maxLeft))
//             }

//             setPortalPos({ top, left })
//         }

//         if (!isOpen) {
//             setPortalPos(null)
//             return
//         }

//         computePos()
//         window.addEventListener('scroll', computePos, { passive: true })
//         window.addEventListener('resize', computePos)
//         return () => {
//             window.removeEventListener('scroll', computePos)
//             window.removeEventListener('resize', computePos)
//         }
//     }, [isOpen])

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     const handleCalendarClick = () => {
//         dateInputRef.current?.click()
//     }

//     const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setFormData(prev => ({
//             ...prev,
//             dateJoined: e.target.value
//         }))
//     }

//     const handleFilter = () => {
//         onFilter(formData)
//         setIsOpen(false)
//     }

//     const handleReset = () => {
//         setFormData({
//             organization: '',
//             username: '',
//             email: '',
//             phoneNumber: '',
//             dateJoined: '',
//             status: '',
//         })
//         onReset()
//         setIsOpen(false)
//     }

//     const content = (
//         <div className="filter-dropdown" ref={dropdownRef}>
//             <button
//                 ref={(el) => { triggerRef.current = el }}
//                 className="filter-trigger"
//                 onClick={() => setIsOpen(!isOpen)}
//             >
//                 <Image
//                     src="/filter.svg"
//                     alt="Filter"
//                     width={16}
//                     height={16}
//                 />
//             </button>

//             {isOpen && portalPos && typeof document !== 'undefined' ? createPortal(
//                 <div ref={portalRef} className="filter-dropdown-content filter-dropdown-portal" style={{ position: 'absolute', top: portalPos.top, left: portalPos.left }}>
//                     <div className="filter-form">
//                         <div className="form-group">
//                             <label htmlFor="organization">Organization</label>
//                             <select
//                                 id="organization"
//                                 name="organization"
//                                 value={formData.organization}
//                                 onChange={handleInputChange}
//                             >
//                                 <option value="">Select</option>
//                                 <option value="Active">Carbon</option>
//                                 <option value="Inactive">Lendstar</option>
//                                 <option value="Pending">Tesla</option>
//                                 <option value="Blacklisted">Lendsqr</option>
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 placeholder="User"
//                                 value={formData.username}
//                                 onChange={handleInputChange}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label htmlFor="email">Email</label>
//                             <input
//                                 type="email"
//                                 id="email"
//                                 name="email"
//                                 placeholder="Email"
//                                 value={formData.email}
//                                 onChange={handleInputChange}
//                             />
//                         </div>

//                         <div className="form-group date-group">
//                             <label htmlFor="dateJoined">Date</label>
//                             <div className="date-input-wrapper">
//                                 <input
//                                     type="text"
//                                     id="dateJoined"
//                                     placeholder="Date Joined"
//                                     value={formData.dateJoined}
//                                     readOnly
//                                     className="date-input"
//                                 />
//                                 <button
//                                     type="button"
//                                     className="calendar-btn"
//                                     onClick={handleCalendarClick}
//                                     aria-label="Open calendar"
//                                 >
//                                     <Image
//                                         src="/calendar.svg"
//                                         alt="Calendar"
//                                         width={18}
//                                         height={18}
//                                     />
//                                 </button>
//                                 <input
//                                     ref={dateInputRef}
//                                     type="date"
//                                     value={formData.dateJoined}
//                                     onChange={handleDateChange}
//                                     style={{ display: 'none' }}
//                                 />
//                             </div>
//                         </div>
//                         <div className="form-group">
//                             <label htmlFor="phoneNumber">Phone Number</label>
//                             <input
//                                 type="text"
//                                 id="phoneNumber"
//                                 name="phoneNumber"
//                                 placeholder="Phone Number"
//                                 value={formData.phoneNumber}
//                                 onChange={handleInputChange}
//                             />
//                         </div>


//                         <div className="form-group">
//                             <label htmlFor="status">Status</label>
//                             <select
//                                 id="status"
//                                 name="status"
//                                 value={formData.status}
//                                 onChange={handleInputChange}
//                             >
//                                 <option value="">Select</option>
//                                 <option value="Active">Active</option>
//                                 <option value="Inactive">Inactive</option>
//                                 <option value="Pending">Pending</option>
//                                 <option value="Blacklisted">Blacklisted</option>
//                             </select>
//                         </div>

//                         <div className="form-actions">
//                             <button
//                                 type="button"
//                                 className="btn-reset"
//                                 onClick={() => { handleReset(); }}
//                             >
//                                 Reset
//                             </button>
//                             <button
//                                 type="button"
//                                 className="btn-filter"
//                                 onClick={() => { handleFilter(); }}
//                             >
//                                 Filter
//                             </button>
//                         </div>
//                     </div>
//                 </div>,
//                 document.body
//             ) : null}
//         </div>
//     )

//     return content
// }

// export default FilterDropdown
