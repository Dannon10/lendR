import Image from 'next/image'
import './userStatCard.scss'

interface StatCardData {
    id: string
    label: string
    value: number
    icon: string
}

interface UserStatCardProps {
    data: StatCardData
}

export default function UserStatCard({ data }: UserStatCardProps) {
    return (
        <div className='stat-card'>
            <div className='stat-card-content'>
                    <Image src={data.icon} alt={data.label} width={40} height={40} className='stat-icon' />
                    <h3 className='stat-label'>{data.label.toLocaleUpperCase()}</h3>
                <span className='stat-value'>{data.value.toLocaleString()}</span>
            </div>
        </div>
    )
}
