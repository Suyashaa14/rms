import { LayoutDashboard, Tags, ChefHat, Receipt, BarChart3 } from 'lucide-react'
import { Outlet, NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 ${isActive ? 'bg-gray-100 font-semibold' : ''}`

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r bg-white">
        <div className="p-4 border-b">
          <div className="text-xl font-bold">Admin</div>
          <div className="text-xs text-gray-500">Management</div>
        </div>

        <nav className="p-3 space-y-1">
          <NavLink to="/admin" className={linkClass}>
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </NavLink>

          <NavLink to="/admin/categories" className={linkClass}>
            <Tags className="w-4 h-4" />
            Category
          </NavLink>

          <NavLink to="/admin/menu" className={linkClass}>
            <ChefHat className="w-4 h-4" />
            Menu
          </NavLink>

          <NavLink to="/admin/orders" className={linkClass}>
            <Receipt className="w-4 h-4" />
            Order
          </NavLink>

          <NavLink to="/admin/reports" className={linkClass}>
            <BarChart3 className="w-4 h-4" />
            Reports
          </NavLink>
        </nav>
      </aside>

      <main className="flex-1 p-4 md:p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  )
}
