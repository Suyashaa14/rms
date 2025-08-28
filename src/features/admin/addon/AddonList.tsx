import { useState } from 'react'
import { useGetAddonsQuery, useDeleteAddonMutation } from './addonApi'
import type { Addon } from '../../../types/catalog'
import AddonForm from './AddonForm'
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'

export default function AddonList() {
  const { data, isLoading, refetch } = useGetAddonsQuery({ page: 1, perPage: 20 })
  const [remove] = useDeleteAddonMutation()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Addon | null>(null)

  async function onSaved() {
    setShowForm(false)
    setEditing(null)
    await refetch()
  }

  const items = data?.items ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Addons</h1>
        <button className="px-3 py-2 rounded-lg bg-black text-white flex items-center gap-2" onClick={() => { setEditing(null); setShowForm(true) }}>
          <PlusIcon className="w-4 h-4" /> Add Addon
        </button>
      </div>

      {showForm && (
        <div className="border rounded-xl p-4 bg-white">
          <AddonForm initial={editing ?? undefined} onDone={onSaved as any} />
        </div>
      )}

      {isLoading ? (
        <div>Loading…</div>
      ) : (
        <div className="overflow-auto border rounded-xl bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-3">ID</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Price</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a) => (
                <tr key={a.id} className="border-t">
                  <td className="p-3">{a.id}</td>
                  <td className="p-3">{a.title}</td>
                  <td className="p-3">{a.price}</td>
                  <td className="p-3">{a.status}</td>
                  <td className="p-3 flex gap-2">
                    <button className="px-2 py-1 rounded bg-gray-100 flex items-center gap-1" onClick={() => { setEditing(a); setShowForm(true) }}>
                      <PencilIcon className="w-4 h-4" /> Edit
                    </button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white flex items-center gap-1" onClick={() => remove(a.id)}>
                      <TrashIcon className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td className="p-3" colSpan={5}>No addons found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
