import { useEffect, useMemo, useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Separator } from '../../../components/ui/separator'
import { Upload, Image as ImageIcon, Save, Plus, X } from 'lucide-react'

import { useCreateMenuMutation, useUpdateMenuMutation } from './menuApi'
import type { MenuItem } from './menuApi'
import { useGetCategoriesQuery } from '../category/categoryApi'
import { useGetAddonsQuery, useCreateAddonMutation } from '../addon/addonApi'
import { useCreateMediaMutation } from '../media/mediaApi'

type Status = 'active' | 'inactive'

type Props = {
  initial?: Partial<MenuItem>
  onDone?: (saved?: MenuItem) => void
}

type FormState = {
  title: string
  description: string
  image: number | null // media id
  size: string
  price: string
  category_id: string | number | ''
  badge: string
  status: Status
  addonIds: Array<string | number>
}

// --- helpers to robustly pull fields from different shapes ---
function extractCategoryId(src: any): string | number | '' {
  return src?.category_id ?? src?.categoryId ?? src?.category?.id ?? ''
}
function extractAddonIds(src: any): Array<string | number> {
  const ids = new Set<string>()
  const push = (v: any) => {
    if (v !== null && v !== undefined && v !== '') ids.add(String(v))
  }
  if (Array.isArray(src?.addon_ids)) src.addon_ids.forEach(push)
  if (Array.isArray(src?.addon)) src.addon.forEach((v: any) => push(typeof v === 'object' ? v.id ?? v.addon_id : v))
  if (Array.isArray(src?.addons)) src.addons.forEach((a: any) => push(a?.id ?? a?.addon_id ?? a?.addonId))
  if (Array.isArray(src?.add_ons)) src.add_ons.forEach((a: any) => push(a?.id ?? a?.addon_id))
  return Array.from(ids)
}

