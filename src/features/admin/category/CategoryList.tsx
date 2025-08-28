import { useState } from 'react'
import { useGetCategoriesQuery, useDeleteCategoryMutation } from './categoryApi'
import type { Category } from '../../../types/catalog'
import CategoryForm from './CategoryForm'
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react'


export default function CategoryList() {
  const { data, isLoading, refetch } = useGetCategoriesQuery()
  const [remove] = useDeleteCategoryMutation()
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Category | null>(null)

  const items = data?.result ?? []

  async function onSaved() {
    setShowForm(false)
    setEditing(null)
    await refetch()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Categories</h1>
        <button className="px-3 py-2 rounded-lg bg-black text-white flex items-center gap-2" onClick={() => { setEditing(null); setShowForm(true) }}>
          <PlusIcon className="w-4 h-4" /> Add Category
        </button>
      </div>

      {showForm && (
        <div className="border rounded-xl p-4 bg-white">
          <CategoryForm initial={editing ?? undefined} onDone={onSaved as any} />
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
                <th className="text-left p-3">Name</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Image</th>
                <th className="text-left p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.status}</td>
                  <td className="p-3">{String(c.image)}</td>
                  <td className="p-3 flex gap-2">
                    <button className="px-2 py-1 rounded bg-gray-100 flex items-center gap-1" onClick={() => { setEditing(c); setShowForm(true) }}>
                      <PencilIcon className="w-4 h-4" /> Edit
                    </button>
                    <button className="px-2 py-1 rounded bg-red-600 text-white flex items-center gap-1" onClick={() => remove(c.id)}>
                      <TrashIcon className="w-4 h-4" /> Delete
                    </button>
                  </td>
                </tr>
              ))}
              {!items.length && (
                <tr>
                  <td className="p-3" colSpan={5}>No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
