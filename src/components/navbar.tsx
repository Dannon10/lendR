import Image from 'next/image'
import './navbar.scss'

export default function navbar() {
    return (
        <nav className='navbar'>
            <div className='navbar-container'>
                <div className='navbar-left'>
                    <Image src="/lendsqr-logo.svg" alt="Logo" width={146} height={32} />
                    <div className='search-wrapper'>
                        <input type="text" placeholder='Search for anything' className='search-input'/>
                        <div className='search-icon-wrapper'>
                            <Image src="/search.svg" alt="Search" width={20} height={20} className='search-icon' />
                        </div>
                    </div>
                </div>
                <div className='navbar-right'>
                    <a href="#" className='docs-link'>Docs</a>
                    <Image src="/notification-icon.svg" alt="Notifications" width={24} height={24} />
                    <Image src="/profile-pic.png" alt="Profile Picture" width={40} height={40} className='profile-pic' />
                    <span className='profile-name'>Adedeji</span>
                    <Image src="/dropdown.svg" alt="dropdown" width={20} height={20} />
                </div>
            </div>
        </nav>
    )
}
