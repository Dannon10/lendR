import Image from 'next/image'

export default function FilterIcon() {
  return (
    <Image
      src="/filter.svg"
      alt="Filter"
      width={16}
      height={16}
      className="filter-icon"
    />
  )
}
