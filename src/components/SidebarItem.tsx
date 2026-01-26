'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SidebarItemType } from '@/data/sidebarData'

interface SidebarItemProps extends SidebarItemType {}

export default function SidebarItem({ icon, label, href }: SidebarItemProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link href={href}>
      <div className={`sidebar-item ${isActive ? 'active' : 'inactive'}`}>
        <Image src={icon} alt={label} width={16} height={12.8} />
        <span>{label}</span>
      </div>
    </Link>
  )
}
