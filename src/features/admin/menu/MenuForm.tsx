// src/features/admin/menu/MenuForm.tsx
import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Separator } from '../../../components/ui/separator'
import { useCreateMenuMutation, useUpdateMenuMutation } from './menuApi'
import { useGetCategoriesQuery } from '../category/categoryApi'
import { useGetAddonsQuery, useCreateAddonMutation } from '../addon/addonApi'
import type { MenuItem } from '../../../types/catalog'
import { ChevronDown, ChevronRight, Plus, Save } from 'lucide-react'
import { cn } from '../../../lib/cn'

type Status = 'active' | 'inactive'

type Props = {
  initial?: MenuItem
  onDone?: () => void
}

type FormState = {
  title: string
  description: string
  image: string
  size: string
  price: string
  category_id: string | number | null
  badge: string
  status: Status
  addonIds: Array<string | number>
}

export default function MenuForm({ initial, onDone }: Props) {
  // --- Data ---
  const { data: catData } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true })
  const { data: addonData, refetch: refetchAddons, isFetching: fetchingAddons } =
    useGetAddonsQuery(undefined, { refetchOnMountOrArgChange: true })

  const categories = (catData?.result ?? []) as Array<{ id: number | string; name?: string; title?: string }>
  const addons =
    (addonData?.items ?? []) as Array<{ id: number | string; name?: string; title?: string; price?: number; description?: string }>

  // --- Mutations ---
  const [createMenu, createState] = useCreateMenuMutation()
  const [updateMenu, updateState] = useUpdateMenuMutation()
  const [createAddon, createAddonState] = useCreateAddonMutation()

  // --- Local state ---
  const [showAddons, setShowAddons] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [form, setForm] = useState<FormState>({
    title: (initial as any)?.title ?? '',
    description: (initial as any)?.description ?? '',
    image: ((initial as any)?.image ?? (initial as any)?.image_id ?? '').toString() || '',
    size: (initial as any)?.size ?? '',
    price: (initial as any)?.price != null ? String((initial as any).price) : '',
    category_id: (initial as any)?.category_id ?? (initial as any)?.categoryId ?? '',
    badge: (initial as any)?.badge ?? '',
    status:
      ((initial as any)?.status as Status) ??
      (((initial as any)?.active ? 'active' : 'inactive') as Status) ??
      'active',
    addonIds:
      (Array.isArray((initial as any)?.addon) && (initial as any).addon.length
        ? (initial as any).addon
        : (initial as any)?.addons?.map((a: any) => a.id)) ?? [],
  })

  // Inline Add-on create form (now vertical layout + textarea)
  const [newAddonOpen, setNewAddonOpen] = useState(false)
  const [newAddonName, setNewAddonName] = useState('')
  const [newAddonPrice, setNewAddonPrice] = useState('')
  const [newAddonDesc, setNewAddonDesc] = useState('')

  useEffect(() => {
    if (initial) {
      setForm({
        title: (initial as any)?.title ?? '',
        description: (initial as any)?.description ?? '',
        image: ((initial as any)?.image ?? (initial as any)?.image_id ?? '').toString() || '',
        size: (initial as any)?.size ?? '',
        price: (initial as any)?.price != null ? String((initial as any).price) : '',
        category_id: (initial as any)?.category_id ?? (initial as any)?.categoryId ?? '',
        badge: (initial as any)?.badge ?? '',
        status:
          ((initial as any)?.status as Status) ??
          (((initial as any)?.active ? 'active' : 'inactive') as Status) ??
          'active',
        addonIds:
          (Array.isArray((initial as any)?.addon) && (initial as any).addon.length
            ? (initial as any).addon
            : (initial as any)?.addons?.map((a: any) => a.id)) ?? [],
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial?.id])

  const loading = createState.isLoading || updateState.isLoading

  // --- Helpers ---
  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  const validate = () => {
    const next: Record<string, string> = {}
    if (!form.title.trim()) next.title = 'Title is required.'
    if (!form.category_id) next.category_id = 'Category is required.'
    if (form.price === '' || isNaN(Number(form.price)) || Number(form.price) < 0)
      next.price = 'Enter a valid price (0 or more).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Payload you requested:
  // {
  //   "title": "...",
  //   "description": "...",
  //   "image": "1",
  //   "size": "Large",
  //   "price": 12.50,
  //   "category_id": 1,
  //   "badge": "Best Seller",
  //   "status": "active",
  //   "addon": [1,2,3]
  // }
  const payload = useMemo(() => {
    return {
      title: form.title.trim(),
      description: form.description.trim(),
      image: form.image ? Number(form.image) : undefined,
      size: form.size.trim(),
      price: Number(form.price),
      category_id: form.category_id ? Number(form.category_id) : undefined,
      badge: form.badge.trim() || undefined,
      status: form.status,
      addon: (form.addonIds || []).map((id) => Number(id)),
    }
  }, [form])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      if (initial?.id != null) {
        await updateMenu({ id: Number((initial as any).id), body: payload as any }).unwrap()
      } else {
        await createMenu(payload as any).unwrap()
      }
      onDone?.()
    } catch (err) {
      const msg =
        (err as any)?.data?.message ||
        (err as any)?.error ||
        (typeof err === 'string' ? err : 'Failed to save. Please try again.')
      setErrors(prev => ({ ...prev, _root: String(msg) }))
    }
  }

  const toggleAddon = (id: string | number, on: boolean) => {
    setForm(prev => {
      const set = new Set(prev.addonIds)
      if (on) set.add(id)
      else set.delete(id)
      return { ...prev, addonIds: Array.from(set) }
    })
  }

  const handleCreateAddon = async () => {
    const name = newAddonName.trim()
    const priceNum = newAddonPrice === '' ? 0 : Number(newAddonPrice)
    const desc = newAddonDesc.trim()
    const addonErrors: string[] = []
    if (!name) addonErrors.push('Add-on name is required.')
    if (newAddonPrice !== '' && (isNaN(priceNum) || priceNum < 0)) addonErrors.push('Enter a valid add-on price.')
    if (addonErrors.length) {
      setErrors(prev => ({ ...prev, addonCreate: addonErrors.join(' ') }))
      return
    }
    try {
      setErrors(prev => {
        const { addonCreate, ...rest } = prev
        return rest
      })
      await createAddon({ title: name, description: desc, price: priceNum, status: 'active' }).unwrap()
      setNewAddonName('')
      setNewAddonPrice('')
      setNewAddonDesc('')
      setNewAddonOpen(false)
      await refetchAddons()
    } catch (err) {
      const msg =
        (err as any)?.data?.message ||
        (err as any)?.error ||
        (typeof err === 'string' ? err : 'Failed to create add-on.')
      setErrors(prev => ({ ...prev, addonCreate: String(msg) }))
    }
  }

  // --- UI: single clean card with internal sections (responsive) ---
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors._root && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errors._root}</div>
      )}

      <section className="rounded-2xl bg-white/90 dark:bg-neutral-900/50 shadow-sm p-5">
        {/* Basic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2">
            <Label htmlFor="title" className="mb-1 inline-block">Title</Label>
            <Input
              id="title"
              placeholder="e.g., Margherita Pizza"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
              className="h-11"
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="category" className="mb-1 inline-block">Category</Label>
            <select
              id="category"
              className="w-full h-11 rounded-md border bg-white/70 dark:bg-neutral-900/40 px-3 text-sm"
              value={String(form.category_id ?? '')}
              onChange={(e) => updateField('category_id', e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.id} value={String(c.id)}>
                  {c.name || (c as any).title || `#${c.id}`}
                </option>
              ))}
            </select>
            {errors.category_id && <p className="mt-1 text-xs text-red-600">{errors.category_id}</p>}
          </div>

          <div>
            <Label htmlFor="status" className="mb-1 inline-block">Status</Label>
            <select
              id="status"
              className="w-full h-11 rounded-md border bg-white/70 dark:bg-neutral-900/40 px-3 text-sm"
              value={form.status}
              onChange={(e) => updateField('status', e.target.value as Status)}
            >
              <option value="active">active</option>
              <option value="inactive">inactive</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="badge" className="mb-1 inline-block">Badge (optional)</Label>
            <Input
              id="badge"
              placeholder="e.g., Best Seller"
              value={form.badge}
              onChange={(e) => updateField('badge', e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <Separator className="my-5" />

        {/* Pricing & Size */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div>
            <Label htmlFor="price" className="mb-1 inline-block">Price</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">$</span>
              <Input
                id="price"
                inputMode="decimal"
                className="pl-6 h-11"
                placeholder="0.00"
                value={form.price}
                onChange={(e) => updateField('price', e.target.value)}
              />
            </div>
            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="size" className="mb-1 inline-block">Size</Label>
            <Input
              id="size"
              placeholder="e.g., Small / Medium / Large"
              value={form.size}
              onChange={(e) => updateField('size', e.target.value)}
              className="h-11"
            />
          </div>
        </div>

        <Separator className="my-5" />

        {/* Media */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <Label htmlFor="image" className="mb-1 inline-block">Image (media id)</Label>
            <Input
              id="image"
              placeholder="e.g., 1"
              value={form.image}
              onChange={(e) => updateField('image', e.target.value)}
              className="h-11"
            />
            <p className="mt-1 text-xs text-muted-foreground">Upload images in Admin → Media to get an ID.</p>
          </div>
        </div>

        <Separator className="my-5" />

        {/* Menu Description */}
        <div>
          <Label htmlFor="desc" className="mb-1 inline-block">Description</Label>
          <Textarea
            id="desc"
            placeholder="e.g., Classic Italian pizza with fresh tomatoes, mozzarella, and basil."
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            rows={5}
          />
        </div>

        <Separator className="my-5" />

        {/* Add-ons (single card, vertical fields, textarea for description) */}
        <section className="rounded-xl">
          <button
            type="button"
            onClick={() => setShowAddons(v => !v)}
            className={cn(
              'w-full flex items-center justify-between px-0 py-2 rounded-md',
              'hover:opacity-80 transition'
            )}
            aria-expanded={showAddons}
          >
            <div className="text-left">
              <div className="text-base font-semibold">Add-ons</div>
              <div className="text-xs text-muted-foreground">Optional extras users can attach.</div>
            </div>
            {showAddons ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </button>

          {showAddons && (
            <div className="mt-3">
              {/* Quick add — now stacked fields */}
              <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/60 p-4 space-y-3">
                {!newAddonOpen ? (
                  <Button type="button" variant="outline" onClick={() => setNewAddonOpen(true)} className="h-9">
                    <Plus className="w-4 h-4 mr-2" />
                    Add new add-on
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div>
                      <Label className="mb-1 inline-block">Name</Label>
                      <Input
                        placeholder="e.g., Extra cheese"
                        value={newAddonName}
                        onChange={(e) => setNewAddonName(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label className="mb-1 inline-block">Price</Label>
                      <Input
                        placeholder="0.00"
                        inputMode="decimal"
                        value={newAddonPrice}
                        onChange={(e) => setNewAddonPrice(e.target.value)}
                        className="h-10"
                      />
                    </div>
                    <div>
                      <Label className="mb-1 inline-block">Description (optional)</Label>
                      <Textarea
                        placeholder="Short note, e.g., 30g extra mozzarella"
                        value={newAddonDesc}
                        onChange={(e) => setNewAddonDesc(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={handleCreateAddon}
                        disabled={createAddonState.isLoading}
                        className="h-10"
                      >
                        <Save className="w-4 h-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => {
                          setNewAddonOpen(false)
                          setNewAddonName('')
                          setNewAddonPrice('')
                          setNewAddonDesc('')
                          setErrors(prev => {
                            const { addonCreate, ...rest } = prev
                            return rest
                          })
                        }}
                        className="h-10"
                      >
                        Cancel
                      </Button>
                      {errors.addonCreate && <p className="text-xs text-red-600 ml-2">{errors.addonCreate}</p>}
                    </div>
                  </div>
                )}
              </div>

              {/* Existing add-ons list — minimal, separator lines (no extra boxes) */}
              <div className="mt-4">
                {fetchingAddons && <div className="text-sm text-muted-foreground">Loading add-ons…</div>}
                {!fetchingAddons && addons.length === 0 && (
                  <div className="text-sm text-muted-foreground">No add-ons yet. Create one above.</div>
                )}
                <ul className="divide-y">
                  {addons.map(a => {
                    const name = a.name || (a as any).title || `#${a.id}`
                    const desc = (a as any).description || ''
                    const checked = form.addonIds.includes(a.id)
                    return (
                      <li key={String(a.id)} className="py-2">
                        <label className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              className="mt-1 h-4 w-4"
                              checked={checked}
                              onChange={(e) => toggleAddon(a.id, e.target.checked)}
                            />
                            <div>
                              <div className="text-sm font-medium">{name}</div>
                              {desc && <div className="text-xs text-muted-foreground mt-0.5 max-w-prose">{desc}</div>}
                            </div>
                          </div>
                          {(a as any).price != null && (
                            <span className="text-xs text-muted-foreground mt-1">${(a as any).price}</span>
                          )}
                        </label>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )}
        </section>

        <Separator className="my-5" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button type="submit" disabled={loading} className="sm:min-w-[140px] h-11">
            {loading ? 'Saving…' : initial?.id ? 'Save changes' : 'Create item'}
          </Button>
          {onDone && (
            <Button type="button" variant="ghost" onClick={() => onDone?.()} className="h-11">
              Cancel
            </Button>
          )}
        </div>
      </section>
    </form>
  )
}
