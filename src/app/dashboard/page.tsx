import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import './dashboard.scss'

export default function page() {
  return (
    <div className='dashboard-layout'>
        <Navbar />
        <div className='dashboard-content'>
          <Sidebar />
          <div className='dashboard-main'>
            <main className=''>
              {/* Dashboard content goes here */}
            </main>
          </div>
        </div>
    </div>
  )
}
