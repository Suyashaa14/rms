// src/layout/DashboardLayout.tsx
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { cn } from '../lib/cn'
import { Menu, LayoutDashboard, ShoppingBag, Settings, LogOut, Home, Users, Receipt, ChefHat, Percent, BarChart3, MapPin, Heart } from 'lucide-react'
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
    { to: '/admin', label: 'Admin Home', icon: LayoutDashboard },
    { to: '/admin/orders', label: 'Orders Queue', icon: Receipt },
    { to: '/admin/menu', label: 'Menu Manager', icon: ChefHat },
    { to: '/admin/coupons', label: 'Coupons', icon: Percent },
    { to: '/admin/users', label: 'Customers', icon: Users },
    { to: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
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
    <aside className="hidden md:flex md:flex-col w-64 h-[calc(100vh-0px)] sticky top-0 border-r bg-white/80 dark:bg-neutral-900/60 backdrop-blur">
      <div className="h-16 flex items-center px-5 border-b">
        <Link to="/" className="font-extrabold text-lg">
          <span className="text-brand">Bites</span> {role === 'admin' ? 'Admin' : 'Account'}
        </Link>
      </div>
      <nav className="flex-1 p-3 space-y-1">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition',
                isActive
                  ? 'bg-brand text-brand-fg'
                  : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
              )
            }
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-3 border-t">
        <div className="px-3 text-xs text-muted-foreground mb-2">{user?.email}</div>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => dispatch(logout())}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
        <Link to="/" className="mt-2 block text-center text-xs text-muted-foreground hover:underline">
          <Home className="inline w-3.5 h-3.5 mr-1" />
          Back to site
        </Link>
      </div>
    </aside>
  )

  return (
    <div className="min-h-dvh grid md:grid-cols-[16rem_auto]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <div className="h-16 sticky top-0 z-40 border-b bg-white/90 dark:bg-neutral-900/60 backdrop-blur flex items-center px-3 justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <Home className="w-5 h-5" />
            </Link>
          </Button>
          <div className="font-bold">{role === 'admin' ? 'Admin' : 'Dashboard'}</div>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="h-16 flex items-center px-5 border-b font-bold">
                <span className="text-brand">Bites</span> {role === 'admin' ? 'Admin' : 'Account'}
              </div>
              <nav className="p-3 space-y-1">
                {nav.map(({ to, label, icon: Icon }) => (
                  <NavLink
                    key={to}
                    to={to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition',
                        isActive
                          ? 'bg-brand text-brand-fg'
                          : 'hover:bg-neutral-100 dark:hover:bg-neutral-800'
                      )
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </NavLink>
                ))}
              </nav>
              <div className="p-3 border-t">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => { setOpen(false); dispatch(logout()) }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Main content */}
      <div className="p-4 md:p-8">
        {(title || subtitle) && (
          <div className="mb-6">
            {title && <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">{title}</h1>}
            {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
          </div>
        )}
        <div className="rounded-2xl border bg-white/80 dark:bg-neutral-900/60 backdrop-blur p-4 md:p-6">
          {children}
        </div>
      </div>
    </div>
  )
}
