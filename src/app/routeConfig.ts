import publicConfig from './route-config/public.routes.json'
import privateConfig from './route-config/private.routes.json'
import protectedConfig from './route-config/protected.routes.json'
import type { JsonRoute, LayoutKind, RoleKind } from './route-types'

export const publicRoutesConfig: JsonRoute[] = publicConfig.routes.map(
  ({ name, path, component, title, layout, showInNav }) => ({
    name,
    path,
    component,
    title,
    layout: layout as LayoutKind,
    showInNav: !!showInNav,
  })
)

export const privateRoutesConfig: (JsonRoute & { role: RoleKind })[] = privateConfig.routes.map(
  ({ name, path, component, title, layout, role }) => ({
    name,
    path,
    component,
    title,
    layout: layout as LayoutKind,
    role: role as RoleKind,
  })
)

export const protectedRoutesConfig: JsonRoute[] = protectedConfig.routes.map(
  ({ name, path, component, title, layout }) => ({
    name,
    path,
    component,
    title,
    layout: layout as LayoutKind,
  })
)
