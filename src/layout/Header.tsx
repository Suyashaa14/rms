// src/layout/Header.tsx
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { useState, useMemo } from 'react'
import { cn } from '../lib/cn'
import { Menu } from 'lucide-react'
import Container from '../components/common/Container'
import { useAppSelector } from '../hooks/hooks'
import { publicRoutes } from '../app/routes'

const isAuthPath = (path: string) => path === '/login' || path === '/signup'

export default function Header() {
  const { pathname } = useLocation()
  const { token } = useAppSelector((s: { auth: any }) => s.auth)
  const [open, setOpen] = useState(false)

  // Always use public routes for the main nav, exclude auth pages
  const navRoutes = useMemo(
    () => publicRoutes.filter(r => !isAuthPath(r.path)),
    []
  )

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/40 border-b">
      <Container className="flex items-center justify-between h-16">
        <Link to="/" className="font-black text-xl tracking-tight">
          <span className="text-brand">Bites</span> Restaurant
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navRoutes.map(({ path, title, name }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                cn(
                  'text-sm font-medium transition-colors hover:text-brand',
                  (isActive || pathname === path) && 'text-brand'
                )
              }
            >
              {title || name}
            </NavLink>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden md:flex items-center gap-2">
          {!token && (
            <>
              <Button variant="ghost" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-brand text-brand-fg" asChild>
                <Link to="/signup">Sign up</Link>
              </Button>
            </>
          )}
          {/* When logged in, show nothing in the header (no Dashboard link) */}
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-72">
            <div className="py-6 flex flex-col gap-4">
              {navRoutes.map(({ path, title, name }) => (
                <NavLink
                  key={path}
                  to={path}
                  onClick={() => setOpen(false)}
                  className={cn('text-lg', pathname === path && 'text-brand')}
                >
                  {title || name}
                </NavLink>
              ))}

              {!token && (
                <>
                  <Button asChild onClick={() => setOpen(false)}>
                    <Link to="/login">Log in</Link>
                  </Button>
                  <Button className="bg-brand text-brand-fg" asChild onClick={() => setOpen(false)}>
                    <Link to="/signup">Sign up</Link>
                  </Button>
                </>
              )}
              {/* When logged in, show nothing in mobile menu */}
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
