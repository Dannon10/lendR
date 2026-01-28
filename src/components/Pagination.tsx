'use client'
import Image from 'next/image'
import './pagination.scss'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}: PaginationProps) {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const generatePageNumbers = () => {
    const pages: (number | string)[] = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      // Calculate range around current page
      let startPage = Math.max(2, currentPage - 1)
      let endPage = Math.min(totalPages - 1, currentPage + 1)

      if (currentPage <= 2) {
        endPage = 4
      } else if (currentPage >= totalPages - 1) {
        startPage = totalPages - 3
      }

      if (startPage > 2) {
        pages.push('...')
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }

      if (endPage < totalPages - 1) {
        pages.push('...')
      }

      // Always show last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className='pagination-container'>
      <div className='pagination-info'>
        Showing <span className='show'>
          {startItem}
          <Image src='/chevron down.svg' alt='dash' width={14} height={14} />
          </span>
           of {totalItems}
      </div>

      <div className='pagination-buttons'>
        <button
          className='pagination-btn prev-btn'
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Image src='/prev btn.svg' alt='Previous' width={24} height={24} />
        </button>

        {generatePageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-btn ${
              page === currentPage ? 'active' : ''
            } ${page === '...' ? 'dots' : ''}`}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            disabled={page === '...' || page === currentPage}
          >
            {page}
          </button>
        ))}

        <button
          className='pagination-btn next-btn'
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Image src='/next btn.svg' alt='Previous' width={24} height={24} />
        </button>
      </div>
    </div>
  )
}
