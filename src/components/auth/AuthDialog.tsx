import type { Dispatch, SetStateAction } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export default function AuthDialog({ mode, setMode }: { mode: 'login'|'signup', setMode: Dispatch<SetStateAction<'login'|'signup'>> }) {
  const isSignup = mode === 'signup'
  return (
    <div className="grid md:grid-cols-2">
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold">{isSignup ? 'Create your account' : 'Welcome back'}</h3>
        <p className="text-sm text-muted-foreground mb-6">{isSignup ? 'Join us for exclusive deals and quick checkout.' : 'Log in to manage reservations and orders.'}</p>
        <div className="grid gap-4">
          {isSignup && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Jane Doe" />
            </div>
          )}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
          <Button className="bg-brand text-brand-fg">{isSignup ? 'Sign up' : 'Log in'}</Button>
          <p className="text-xs text-muted-foreground">
            {isSignup ? 'Already have an account?' : "New here?"}{' '}
            <button className="text-brand underline" onClick={() => setMode(isSignup ? 'login' : 'signup')}>
              {isSignup ? 'Log in' : 'Create one'}
            </button>
          </p>
        </div>
      </div>
      <div className="hidden md:block relative">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" alt="Delicious food" className="h-full w-full object-cover" />
      </div>
    </div>
  )
}