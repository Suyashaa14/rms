import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Image as ImageIcon, Search } from 'lucide-react'
import { useGetCategoriesQuery, useDeleteCategoryMutation } from './categoryApi'
import type { Category } from '../../../types/catalog'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import AlertPopup from '../../../components/ui/AlertPopup'

export default function CategoryList() {
  const { data, isLoading, isError, refetch } = useGetCategoriesQuery()
  const [query, setQuery] = useState('')
  const [remove, { isLoading: removing }] = useDeleteCategoryMutation()

  const [popup, setPopup] = useState<{
    open: boolean
    type: 'success' | 'error'
    title?: string
    description?: string
  }>({ open: false, type: 'success' })

  const items: Category[] = data?.result ?? []

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter(c =>
      String(c.id).includes(q) ||
      (c.name ?? '').toLowerCase().includes(q) ||
      (c.description ?? '').toLowerCase().includes(q)
    )
  }, [items, query])

  async function onDelete(id: number | string) {
    const numId = Number(id)
    try {
      await remove(numId).unwrap()
      setPopup({
        open: true,
        type: 'success',
        title: 'Success',
        description: 'Category removed successfully.',
      })
      refetch()
    } catch (e: any) {
      setPopup({
        open: true,
        type: 'error',
        title: 'Delete failed',
        description: e?.data?.message ?? 'Something went wrong',
      })
    }
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Category</h1>
          <p className="text-sm text-muted-foreground">Manage your menu categories</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/category/create"><Plus className="w-4 h-4" /> Add category</Link>
        </Button>
      </div>

      {/* List card */}
      <div className="rounded-xl border bg-white">
        <div className="flex items-center justify-between gap-3 p-4 border-b bg-neutral-50">
          <div className="font-medium">Category List</div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search…"
              className="pl-8 w-64"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left bg-neutral-50">
              <tr>
                <th className="py-3 px-4">ID</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr><td className="py-6 px-4" colSpan={4}>Loading…</td></tr>
              )}
              {isError && !isLoading && (
                <tr><td className="py-6 px-4 text-red-600" colSpan={4}>Failed to load categories.</td></tr>
              )}
              {!isLoading && !filtered.length && (
                <tr><td className="py-6 px-4" colSpan={4}>No categories found.</td></tr>
              )}
              {filtered.map((c) => (
                <tr key={c.id} className="border-t">
                  <td className="py-3 px-4 w-[80px]">{c.id}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
                        {typeof c.image === 'string' && c.image ? (
                          <img src={c.image} alt={c.name} className="h-full w-full object-cover"/>
                        ) : (
                          <ImageIcon className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      <div className="font-medium">{c.name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground">{c.description}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Button asChild size="sm" variant="outline" className="h-8 gap-1">
                        <Link to={`/admin/category/${c.id}/edit`}><Pencil className="w-4 h-4" /> Edit</Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 gap-1 border-red-200 text-red-600 hover:bg-red-50"
                        disabled={removing}
                        onClick={() => onDelete(c.id)}
                      >
                        <Trash2 className="w-4 h-4" /> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup */}
      <AlertPopup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        description={popup.description}
        onClose={() => setPopup((p) => ({ ...p, open: false }))}
      />
    </div>
  )
}
