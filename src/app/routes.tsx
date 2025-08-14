// src/app/routes.tsx
import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import NotFound from '../components/common/NotFound'
import { useAppSelector } from '../hooks/hooks'
import Loader from '../components/common/Loader'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import '../index.css'

export interface AppRoute {
  name: string
  path: string
  Component: React.ComponentType
  title: string
  isPrivate: boolean
}

export const publicRoutes: AppRoute[] = [
  {
    name: 'Home',
    path: '/',
    Component: lazy(() => import('../features/home/HomePage')),
    title: 'Home',
    isPrivate: false,
  },
  {
    name: 'Menu',
    path: '/menu',
    Component: lazy(() => import('../features/menu/MenuPage')),
    title: 'Menu',
    isPrivate: false,
  },
  {
    name: 'Contact',
    path: '/contact',
    Component: lazy(() => import('../features/contact/ContactPage')),
    title: 'Contact',
    isPrivate: false,
  },
  {
    name: 'Login',
    path: '/login',
    Component: lazy(() => import('../features/auth/LoginPage')),
    title: 'Login',
    isPrivate: false,
  },
  {
    name: 'Signup',
    path: '/signup',
    Component: lazy(() => import('../features/auth/SignupPage')),
    title: 'Signup',
    isPrivate: false,
  },
]

export const privateRoutes: AppRoute[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    // TODO: swap to your real Dashboard component
    Component: lazy(() => import('../features/auth/SignupPage')),
    title: 'Dashboard',
    isPrivate: true,
  },
]

// Layouts
const PublicLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </>
)

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-dvh flex items-center justify-center bg-background">
    {children}
  </div>
)

// Guard
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector((s: { auth: any }) => s.auth)
  const location = useLocation()
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return <>{children}</>
}

const AppRoutes: React.FC = () => {
  const { token } = useAppSelector((state: { auth: any }) => state.auth)

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC ROUTES always mounted */}
        {publicRoutes.map(({ name, path, Component }) => {
          const isAuthPage = path === '/login' || path === '/signup'

          // If already logged in, redirect auth pages to dashboard
          const element = isAuthPage && token
            ? <Navigate to="/dashboard" replace />
            : isAuthPage
              ? (
                <AuthLayout>
                  <Component />
                </AuthLayout>
              )
              : (
                <PublicLayout>
                  <Component />
                </PublicLayout>
              )

          return <Route key={name} path={path} element={element} />
        })}

        {/* PRIVATE ROUTES guarded */}
        {privateRoutes.map(({ name, path, Component }) => (
          <Route
            key={name}
            path={path}
            element={
              <ProtectedRoute>
                <PublicLayout>
                  <Component />
                </PublicLayout>
              </ProtectedRoute>
            }
          />
        ))}

        {/* 404 */}
        <Route
          path="*"
          element={
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          }
        />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
