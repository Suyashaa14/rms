import React, { Suspense } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooks'
import Loader from '../components/common/Loader'
import NotFound from '../components/common/NotFound'
import PublicLayout from '../layout/PublicLayout'
import DashboardLayout from '../layout/DashboardLayout'

import { publicRoutesConfig, privateRoutesConfig, protectedRoutesConfig } from './routeConfig'
import { componentMap } from './routeComponents'

export interface AppRoute {
  name: string
  path: string
  Component: React.ComponentType
  title: string
  isPrivate: boolean
}

// Only the public routes that should appear in the header nav
export const publicRoutes: AppRoute[] = publicRoutesConfig
  .filter(r => r.showInNav)
  .map(r => ({
    name: r.name,
    path: r.path,
    Component: (componentMap[r.component] ?? (() => null)) as React.ComponentType,
    title: r.title,
    isPrivate: false,
  }))

// Minimal Auth layout (no header/footer)
const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-dvh flex items-center justify-center bg-background">{children}</div>
)

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector(s => s.auth)
  const location = useLocation()
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />
  return <>{children}</>
}

const RequireRole: React.FC<{ role: 'admin' | 'user'; children: React.ReactNode }> = ({ role, children }) => {
  const { token, user } = useAppSelector(s => s.auth)
  if (!token) return <Navigate to="/login" replace />
  if (!user || user.role !== role) return <Navigate to="/" replace />
  return <>{children}</>
}

const AppRoutes: React.FC = () => {
  const { user } = useAppSelector(s => s.auth)

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC pages (header + footer) */}
        {publicRoutesConfig.map(({ name, path, component, layout }) => {
          const Component = componentMap[component] as React.ComponentType
          const isAuth = layout === 'auth' || path === '/login' || path === '/signup'
          if (isAuth) {
            return (
              <Route
                key={name}
                path={path}
                element={
                  <AuthLayout>
                    <Component />
                  </AuthLayout>
                }
              />
            )
          }
          return (
            <Route
              key={name}
              path={path}
              element={
                <PublicLayout>
                  <Component />
                </PublicLayout>
              }
            />
          )
        })}

        {/* PROTECTED pages (auth required, public chrome) */}
        {protectedRoutesConfig.map(({ name, path, component }) => {
          const Component = componentMap[component] as React.ComponentType
          return (
            <Route
              key={name}
              path={path}
              element={
                <RequireAuth>
                  <PublicLayout>
                    <Component />
                  </PublicLayout>
                </RequireAuth>
              }
            />
          )
        })}

        {/* USER dashboard */}
        {privateRoutesConfig.filter(r => r.role === 'user').map(({ name, path, component, title, subtitle }) => {
          const Component = componentMap[component] as React.ComponentType
          return (
            <Route
              key={name}
              path={path}
              element={
                <RequireRole role="user">
                <PublicLayout>
                  <Component />
                </PublicLayout>
              </RequireRole>
              
              }
            />
          )
        })}

        {/* SETTINGS (both roles) */}
        {privateRoutesConfig.filter(r => r.role === 'both').map(({ name, path, component, title }) => {
  const Component = componentMap[component] as React.ComponentType
  const role = user?.role === 'admin' ? 'admin' : 'user'
  return (
    <Route
      key={name}
      path={path}
      element={
        <RequireAuth>
          {role === 'admin' ? (
            <DashboardLayout role="admin" title={title}>
              <Component />
            </DashboardLayout>
          ) : (
            <PublicLayout>
              <Component />
            </PublicLayout>
          )}
        </RequireAuth>
      }
    />
  )
})}


        {/* ADMIN dashboard */}
        {privateRoutesConfig.filter(r => r.role === 'admin').map(({ name, path, component, title, subtitle }) => {
          const Component = componentMap[component] as React.ComponentType
          return (
            <Route
              key={name}
              path={path}
              element={
                <RequireRole role="admin">
                  <DashboardLayout role="admin" title={title} subtitle={subtitle}>
                    <Component />
                  </DashboardLayout>
                </RequireRole>
              }
            />
          )
        })}

        {/* 404 (public chrome) */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes