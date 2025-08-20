import React, { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Label } from '../../components/ui/label'
import { Button } from '../../components/ui/button'
import { Separator } from '../../components/ui/separator'
import { Link, useNavigate } from 'react-router-dom'
import OtpInput from './OtpInput'
import { onboard, sendCode, verifyCode, type OnboardPayload } from './api'

type Step = 'EMAIL' | 'OTP' | 'PROFILE'
const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

export default function StepSignupForm() {
  const navigate = useNavigate()

  // step control
  const [step, setStep] = useState<Step>('EMAIL')

  // step 1
  const [email, setEmail] = useState('')
  const [sendLoading, setSendLoading] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)

  // step 2
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const otpString = useMemo(() => otp.join(''), [otp])
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [userId, setUserId] = useState<number | null>(null)

  // step 3
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName]   = useState('')
  const [password, setPassword]   = useState('')
  const [phone, setPhone]         = useState('')
  const [address, setAddress]     = useState('')
  const [createLoading, setCreateLoading] = useState(false)
  const [createError, setCreateError]     = useState<string | null>(null)

  async function onSendCode(e?: React.FormEvent) {
    e?.preventDefault()
    setSendError(null)
    if (!isValidEmail(email)) return setSendError('Please enter a valid email.')

    try {
      setSendLoading(true)
      const res = await sendCode(email.trim())
      if (res?.otpCode) {
        const code = String(res.otpCode).padStart(6, '0').slice(0, 6)
        setOtp(code.split(''))
      } else {
        setOtp(['', '', '', '', '', ''])
      }
      setStep('OTP')
    } catch (err: any) {
      setSendError(err?.message || 'Failed to send code.')
    } finally {
      setSendLoading(false)
    }
  }

  async function onVerify(e: React.FormEvent) {
    e.preventDefault()
    setVerifyError(null)
    if (otpString.length !== 6) return setVerifyError('Please enter the 6-digit code.')
    try {
      setVerifyLoading(true)
      const res = await verifyCode(email.trim(), otpString)
      if (res?.verification && typeof res.userId === 'number') {
        setUserId(res.userId)
        setStep('PROFILE')
      } else setVerifyError('Invalid or expired code.')
    } catch (err: any) {
      setVerifyError(err?.message || 'Failed to verify code.')
    } finally {
      setVerifyLoading(false)
    }
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreateError(null)
    if (!userId) return setCreateError('Verification missing. Please verify your email first.')
    if (!firstName.trim()) return setCreateError('First name is required.')
    if (!lastName.trim())  return setCreateError('Last name is required.')
    if (!password || password.length < 6) return setCreateError('Password must be at least 6 characters.')

    const payload: OnboardPayload = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password,
      ...(phone.trim() ? { phone: phone.trim() } : {}),
      ...(address.trim() ? { address: address.trim() } : {}),
    }

    try {
      setCreateLoading(true)
      await onboard(userId, payload)
      navigate('/login', { replace: true })
    } catch (err: any) {
      setCreateError(err?.message || 'Failed to create account.')
    } finally {
      setCreateLoading(false)
    }
  }

  const Back = ({ to }: { to: Step }) => (
    <Button type="button" variant="outline" onClick={() => setStep(to)} className="h-11">
      ← Back
    </Button>
  )

  return (
    <>
      {step === 'EMAIL' && (
        <form className="grid gap-4" onSubmit={onSendCode}>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="h-11"
              required
            />
          </div>
          {sendError && (
            <div className="text-sm text-red-600 bg-red-100/50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
              {sendError}
            </div>
          )}
          <Button type="submit" disabled={!isValidEmail(email) || sendLoading} className="h-11 bg-brand text-brand-fg">
            {sendLoading ? 'Sending…' : 'Send code'}
          </Button>
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-semibold">Log in</Link>
          </p>
        </form>
      )}

      {step === 'OTP' && (
        <form className="grid gap-4" onSubmit={onVerify}>
          <div className="grid gap-2">
            <Label>Enter the 6-digit code</Label>
            <div className="text-sm text-muted-foreground">{email}</div>
            <OtpInput value={otp} onChange={setOtp} autoFocus />
          </div>
          {verifyError && (
            <div className="text-sm text-red-600 bg-red-100/50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
              {verifyError}
            </div>
          )}
          <div className="flex items-center gap-2">
            <Back to="EMAIL" />
            <Button type="submit" disabled={otpString.length !== 6 || verifyLoading} className="h-11 bg-brand text-brand-fg">
              {verifyLoading ? 'Verifying…' : 'Verify'}
            </Button>
            <Button type="button" variant="ghost" onClick={() => onSendCode()} className="h-11 underline px-2">
              Resend code
            </Button>
          </div>
        </form>
      )}

      {step === 'PROFILE' && (
        <form className="grid gap-4" onSubmit={onCreate}>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} className="h-11" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} className="h-11" required />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" value={phone} onChange={e => setPhone(e.target.value)} className="h-11" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="address">Address (optional)</Label>
              <Input id="address" value={address} onChange={e => setAddress(e.target.value)} className="h-11" />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="At least 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="h-11"
              required
            />
          </div>

          {createError && (
            <div className="text-sm text-red-600 bg-red-100/50 dark:bg-red-900/30 border border-red-200 dark:border-red-900 rounded-lg p-3">
              {createError}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Back to="OTP" />
            <Button type="submit" disabled={createLoading} className="h-11 bg-brand text-brand-fg">
              {createLoading ? 'Creating…' : 'Create account'}
            </Button>
          </div>

          <div className="my-4"><Separator /></div>

          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link to="/login" className="text-brand font-semibold">Log in</Link>
          </p>
        </form>
      )}
    </>
  )
}
