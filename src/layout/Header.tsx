import { Link, NavLink, useLocation } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../components/ui/sheet'
import { useEffect, useMemo, useState } from 'react'
import { cn } from '../lib/cn'
import { Menu, ShoppingCart } from 'lucide-react'
import Container from '../components/common/Container'
import { publicRoutes } from '../app/routes'
import { useAppSelector } from '../hooks/hooks'
import { selectCart } from '../store/cartSlice'
import { Button } from '../components/ui/button'

const isAuthPath = (path: string) => path === '/login' || path === '/signup'

export default function Header() {
  const auth = useAppSelector((s) => s.auth)

  const { pathname } = useLocation()
  const [open, setOpen] = useState(false)
  const { lines } = useAppSelector(selectCart)
  const cartCount = lines.length

  const navRoutes = useMemo(() => publicRoutes.filter(r => !isAuthPath(r.path)), [])

  const onHome = pathname === '/'
  const [atTop, setAtTop] = useState(true)
  useEffect(() => {
    if (!onHome) { setAtTop(false); return }
    const onScroll = () => setAtTop(window.scrollY < 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onHome])

  const overlay = onHome && atTop

  const chipBase =
    'relative inline-flex items-center gap-2 rounded-xl px-3 py-2 transition'
  const chipHome = 'text-white hover:bg-white/10'
  const chipDefault = 'hover:bg-neutral-100 dark:hover:bg-neutral-800'

  return (
    <header
      className={cn(
        overlay
          ? 'absolute top-0 left-0 w-full z-50 bg-transparent border-transparent'
          : 'sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-black/40 border-b'
      )}
    >
      <Container className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          to="/"
          className={cn(
            'font-black text-xl tracking-tight transition-colors',
            overlay ? 'text-white' : 'text-foreground'
          )}
        >
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
                  'text-sm font-medium transition-colors underline-offset-4 hover:underline',
                  overlay ? 'text-white/90 hover:text-white' : 'text-foreground/80',
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
          {/* Cart */}
          <Link
            to="/cart"
            className={cn(chipBase, overlay ? chipHome : chipDefault)}
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

          {/* Login / Sign up styled like Cart */}
          {/* Right side actions */}
          {auth?.user ? (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/orders/history" className={cn(chipBase, overlay ? chipHome : chipDefault)}>
                <span className="text-sm font-medium">Order History</span>
              </Link>
              <button
                onClick={() => window.location.assign('/settings')}
                className={cn(chipBase, overlay ? chipHome : chipDefault)}
              >
                <span className="text-sm font-medium">{auth.user.name || 'Account'}</span>
              </button>
              <button
                onClick={() => { localStorage.clear(); window.location.assign('/'); }}
                className={cn(chipBase, overlay ? chipHome : chipDefault)}
              >
                <span className="text-sm font-medium">Log out</span>
              </button>
            </div>  
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link to="/login" state={{ from: { pathname } }} className={cn(chipBase, overlay ? chipHome : chipDefault)}>
                <span className="text-sm font-medium">Log in</span>
              </Link>
              <Link to="/signup" className={cn(chipBase, overlay ? chipHome : chipDefault)}>
                <span className="text-sm font-medium">Sign up</span>
              </Link>
            </div>
          )}

        </div>

        {/* Mobile menu trigger */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant={overlay ? 'outline' : 'ghost'}
              size="icon"
              className={cn('md:hidden', overlay && 'border-white text-white hover:bg-white/10')}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>

          {/* Mobile sheet */}
          <SheetContent side="right" className="w-72">
            <div className="py-6 flex flex-col gap-4">
              <Link
                to="/cart"
                onClick={() => setOpen(false)}
                className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 border hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="ml-auto text-xs bg-brand text-brand-fg px-1.5 py-0.5 rounded-full leading-none">
                    {cartCount}
                  </span>
                )}
              </Link>

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

              {/* Mobile auth links */}
              {/* Mobile auth links */}
              {auth?.user ? (
                <>
                  <Link to="/orders/history" onClick={() => setOpen(false)} className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">Order History</Link>
                  <Link to="/settings" onClick={() => setOpen(false)} className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">Account</Link>
                  <button
                    onClick={() => { setOpen(false); localStorage.clear(); window.location.assign('/'); }}
                    className="text-left px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                    Log in
                  </Link>
                  <Link to="/signup" onClick={() => setOpen(false)} className="px-3 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition">
                    Sign up
                  </Link>
                </>
              )}

            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  )
}