export default function MenuForm({ initial, onDone }: Props) {
  const isEdit = Boolean(initial?.id)

  // --- Data ---
  const { data: catData } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true })
  const { data: addonData, isFetching: fetchingAddons } =
    useGetAddonsQuery(undefined, { refetchOnMountOrArgChange: true })

  const categories =
    (catData?.result ?? []) as Array<{ id: number | string; name?: string; title?: string }>
  const addons =
    (addonData?.items ?? []) as Array<{ id: number | string; title?: string; name?: string }>

  // --- Mutations ---
  const [createMenu, createState] = useCreateMenuMutation()
  const [updateMenu, updateState] = useUpdateMenuMutation()
  const [createAddon, createAddonState] = useCreateAddonMutation()
  const [createMedia, { isLoading: uploading }] = useCreateMediaMutation()

  // --- Local state ---
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [filePreview, setFilePreview] = useState<string | null>(
    typeof initial?.image === 'string' ? String(initial?.image) : null
  )

  const [form, setForm] = useState<FormState>({
    title: initial?.title ?? '',
    description: (initial as any)?.description ?? '',
    image:
      typeof (initial as any)?.image === 'number'
        ? Number((initial as any).image)
        : (initial as any)?.image_id
        ? Number((initial as any).image_id)
        : null,
    size: (initial as any)?.size ?? '',
    price: (initial as any)?.price != null ? String((initial as any).price) : '',
    category_id: extractCategoryId(initial),
    badge: (initial as any)?.badge ?? '',
    status:
      ((initial as any)?.status as Status) ??
      (((initial as any)?.active ? 'active' : 'inactive') as Status) ??
      'active',
    addonIds: extractAddonIds(initial),
  })

  // Inline Add-on create form visibility + fields
  const [newAddonOpen, setNewAddonOpen] = useState(false)
  const [newAddonName, setNewAddonName] = useState('')
  const [newAddonPrice, setNewAddonPrice] = useState('')
  const [newAddonDesc, setNewAddonDesc] = useState('')

  useEffect(() => {
    if (!initial) return
    setForm({
      title: initial?.title ?? '',
      description: (initial as any)?.description ?? '',
      image:
        typeof (initial as any)?.image === 'number'
          ? Number((initial as any).image)
          : (initial as any)?.image_id
          ? Number((initial as any).image_id)
          : null,
      size: (initial as any)?.size ?? '',
      price: (initial as any)?.price != null ? String((initial as any).price) : '',
      category_id: extractCategoryId(initial),
      badge: (initial as any)?.badge ?? '',
      status:
        ((initial as any)?.status as Status) ??
        (((initial as any)?.active ? 'active' : 'inactive') as Status) ??
        'active',
      addonIds: extractAddonIds(initial),
    })
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
    // Require an image only if we don't already have an existing URL image on edit
    const hasExistingUrl = isEdit && typeof (initial as any)?.image === 'string' && (initial as any).image
    if (!form.image && !hasExistingUrl) next.image = 'Image is required.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const payload = useMemo(() => {
    const body: any = {
      title: form.title.trim(),
      description: form.description.trim(),
      size: form.size.trim(),
      price: Number(form.price),
      category_id: form.category_id ? Number(form.category_id) : undefined,
      badge: form.badge.trim() || undefined,
      status: form.status,
      addon: (form.addonIds || []).map((id) => Number(id)),
    }
    // Only send image if user chose/uploaded one this session
    if (form.image) body.image = form.image
    return body
  }, [form])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      let saved: any
      if (initial?.id != null) {
        saved = await updateMenu({ id: Number((initial as any).id), body: payload }).unwrap()
      } else {
        saved = await createMenu(payload).unwrap()
      }
      onDone?.(saved)
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
      const set = new Set(prev.addonIds.map((x) => String(x)))
      const sId = String(id)
      if (on) set.add(sId)
      else set.delete(sId)
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
      const created = await createAddon({
        title: name,
        description: desc,
        price: priceNum,
        status: 'active',
      }).unwrap()

      // close form + clear local fields
      setNewAddonOpen(false)
      setNewAddonName('')
      setNewAddonPrice('')
      setNewAddonDesc('')

      // auto-select newly created addon
      if (created?.id != null) {
        toggleAddon(created.id, true)
      }
    } catch (err) {
      const msg =
        (err as any)?.data?.message ||
        (err as any)?.error ||
        (typeof err === 'string' ? err : 'Failed to create add-on.')
      setErrors(prev => ({ ...prev, addonCreate: String(msg) }))
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const localUrl = URL.createObjectURL(file)
    setFilePreview(localUrl)

    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await createMedia(fd).unwrap() // expects { id, ... }
      updateField('image', Number((res as any).id))
      setErrors(prev => {
        const { image, ...rest } = prev
        return rest
      })
    } catch (err) {
      setErrors(prev => ({
        ...prev,
        image:
          (err as any)?.data?.message ||
          (err as any)?.error ||
          'Image upload failed. Please try again.',
      }))
    }
  }

  const removePreview = () => {
    setFilePreview(null) // keep uploaded media id if present
  }

  // --- UI (compact addon checkboxes kept from previous step) ---
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {errors._root && (
        <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{errors._root}</div>
      )}

      <section className="rounded-2xl bg-white/90 dark:bg-neutral-900/50 shadow-sm p-5">
        {/* Row 1: Title + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
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
        </div>

        <Separator className="my-5" />

        {/* Row 2: Price + Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

          <div>
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

        {/* Description */}
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

        {/* Badge */}
        <div className="mt-5">
          <Label htmlFor="badge" className="mb-1 inline-block">Badge (optional)</Label>
          <Input
            id="badge"
            placeholder="e.g., Best Seller"
            value={form.badge}
            onChange={(e) => updateField('badge', e.target.value)}
            className="h-11"
          />
        </div>

        {/* Image */}
        <div className="mt-5">
          <Label className="mb-1 inline-block">Image</Label>
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
              {filePreview ? (
                <img src={filePreview} alt="preview" className="h-full w-full object-cover" />
              ) : typeof (initial as any)?.image === 'string' ? (
                <img src={String((initial as any)?.image)} alt="current" className="h-full w-full object-cover" />
              ) : (
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border bg-white hover:bg-neutral-50">
                <Upload className="w-4 h-4" />
                <span>Upload image</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>
              {filePreview && (
                <Button type="button" variant="ghost" size="sm" onClick={removePreview} className="h-9">
                  <X className="w-4 h-4 mr-1" /> Clear preview
                </Button>
              )}
            </div>
          </div>
          {uploading && <div className="text-xs text-muted-foreground mt-1">Uploading…</div>}
          {form.image && !uploading && (
            <div className="text-xs text-muted-foreground mt-1">Media ID: {String(form.image)}</div>
          )}
          {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
        </div>

        <Separator className="my-5" />

        {/* Add-ons: compact checkbox grid showing only names */}
        <section className="rounded-xl">
          <div className="mb-2">
            <div className="text-base font-semibold">Add-ons</div>
            <div className="text-xs text-muted-foreground">
              Select existing add-ons or create a new one.
            </div>
          </div>

          <div className="mt-2">
            {fetchingAddons && <div className="text-sm text-muted-foreground">Loading add-ons…</div>}
            {!fetchingAddons && addons.length === 0 && (
              <div className="text-sm text-muted-foreground">No add-ons yet. Create one below.</div>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
              {addons.map((a) => {
                const idStr = String(a.id)
                const name = a.title ?? a.name ?? `#${idStr}`
                const checked = form.addonIds.some((x) => String(x) === idStr)
                return (
                  <label
                    key={idStr}
                    className="flex items-center gap-2 rounded-md border px-2 py-1 text-xs hover:bg-neutral-50"
                    title={name}
                  >
                    <input
                      type="checkbox"
                      className="h-3 w-3"
                      checked={checked}
                      onChange={(e) => toggleAddon(a.id, e.target.checked)}
                    />
                    <span className="truncate">{name}</span>
                  </label>
                )
              })}
            </div>
          </div>

          {!newAddonOpen ? (
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={() => setNewAddonOpen(true)} className="h-9">
                <Plus className="w-4 h-4 mr-2" />
                Add add-on
              </Button>
            </div>
          ) : (
            <div className="rounded-lg bg-neutral-50 dark:bg-neutral-800/60 p-4 space-y-3 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    setErrors((prev) => {
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
        </section>

        <Separator className="my-5" />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-end">
          <Button type="submit" disabled={loading || uploading} className="sm:min-w-[140px] h-11">
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
