// src/features/admin/menu/AdminMenuViewPage.tsx
import { useParams, Link } from 'react-router-dom'
import { useGetMenuQuery } from './menuApi'
import { useGetAddonsQuery } from '../addon/addonApi'
import { Button } from '../../../components/ui/button'
import { Pencil, ArrowLeft, Image as ImageIcon } from 'lucide-react'

type AnyAddon = {
  id: number | string
  title?: string
  name?: string
  description?: string
  price?: number
  status?: 'active' | 'inactive'
  available?: boolean
  is_available?: boolean
}

function pickName(a: AnyAddon) {
  return a.title ?? a.name ?? `#${a.id}`
}

export default function AdminMenuViewPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, isError } = useGetMenuQuery(id!)
  const { data: addonData } = useGetAddonsQuery(undefined, { refetchOnMountOrArgChange: true })

  if (isLoading) return <div>Loading…</div>
  if (isError || !data) return <div className="text-red-600">Failed to load item.</div>

  const categoryName =
    (data.category?.name ??
      (data.category as any)?.title ??
      (data as any).category_name ??
      '') as string

  // Normalize addons for display
  const allAddons: AnyAddon[] = (addonData?.items ?? []) as AnyAddon[]
  const raw = (data as any).addons ?? (data as any).addon ?? []
  let detailed: AnyAddon[] = []

  if (Array.isArray(raw) && raw.length) {
    if (typeof raw[0] === 'object') {
      detailed = raw as AnyAddon[]
    } else {
      const idSet = new Set(raw.map((x: any) => String(x)))
      detailed = allAddons.filter((a) => idSet.has(String(a.id)))
    }
  }

  // Show only available/active
  const visibleAddons = detailed.filter((a) => {
    const inactive = a.status === 'inactive'
    const explicitlyUnavailable = a.available === false || a.is_available === false
    return !inactive && !explicitlyUnavailable
  })

  const hasImageUrl = typeof (data as any).image === 'string' && (data as any).image

  return (
    <div className="w-full">
      {/* Top actions row */}
      <div className="mb-5 flex items-center justify-between">
        <Button asChild variant="outline" className="text-base h-10 px-4">
          <Link to="/admin/menu">
            <ArrowLeft className="w-5 h-5 mr-1.5" />
            Back
          </Link>
        </Button>
        <Button asChild className="text-base h-10 px-4">
          <Link to={`/admin/menu/${data.id}/edit`}>
            <Pencil className="w-5 h-5 mr-1.5" />
            Edit
          </Link>
        </Button>
      </div>

      {/* Full-width card with title inside */}
      <div className="rounded-2xl border bg-white">
        {/* Card header with title */}
        <div className="p-6 border-b">
          <h1 className="text-3xl md:text-4xl font-semibold">{data.title}</h1>
          {categoryName && (
            <p className="text-base text-muted-foreground mt-1">{categoryName}</p>
          )}
        </div>

        {/* Card body: side-by-side image + content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image (left) */}
            <div className="w-full">
              <div className="overflow-hidden rounded-xl bg-neutral-50">
                <div className="aspect-[4/3] w-full flex items-center justify-center">
                  {hasImageUrl ? (
                    <img
                      src={(data as any).image as string}
                      alt={data.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-base text-muted-foreground">
                      <ImageIcon className="w-6 h-6 mr-2" />
                      No image
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details (right) */}
            <div className="space-y-6">
              {/* Description */}
              <div>
                <div className="text-base font-semibold mb-1.5">Description</div>
                <div className="text-base leading-relaxed text-neutral-800">
                  {data.description || <span className="text-neutral-400">—</span>}
                </div>
              </div>

              {/* Key fields */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-base font-semibold mb-1">Size</div>
                  <div className="text-base">
                    {(data as any).size || <span className="text-neutral-400">—</span>}
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold mb-1">Price</div>
                  <div className="text-base">
                    {(data as any).price ?? <span className="text-neutral-400">—</span>}
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold mb-1">Badge</div>
                  <div className="text-base">
                    {(data as any).badge || <span className="text-neutral-400">—</span>}
                  </div>
                </div>
              </div>

              {/* Add-ons */}
              <div>
                <div className="text-base font-semibold mb-2">Available Add-ons</div>
                {visibleAddons.length === 0 ? (
                  <div className="text-base text-neutral-600">No add-ons for this item.</div>
                ) : (
                  <ul className="divide-y rounded-xl border">
                    {visibleAddons.map((a) => {
                      const name = pickName(a)
                      return (
                        <li key={String(a.id)} className="p-4">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="font-semibold text-base">{name}</div>
                              {a.description && (
                                <div className="text-base text-neutral-700 mt-0.5 leading-relaxed">
                                  {a.description}
                                </div>
                              )}
                            </div>
                            {a.price != null && (
                              <div className="text-base text-neutral-800 shrink-0">
                                {a.price}
                              </div>
                            )}
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
