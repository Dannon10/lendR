'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarItemType } from '@/data/sidebarData'

interface SidebarItemProps extends SidebarItemType {}

export default function SidebarItem({ icon, label, href }: SidebarItemProps) {
  const pathname = usePathname()
  let isActive = false
  if (href === '/') {
    isActive = pathname === '/'
  } else if (pathname) {
    isActive = pathname === href || pathname.startsWith(href)
  }

  return (
    <Link href={href}>
      <div className={`sidebar-item ${isActive ? 'active' : 'inactive'}`}>
        <Image src={icon} alt={label} width={16} height={12.8} />
        <span>{label}</span>
      </div>
    </Link>
  )
}
