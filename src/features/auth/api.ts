import api from '../../lib/axios'

// ---------- Types ----------
export type SendCodeResponse = { otpCode?: number }
export type VerifyCodeResponse = {
  userId: number
  message: string
  email: string
  verification: boolean
}
export type OnboardPayload = {
  firstName: string
  lastName: string
  password: string
  phone?: string
  address?: string
}
export type OnboardResponse = {
  id: number
  firstName: string
  lastName: string
  email: string
  userRole: string
  address: string | null
  phone: string | null
  status: string
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

// NOTE: your axios baseURL is already ".../api", so we call "/auth/..." here.
export async function sendCode(email: string) {
  const { data } = await api.post<SendCodeResponse>('/auth/code', { email })
  return data
}
export async function verifyCode(email: string, otpCode: string) {
  const { data } = await api.post<VerifyCodeResponse>('/auth/verify-code', { email, otpCode })
  return data
}
export async function onboard(userId: number, payload: OnboardPayload) {
  const { data } = await api.put<OnboardResponse>(`/auth/onboard/${userId}`, payload)
  return data
}
export async function login(email: string, password: string) {
  const { data } = await api.post<{ access_token: string }>('/auth/login', { email, password })
  return data
}
