// src/layout/DashboardLayout.tsx
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'
import {
  Menu as MenuIcon,
  LayoutDashboard,
  ShoppingBag,
  Settings,
  LogOut,
  Home,
  Users,
  Receipt,
  ChefHat,
  Percent,
  BarChart3,
  MapPin,
  Heart,
  Tags,
} from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { Button } from '../components/ui/button'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { logout } from '../features/auth/authSlice'

type Role = 'user' | 'admin'

const navByRole: Record<Role, Array<{ to: string; label: string; icon: React.ComponentType<any> }>> = {
  user: [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/orders/history', label: 'My Orders', icon: Receipt },
    { to: '/favorites', label: 'Favorites', icon: Heart },
    { to: '/addresses', label: 'Addresses', icon: MapPin },
    { to: '/menu', label: 'Browse Menu', icon: ShoppingBag },
    { to: '/settings', label: 'Settings', icon: Settings },
  ],
  admin: [
    { to: '/admin',            label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/categories', label: 'Category',  icon: Tags },
    { to: '/admin/menu',       label: 'Menu',      icon: ChefHat },
    { to: '/admin/orders',     label: 'Order',     icon: Receipt },
    { to: '/admin/reports',    label: 'Reports',   icon: BarChart3 },
  ],
}

export default function DashboardLayout({
  role,
  children,
  title,
  subtitle,
}: {
  role: Role
  children: React.ReactNode
  title?: string
  subtitle?: string
}) {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(s => s.auth)
  const [open, setOpen] = useState(false)
  const nav = navByRole[role]

  const Sidebar = () => (
    <aside className="hidden md:flex md:flex-col w-64 h-[calc(100vh)] sticky top-0 border-r bg-white/80 dark:bg-neutral-900/60 backdrop-blur">
      <div className="h-16 flex items-center justify-between px-3 border-b">
        <Link to="/" className="inline-flex items-center gap-2 font-semibold">
          <Home className="w-5 h-5" />
          <span>{role === 'admin' ? 'Admin' : 'Dashboard'}</span>
        </Link>
        <Button variant="ghost" size="icon" asChild>
          <Link to="/"><ShoppingBag className="w-5 h-5" /></Link>
        </Button>
      </div>
      <nav className="p-3 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition',
                isActive
                  ? 'bg-neutral-100 dark:bg-neutral-800 font-medium'
                  : 'text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto p-3 border-t">
        <div className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</div>
        <Button variant="outline" className="w-full" onClick={() => dispatch(logout())}>
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </aside>
  )

  return (
    <div className="min-h-dvh grid md:grid-cols-[16rem_auto]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Topbar + Drawer */}
      <div className="md:hidden">
        <div className="h-16 sticky top-0 z-40 border-b bg-white/80 dark:bg-neutral-900/60 backdrop-blur flex items-center px-3 justify-between">
          <div className="flex items-center gap-2">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button size="icon" variant="ghost">
                  <MenuIcon className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                <div className="h-16 flex items-center justify-between px-3 border-b">
                  <Link to="/" className="inline-flex items-center gap-2 font-semibold" onClick={() => setOpen(false)}>
                    <Home className="w-5 h-5" />
                    <span>{role === 'admin' ? 'Admin' : 'Dashboard'}</span>
                  </Link>
                </div>
                <nav className="p-3 space-y-1">
                  {nav.map(({ to, label, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'flex items-center gap-2 rounded-md px-3 py-2 text-sm transition',
                          isActive
                            ? 'bg-neutral-100 dark:bg-neutral-800 font-medium'
                            : 'text-muted-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800'
                        )
                      }
                    >
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </NavLink>
                  ))}
                </nav>
                <div className="mt-auto p-3 border-t">
                  <Button variant="outline" className="w-full" onClick={() => { setOpen(false); dispatch(logout()) }}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
            <Link to="/" className="inline-flex items-center gap-2 font-semibold">
              <Home className="w-5 h-5" />
              <span>{role === 'admin' ? 'Admin' : 'Dashboard'}</span>
            </Link>
          </div>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/"><ShoppingBag className="w-5 h-5" /></Link>
          </Button>
        </div>
      </div>

      {/* Main area */}
      <main className="min-h-dvh bg-neutral-50/60 dark:bg-neutral-900/30">
        <div className="p-4 md:p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
