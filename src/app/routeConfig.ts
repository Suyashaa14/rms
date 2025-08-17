import publicConfig from './route-config/public.routes.json' with { type: 'json' }
import privateConfig from './route-config/private.routes.json' with { type: 'json' }
import protectedConfig from './route-config/protected.routes.json' with { type: 'json' }
import type { JsonRoute } from './route-types'

export const publicRoutesConfig: JsonRoute[] = publicConfig.routes
export const privateRoutesConfig: JsonRoute[] = privateConfig.routes
export const protectedRoutesConfig: JsonRoute[] = protectedConfig.routes
