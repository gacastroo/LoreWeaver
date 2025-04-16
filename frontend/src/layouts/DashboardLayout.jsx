import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

export default function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4 overflow-auto bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}
