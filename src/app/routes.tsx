import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../hooks/hooks'
import Loader from '../components/common/Loader'
import NotFound from '../components/common/NotFound'
import PublicLayout from '../layout/PublicLayout'
import DashboardLayout from '../layout/DashboardLayout'

// ===== Public/marketing pages (always visible, regardless of token)
const HomePage = lazy(() => import('../features/home/HomePage'))
const MenuPage = lazy(() => import('../features/menu/MenuPage'))
const ContactPage = lazy(() => import('../features/contact/ContactPage'))
const ItemPage = lazy(() => import('../features/item/ItemPage'))
const CartPage = lazy(() => import('../features/cart/CartPage'))
const CheckoutPage = lazy(() => import('../features/checkout/CheckoutPage'))

// ===== Auth pages (no header/footer)
const LoginPage = lazy(() => import('../features/auth/LoginPage'))
const SignupPage = lazy(() => import('../features/auth/SignupPage'))

// ===== Dashboards (sidebar layout)
const UserDashboard = lazy(() => import('../features/dashboard/UserDashboard'))
const AdminDashboard = lazy(() => import('../features/admin/AdminDashboard'))

// ===== Extra User pages (sidebar layout)
import UserOrdersPage from '../features/orders/UserOrdersPage'
import UserOrderDetailPage from '../features/orders/UserOrderDetailPage'
import UserFavoritesPage from '../features/user/UserFavoritesPage'
import UserAddressesPage from '../features/user/UserAddressesPage'
import SettingsPage from '../features/settings/SettingsPage'

// ===== Extra Admin pages (sidebar layout)
import AdminOrdersPage from '../features/admin/orders/AdminOrdersPage'
import AdminOrderDetailPage from '../features/admin/orders/AdminOrderDetailPage'
import AdminMenuPage from '../features/admin/menu/AdminMenuPage'
import AdminUsersPage from '../features/admin/users/AdminUsersPage'
import AdminCouponsPage from '../features/admin/coupons/AdminCouponsPage'
import AdminReportsPage from '../features/admin/reports/AdminReportsPage'

export interface AppRoute {
  name: string
  path: string
  Component: React.ComponentType
  title: string
  isPrivate: boolean
}

// Exported for the Header’s nav links
export const publicRoutes: AppRoute[] = [
  { name: 'Home', path: '/', Component: HomePage, title: 'Home', isPrivate: false },
  { name: 'Menu', path: '/menu', Component: MenuPage, title: 'Menu', isPrivate: false },
  { name: 'Contact', path: '/contact', Component: ContactPage, title: 'Contact', isPrivate: false },
  { name: 'Login', path: '/login', Component: LoginPage, title: 'Login', isPrivate: false },
  { name: 'Signup', path: '/signup', Component: SignupPage, title: 'Signup', isPrivate: false },
]

// Minimal Auth layout (no header/footer)
const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-dvh flex items-center justify-center bg-background">{children}</div>
)

// ===== Guards
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAppSelector(s => s.auth)
  const location = useLocation()
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />
  return <>{children}</>
}

const RequireRole: React.FC<{ role: 'admin' | 'user'; children: React.ReactNode }> = ({ role, children }) => {
  const { token, user } = useAppSelector(s => s.auth)
  const location = useLocation()
  if (!token) return <Navigate to="/login" replace state={{ from: location }} />
  if (!user || user.role !== role) return <Navigate to="/" replace />
  return <>{children}</>
}

const AppRoutes: React.FC = () => {
  const { token, user } = useAppSelector(s => s.auth)

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* ===== PUBLIC pages (header + footer) — ALWAYS available */}
        {publicRoutes.map(({ name, path, Component }) => {
          const isAuth = path === '/login' || path === '/signup'

          // If logged in and trying to view auth pages, redirect to role dashboard
          if (isAuth && token) {
            return (
              <Route
                key={name}
                path={path}
                element={<Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />}
              />
            )
          }

          // Auth pages render WITHOUT header/footer
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

          // Normal public pages render WITH header/footer
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

        {/* Extra public pages not in the array */}
        <Route path="/item/:slug" element={<PublicLayout><ItemPage /></PublicLayout>} />
        <Route path="/cart" element={<PublicLayout><CartPage /></PublicLayout>} />

        {/* Checkout requires auth, but keeps public chrome */}
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <PublicLayout><CheckoutPage /></PublicLayout>
            </RequireAuth>
          }
        />

        {/* ===== USER dashboard (sidebar layout, NO public header/footer) */}
        <Route
          path="/dashboard"
          element={
            <RequireRole role="user">
              <DashboardLayout role="user" title="Overview" subtitle="Your account and recent activity">
                <UserDashboard />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/orders/history"
          element={
            <RequireRole role="user">
              <DashboardLayout role="user" title="My Orders" subtitle="Track and reorder your favorites">
                <UserOrdersPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/orders/:id"
          element={
            <RequireRole role="user">
              <DashboardLayout role="user" title="Order Details">
                <UserOrderDetailPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/favorites"
          element={
            <RequireRole role="user">
              <DashboardLayout role="user" title="Favorites" subtitle="Your saved dishes">
                <UserFavoritesPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/addresses"
          element={
            <RequireRole role="user">
              <DashboardLayout role="user" title="Addresses" subtitle="Manage delivery locations">
                <UserAddressesPage />
              </DashboardLayout>
            </RequireRole>
          }
        />

        {/* ===== Settings (available to both roles, still in dashboard chrome) */}
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <DashboardLayout role={user?.role === 'admin' ? 'admin' : 'user'} title="Settings">
                <SettingsPage />
              </DashboardLayout>
            </RequireAuth>
          }
        />

        {/* ===== ADMIN dashboard (sidebar layout) */}
        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Admin Home" subtitle="Today’s snapshot and quick links">
                <AdminDashboard />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Orders Queue" subtitle="Live orders & statuses">
                <AdminOrdersPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/orders/:id"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Order Detail">
                <AdminOrderDetailPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Menu Manager" subtitle="Items, variants, modifiers">
                <AdminMenuPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Customers" subtitle="User list & activity">
                <AdminUsersPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/coupons"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Coupons" subtitle="Deals and promo codes">
                <AdminCouponsPage />
              </DashboardLayout>
            </RequireRole>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <RequireRole role="admin">
              <DashboardLayout role="admin" title="Reports" subtitle="Sales, items, and performance">
                <AdminReportsPage />
              </DashboardLayout>
            </RequireRole>
          }
        />

        {/* 404 (public chrome) */}
        <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
