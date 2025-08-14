import Container from '../../components/common/Container'
import Section from '../../components/common/Section'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HERO_SPLASH, LOGIN, SIGNUP } from '../../lib/assets'
import { useAppSelector } from '../../hooks/hooks'
import routes, { publicRoutes, privateRoutes } from '../../app/routes'
import { motion } from 'framer-motion'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5C17 16.7 14.8 18 12 18c-3.3 0-6-2.7-6-6s2.7-6 6-6c1.6 0 3 .6 4.1 1.6l2.9-2.9C17.4 2.6 14.9 1.5 12 1.5 6.8 1.5 2.5 5.8 2.5 11S6.8 20.5 12 20.5c5.2 0 9.5-3.8 9.5-9.5 0-.6-.1-1.3-.2-1.8H12z"/>
    </svg>
  )
}
function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="currentColor" d="M17.7 13.4c0 3.2 2.8 4.3 2.8 4.3s-2.2 6.2-5.3 6.2c-1.4 0-2.5-1-4-1-1.6 0-2.8 1-4.1 1C4 24 1 18.1 1 14c0-3.2 2-5 4-5 1.6 0 2.8 1 4.1 1 1.2 0 2.5-1 4.3-1 1 .1 3.3.3 4.3 2.1-3.9 2-3.3 6.3 0 7.3zM14.7 3.3C15.8 2 17.6 1.7 18.3 1c-.4 1.6-1.3 3.1-2.5 4.2-1 1-2.4 1.8-3.7 1.7.1-1.6.8-3.2 2.6-3.6z"/>
    </svg>
  )
}

export default function AuthPage({ mode }: { mode: 'login' | 'signup' }) {
  const isSignup = mode === 'signup'
  const mainImage = isSignup ? SIGNUP : LOGIN
  const [showPw, setShowPw] = useState(false)
  const { token } = useAppSelector((state) => state.auth)
  const navigate = useNavigate()

  // Redirect if already logged in
  if (token) {
    navigate('/dashboard')
    return null
  }

  return (
    <Section className="relative min-h-dvh py-10 md:py-16 overflow-hidden">
      {/* decorative splashes, pushed far behind */}
      <motion.img
        src={HERO_SPLASH}
        alt=""
        aria-hidden
        className="hidden md:block absolute top-0 left-0 w-[340px] md:w-[420px] opacity-60 -z-20 pointer-events-none select-none"
        style={{
          maskImage: 'radial-gradient(ellipse at 70% 55%, black 35%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 70% 55%, black 35%, transparent 70%)',
        }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0.7, y: 0 }} transition={{ duration: 0.6 }}
      />
      <motion.img
        src={HERO_SPLASH}
        alt=""
        aria-hidden
        className="hidden md:block absolute bottom-0 right-0 w-[340px] md:w-[420px] opacity-50 -z-20 pointer-events-none select-none"
        style={{ transform: 'scaleX(-1) rotate(10deg)' }}
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 0.6, y: 0 }} transition={{ duration: 0.6 }}
      />

      <Container>
        {/* glass card wrapper */}
        <div className="relative rounded-3xl overflow-hidden border bg-white/60 dark:bg-black/40 backdrop-blur-xl supports-[backdrop-filter]:bg-white/40 shadow-xl">
          <div className="grid lg:grid-cols-2 items-stretch min-h-[600px]">
            {/* left: form */}
            <div className="relative p-8 md:p-12 flex flex-col justify-center">
              {/* soft scrim for perfect readability */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
              <div className="max-w-xl w-full mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {isSignup ? 'Create your account' : 'Welcome back'}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {isSignup
                    ? 'Join us for exclusive deals and quick checkout.'
                    : 'Log in to manage reservations and orders.'}
                </p>

                <div className="my-6">
                  <Separator />
                </div>

                <form className="grid gap-4">
                  {isSignup && (
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5Zm0 2c-5.33 0-8 2.67-8 6v1h16v-1c0-3.33-2.67-6-8-6Z"/></svg>
                        <Input id="name" placeholder="Jane Doe" className="h-12 pl-9" />
                      </div>
                    </div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M12 13L2 8V6l10 5 10-5v2Z"/><path fill="currentColor" d="M2 8v10h20V8l-10 5Z"/></svg>
                      <Input id="email" type="email" placeholder="you@example.com" className="h-12 pl-9" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" viewBox="0 0 24 24" aria-hidden><path fill="currentColor" d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2Zm-6 0V7a2 2 0 0 1 4 0v2Z"/></svg>
                      <Input
                        id="password"
                        type={showPw ? 'text' : 'password'}
                        placeholder="••••••••"
                        className="h-12 pl-9 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
                      >
                        {showPw ? 'Hide' : 'Show'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <label className="inline-flex items-center gap-2">
                      <input type="checkbox" className="h-4 w-4 rounded border" />
                      Remember me
                    </label>
                    {!isSignup && (
                      <a className="text-brand hover:underline" href="#">
                        Forgot password?
                      </a>
                    )}
                  </div>

                  <Button className="bg-brand text-brand-fg h-12 text-base">
                    {isSignup ? 'Create account' : 'Log in'}
                  </Button>
                </form>
{/* 
                <p className="mt-6 text-sm text-muted-foreground">
                  {isSignup ? 'Already have an account?' : 'New here?'}{' '}
                  <Link to={isSignup ? routes.login : routes.signup} className="text-brand underline">
                    {isSignup ? 'Log in' : 'Create one'}
                  </Link>
                </p> */}

                {isSignup && (
                  <p className="mt-3 text-xs text-muted-foreground">
                    By creating an account, you agree to our Terms and Privacy Policy.
                  </p>
                )}
              </div>
            </div>

            {/* right: visual */}
            <div className="relative flex items-center justify-center min-h-[320px]">
              {/* decorative splashes behind image */}
              <motion.img
                src={HERO_SPLASH}
                alt=""
                aria-hidden
                className="absolute top-0 left-0 w-44 sm:w-56 -z-10 pointer-events-none select-none"
                initial={{ opacity: 0, y: -8, rotate: -6 }}
                animate={{ opacity: 0.9, y: 0, rotate: -4 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              />
              <motion.img
                src={HERO_SPLASH}
                alt=""
                aria-hidden
                className="absolute bottom-0 right-0 w-56 sm:w-72 -z-10 pointer-events-none select-none"
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
        </div>
      </Container>
    </Section>
  )
}
