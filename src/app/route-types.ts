export type LayoutKind = 'public' | 'auth' | 'dashboard'
export type RoleKind = 'user' | 'admin' | 'both'

export interface JsonRoute {
  name: string
  path: string
  component: string
  title: string
  subtitle?: string
  layout: LayoutKind
  role?: RoleKind
  showInNav?: boolean
}
