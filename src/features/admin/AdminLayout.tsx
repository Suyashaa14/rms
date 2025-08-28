import { HomeIcon, ListIcon, PlusIcon } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''}`

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-white">
        <div className="p-4 border-b">
          <div className="text-xl font-bold">Admin Dashboard</div>
          <div className="text-xs text-gray-500">Manage catalog</div>
        </div>
        <nav className="p-3 space-y-1">
          <NavLink to="/admin" className={linkClass}><HomeIcon className="w-4 h-4" /> Overview</NavLink>
          <div className="text-xs uppercase text-gray-400 mt-4 mb-1 px-2">Catalog</div>
          <NavLink to="/admin/categories" className={linkClass}><ListIcon className="w-4 h-4" /> Categories</NavLink>
          <NavLink to="/admin/addons" className={linkClass}><PlusIcon className="w-4 h-4" /> Addons</NavLink>
          <NavLink to="/admin/menus" className={linkClass}><ListIcon className="w-4 h-4" /> Menus</NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
