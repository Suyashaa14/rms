import { useEffect, useState } from 'react'
import { useCreateAddonMutation, useUpdateAddonMutation } from './addonApi'
import type { Addon, AddonCreate, Status } from '../../../types/catalog'

export default function AddonForm({
  initial,
  onDone,
}: { initial?: Partial<Addon>; onDone: (saved: Addon) => void }) {
  const [title, setTitle] = useState(initial?.title ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [price, setPrice] = useState<number>(Number(initial?.price) || 0)
  const [status, setStatus] = useState<Status>((initial?.status as Status) ?? 'active')
  const [err, setErr] = useState<string | null>(null)

  const [createAddon, { isLoading: creating }] = useCreateAddonMutation()
  const [updateAddon, { isLoading: updating }] = useUpdateAddonMutation()

  async function submit() {
    setErr(null)
    if (!title.trim()) return setErr('Title is required')
    if (price <= 0) return setErr('Price must be greater than 0')

    const payload: AddonCreate = { title, description, price, status }
    const saved = initial?.id
      ? await updateAddon({ id: initial.id!, body: payload }).unwrap()
      : await createAddon(payload).unwrap()
    onDone(saved)
  }

  useEffect(() => {
    setTitle(initial?.title ?? '')
    setDescription(initial?.description ?? '')
    setPrice(Number(initial?.price) || 0)
    setStatus((initial?.status as Status) ?? 'active')
  }, [initial])

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Title</label>
        <input className="w-full border rounded-lg px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea className="w-full border rounded-lg px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Price</label>
        <input type="number" step="0.01" min={0} className="w-full border rounded-lg px-3 py-2" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </div>
      <div>
        <label className="text-sm font-medium">Status</label>
        <select className="w-full border rounded-lg px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="pt-2">
        <button className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50" onClick={submit} disabled={creating || updating}>
          {initial?.id ? 'Update Addon' : 'Create Addon'}
        </button>
      </div>
    </div>
  )
}
