import { lazy } from 'react'

export const componentMap: Record<string, React.ComponentType<any>> = {
  // Public/auth pages
  HomePage: lazy(() => import('../features/home/HomePage')),
  MenuPage: lazy(() => import('../features/menu/MenuPage')),
  ContactPage: lazy(() => import('../features/contact/ContactPage')),
  ItemPage: lazy(() => import('../features/item/ItemPage')),
  CartPage: lazy(() => import('../features/cart/CartPage')),
  CheckoutPage: lazy(() => import('../features/checkout/CheckoutPage')),
  LoginPage: lazy(() => import('../features/auth/LoginPage')),
  SignupPage: lazy(() => import('../features/auth/SignupPage')),

  // User dashboard pages
  UserDashboard: lazy(() => import('../features/dashboard/UserDashboard')),
  UserOrdersPage: lazy(() => import('../features/orders/UserOrdersPage')),
  UserOrderDetailPage: lazy(() => import('../features/orders/UserOrderDetailPage')),
  UserFavoritesPage: lazy(() => import('../features/user/UserFavoritesPage')),
  UserAddressesPage: lazy(() => import('../features/user/UserAddressesPage')),
  SettingsPage: lazy(() => import('../features/settings/SettingsPage')),

  // Admin dashboard pages
  AdminDashboard: lazy(() => import('../features/admin/AdminDashboard')),
  AdminOrdersPage: lazy(() => import('../features/admin/orders/AdminOrdersPage')),
  AdminOrderDetailPage: lazy(() => import('../features/admin/orders/AdminOrderDetailPage')),
  AdminMenuPage: lazy(() => import('../features/admin/menu/AdminMenuPage')),
  AdminUsersPage: lazy(() => import('../features/admin/users/AdminUsersPage')),
  AdminCouponsPage: lazy(() => import('../features/admin/coupons/AdminCouponsPage')),
  AdminReportsPage: lazy(() => import('../features/admin/reports/AdminReportsPage')),
}
