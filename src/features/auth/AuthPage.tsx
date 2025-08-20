import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { HERO_SPLASH, LOGIN, SIGNUP } from '../../lib/assets'
import { motion } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { setToken, setUser } from './authSlice'
import StepSignupForm from './StepSignupForm'
import { login as loginApi } from './api'

type Mode = 'login' | 'signup'

function decodeJwt(token: string): any | null {
  try {
    const payloadB64 = token.split('.')[1]
    const json = atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(json)
  } catch {
    return null
  }
}

export default function AuthPage({ mode }: { mode: Mode }) {
  const isSignup = mode === 'signup'

  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const token = useAppSelector(s => s.auth.token)
  const user = useAppSelector(s => s.auth.user)

  // login form state (signup handled inside StepSignupForm)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (token && user) {
      navigate(user.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
    }
  }, [token, user, navigate])

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (!email.trim() || !password.trim()) {
      setError('Please enter email and password.')
      return
    }

    try {
      setLoading(true)
      const { access_token } = await loginApi(email.trim(), password)
      dispatch(setToken(access_token))

      const payload = decodeJwt(access_token) || {}
      const meta = payload?.user_metadata || {}

      const role = meta.userRole === 'Admin' ? 'admin' : 'user'
      const id = String(meta.id ?? payload.sub ?? '')
      const name = [meta.firstName, meta.lastName].filter(Boolean).join(' ') || undefined
      const finalEmail = meta.email || email.trim()

      dispatch(setUser({ id, email: finalEmail, name, role }))

      const from = (location.state as any)?.from?.pathname
      navigate(from || (role === 'admin' ? '/admin' : '/dashboard'), { replace: true })
    } catch {
      setError('Invalid email or password.')
    } finally {
      setLoading(false)
    }
  }

  // ---- UI (outer layout preserved) ----
  const mainImage = isSignup ? SIGNUP : LOGIN

  return (
    <Section className="relative">
      <Container className="relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* LEFT: headings + form (keep your wrapper) */}
          <div className="relative z-10">
            <div className="max-w-md">
              <div className="space-y-2">
                <h1 className="text-3xl font-semibold tracking-tight">
                  {isSignup ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="text-muted-foreground">
                  {isSignup
                    ? 'Verify your email, then finish your profile.'
                    : 'Enter your credentials to continue.'}
                </p>
              </div>

              <Separator className="my-6" />

              {/* ---- ONLY the inner form content is conditional ---- */}
              {isSignup ? (
                <StepSignupForm />
              ) : (
                <form className="grid gap-4" onSubmit={handleLoginSubmit}>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Your password"
                      className="h-11"
                    />
                  </div>

                  {error && (
                    <div className="text-sm text-red-600 bg-red-100/50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
                      {error}
                    </div>
                  )}

                  <Button type="submit" className="mt-2 h-11 bg-brand text-brand-fg" disabled={loading}>
                    {loading ? 'Signing in…' : 'Log in'}
                  </Button>

                  <p className="text-sm text-muted-foreground mt-2">
                    Don’t have an account?{' '}
                    <Link to="/signup" className="text-brand font-semibold">
                      Sign up
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: your image/illustration (unchanged) */}
          {/* RIGHT: hero plate with splashes peeking from both sides */}
          <div className="relative flex items-center justify-center min-h-[360px] overflow-visible">
            {/* Left splash */}
            <motion.img
              src={HERO_SPLASH}
              alt=""
              aria-hidden
              className="absolute pointer-events-none select-none
               left-[-90px] top-[-40px] w-[320px] opacity-90 z-0"
              initial={{ opacity: 0, y: -10, rotate: -10, scale: 0.96 }}
              animate={{ opacity: 0.9, y: 0, rotate: -6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            />

            {/* Right splash (mirrored) */}
            <motion.img
              src={HERO_SPLASH}
              alt=""
              aria-hidden
              className="absolute pointer-events-none select-none
               right-[-90px] bottom-[-40px] w-[360px] opacity-85 z-0"
              style={{ transform: 'scaleX(-1) rotate(10deg)' }}
              initial={{ opacity: 0, y: 10, rotate: 10, scale: 0.96 }}
              animate={{ opacity: 0.85, y: 0, rotate: 6, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            />

            {/* Plate / main hero image (stays on top) */}
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




