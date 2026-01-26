'use client'

import './cardSkeleton.scss'

export default function CardSkeleton() {
  return (
    <div className='stat-card-skeleton'>
      <div className='skeleton-header'>
        <div className='skeleton-header-row'>
          <div className='skeleton skeleton-icon'></div>
          <div className='skeleton skeleton-title'></div>
        </div>
      </div>
      <div className='skeleton skeleton-value'></div>
    </div>
  )
}
