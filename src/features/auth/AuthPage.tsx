import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { HERO_SPLASH, LOGIN, SIGNUP } from '../../lib/assets'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setToken, setUser } from './authSlice'

type Mode = 'login' | 'signup'

export default function AuthPage({ mode }: { mode: Mode }) {
  const isSignup = mode === 'signup'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  const { token, user } = useAppSelector(s => s.auth)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation() as any
  const from: string | undefined = location?.state?.from?.pathname

  // If already logged in, bounce to role dashboard
  useEffect(() => {
    if (token && user?.role) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
    }
  }, [token, user, navigate])

  const mainImage = useMemo(() => (isSignup ? SIGNUP : LOGIN), [isSignup])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // ADMIN: static creds
    if (!isSignup && email.trim() === 'admin' && password === 'admin') {
      dispatch(setUser({ id: 'admin', email: 'admin', role: 'admin', name: 'Admin' }))
      dispatch(setToken('admin-token'))
      navigate('/admin', { replace: true })
      return
    }

    // USERS stored in localStorage for MVP
    const key = 'users'
    const users: Array<{ id: string; name?: string; email: string; password: string }> =
      JSON.parse(localStorage.getItem(key) || '[]')

    if (isSignup) {
      if (!email.trim() || !password.trim() || !name.trim()) {
        setError('Please fill all fields.')
        return
      }
      if (users.find(u => u.email === email.trim())) {
        setError('Email already registered. Please log in.')
        return
      }
      const u = { id: String(Date.now()), name: name.trim(), email: email.trim(), password }
      users.push(u)
      localStorage.setItem(key, JSON.stringify(users))
      // Auto-login after signup
      dispatch(setUser({ id: u.id, email: u.email, name: u.name, role: 'user' }))
      dispatch(setToken('user-token'))
      navigate('/dashboard', { replace: true })
      return
    } else {
      // LOGIN as user
      const u = users.find(u => u.email === email.trim() && u.password === password)
      if (!u) {
        setError('Invalid credentials.')
        return
      }
      dispatch(setUser({ id: u.id, email: u.email, name: u.name, role: 'user' }))
      dispatch(setToken('user-token'))
      // Go back where we came from (e.g., /checkout) or to dashboard
      navigate(from || '/dashboard', { replace: true })
      return
    }
  }

  return (
    <Section className="relative min-h-dvh py-10 md:py-16 overflow-hidden">
      <motion.img
        src={HERO_SPLASH}
        alt=""
        aria-hidden
        className="pointer-events-none select-none absolute -top-24 -left-24 w-[420px] opacity-50 -z-10"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 0.7 }}
      />
      <Container>
        <div className="grid md:grid-cols-2 gap-8 rounded-3xl border bg-white/80 dark:bg-neutral-900/60 backdrop-blur overflow-hidden">
          {/* Left: form */}
          <div className="relative p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-xl w-full mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold">
                {isSignup ? 'Create your account' : 'Welcome back'}
              </h1>
              <p className="mt-2 text-muted-foreground">
                {isSignup
                  ? 'Join us for exclusive deals and quick checkout.'
                  : 'Log in to manage orders and track delivery.'}
              </p>

              <div className="my-6"><Separator /></div>

              {error && (
                <div className="mb-4 text-sm text-red-600 bg-red-100/50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                  {error}
                </div>
              )}

              <form className="grid gap-4" onSubmit={handleSubmit}>
                {isSignup && (
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={name} onChange={e => setName(e.target.value)} placeholder="Jane Doe" className="h-11" />
                  </div>
                )}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder={isSignup ? "you@example.com" : "admin or you@example.com"} className="h-11" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder={isSignup ? "Create a password" : "Your password"} className="h-11" />
                </div>

                <Button type="submit" className="mt-2 h-11 bg-brand text-brand-fg">
                  {isSignup ? 'Create account' : 'Log in'}
                </Button>

                {!isSignup ? (
                  <p className="text-sm text-muted-foreground mt-2">
                    Don’t have an account?{" "}
                    <Link to="/signup" className="text-brand font-semibold">Sign up</Link>
                  </p>
                ) : (
                  <p className="text-sm text-muted-foreground mt-2">
                    Already have an account?{" "}
                    <Link to="/login" className="text-brand font-semibold">Log in</Link>
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Right: visuals */}
          <div className="relative flex items-center justify-center min-h-[320px]">
            <motion.img
              src={HERO_SPLASH}
              alt=""
              aria-hidden
              className="absolute top-0 left-0 w-56 -z-10 pointer-events-none select-none"
              initial={{ opacity: 0, y: -8, rotate: -6 }}
              animate={{ opacity: 0.9, y: 0, rotate: -4 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />
            <motion.img
              src={HERO_SPLASH}
              alt=""
              aria-hidden
              className="absolute bottom-0 right-0 w-72 -z-10 pointer-events-none select-none"
              style={{ transform: 'scaleX(-1) rotate(12deg)' }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />
            <motion.img
              src={mainImage}
              alt={isSignup ? 'Signup' : 'Login'}
              className="relative z-10 w-full max-w-[520px] object-contain drop-shadow-2xl mx-auto my-10"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            />
          </div>
        </div>
      </Container>
    </Section>
  )
}
