'use client'

import './userDetailsSkeleton.scss'

export default function UserDetailsSkeleton() {
  return (
    <div className="user-details-skeleton">
      {/* Header Section */}
      <div className="skeleton-header">
        <div className="skeleton-button skeleton-button-small"></div>
        <div className="skeleton-button-group">
          <div className="skeleton-button"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>

      {/* Profile Card */}
      <div className="skeleton-profile-card">
        <div className="skeleton-profile-header">
          {/* Avatar */}
          <div className="skeleton-avatar"></div>

          {/* Profile Identity */}
          <div className="skeleton-identity">
            <div className="skeleton-text skeleton-text-lg"></div>
            <div className="skeleton-text skeleton-text-sm"></div>
          </div>

          <div className="skeleton-divider"></div>

          {/* Tier */}
          <div className="skeleton-tier">
            <div className="skeleton-text skeleton-text-sm"></div>
            <div className="skeleton-stars">
              {[1, 2, 3].map((i) => (
                <div key={i} className="skeleton-star"></div>
              ))}
            </div>
          </div>

          <div className="skeleton-divider"></div>

          {/* Bank Info */}
          <div className="skeleton-bank">
            <div className="skeleton-text skeleton-text-md"></div>
            <div className="skeleton-text skeleton-text-sm"></div>
          </div>
        </div>

        {/* Tabs */}
        <div className="skeleton-tabs">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="skeleton-tab"></div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div className="skeleton-details-head">
        {[1, 2, 3, 4].map((section) => (
          <section key={section} className="skeleton-details-section">
            <div className="skeleton-text skeleton-text-md"></div>
            <div className="skeleton-details-content">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="skeleton-detail-item">
                  <div className="skeleton-text skeleton-text-sm"></div>
                  <div className="skeleton-text skeleton-text-sm"></div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
