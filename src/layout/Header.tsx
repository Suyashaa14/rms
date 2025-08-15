// src/layout/Header.tsx
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { Menu, ShoppingCart } from 'lucide-react'
import Container from '../components/common/Container'
import { publicRoutes } from '../app/routes'
import { useAppSelector } from '../hooks/hooks'
import { selectCart } from '../store/cartSlice'

const isAuthPath = (path: string) => path === '/login' || path === '/signup'

export default function Header() {
  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { lines } = useAppSelector(selectCart)

  // Public nav links (exclude auth pages)
  const navRoutes = useMemo(() => publicRoutes.filter(r => !isAuthPath(r.path)), [])
  const cartCount = lines.length

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/40 border-b">
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
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

        {/* Right actions (desktop) */}
        <div className="hidden md:flex items-center gap-3">
          {/* Cart (always visible) */}
          <Link
            to="/cart"
            className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            aria-label="Open cart"
          >
            <ShoppingCart className="w-5 h-5" />
            <span className="text-sm font-medium">Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 text-xs bg-brand text-brand-fg px-1.5 py-0.5 rounded-full leading-none">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth links: always visible in public header */}
          <Button variant="ghost" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button className="bg-brand text-brand-fg" asChild>
            <Link to="/signup">Sign up</Link>
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          {/* Mobile sheet */}
          <SheetContent side="right" className="w-72">
            <div className="py-6 flex flex-col gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
                aria-label="Open cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="ml-auto text-xs bg-brand text-brand-fg px-1.5 py-0.5 rounded-full leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Nav links */}
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

              {/* Auth links (always visible) */}
              <Button asChild onClick={() => setOpen(false)}>
                <Link to="/login">Log in</Link>
              </Button>
              <Button className="bg-brand text-brand-fg" asChild onClick={() => setOpen(false)}>
                <Link to="/signup">Sign up</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
