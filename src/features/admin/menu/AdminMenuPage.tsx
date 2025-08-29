// src/features/admin/menu/AdminMenuPage.tsx
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, Image as ImageIcon, Search } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import AlertPopup from '../../../components/ui/AlertPopup'
import { useGetMenusQuery, useDeleteMenuMutation, type MenuItem } from './menuApi'

function truncate(str?: string, n = 20) {
  if (!str) return ''
  return str.length > n ? str.slice(0, n) + '…' : str
}

export default function AdminMenuPage() {
  const { data, isLoading, isError, refetch } = useGetMenusQuery()
  const [query, setQuery] = useState('')
  const [remove, { isLoading: removing }] = useDeleteMenuMutation()

  const [popup, setPopup] = useState<{ open: boolean; type: 'success' | 'error'; title?: string; description?: string }>({
    open: false,
    type: 'success',
  })

  // Accept both {items:[...]} and {result:[...]} (and raw arrays)
  const items: MenuItem[] = useMemo(() => {
    const raw: any = data ?? {}
    if (Array.isArray(raw)) return raw as MenuItem[]
    return (raw.items ?? raw.result ?? []) as MenuItem[]
  }, [data])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return items
    return items.filter((m) => {
      const cat =
        (m.category?.name ??
          (m.category as any)?.title ??
          (m as any).category_name ??
          '') as string
      return (
        String(m.id).includes(q) ||
        (m.title ?? (m as any).name ?? '').toLowerCase().includes(q) ||
        (m.description ?? '').toLowerCase().includes(q) ||
        (m.size ?? '').toLowerCase().includes(q) ||
        String(m.price ?? '').includes(q) ||
        cat.toLowerCase().includes(q)
      )
    })
  }, [items, query])

  async function onDelete(id: number | string) {
    try {
      await remove(Number(id)).unwrap()
      setPopup({
        open: true,
        type: 'success',
        title: 'Success',
        description: 'Menu item removed successfully.',
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
          <h1 className="text-2xl font-semibold tracking-tight">Menu</h1>
          <p className="text-sm text-muted-foreground">Manage your menu items</p>
        </div>
        <Button asChild className="gap-2">
          <Link to="/admin/menu/create">
            <Plus className="w-4 h-4" /> Add menu
          </Link>
        </Button>
      </div>

      {/* List card */}
      <div className="rounded-xl border bg-white">
        <div className="flex items-center justify-between gap-3 p-4 border-b bg-neutral-50">
          <div className="font-medium">Menu List</div>
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
                <th className="py-3 px-4">Title</th> {/* image is inside this cell */}
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td className="py-6 px-4" colSpan={7}>
                    Loading…
                  </td>
                </tr>
              )}
              {isError && !isLoading && (
                <tr>
                  <td className="py-6 px-4 text-red-600" colSpan={7}>
                    Failed to load menu.
                  </td>
                </tr>
              )}
              {!isLoading && !filtered.length && (
                <tr>
                  <td className="py-6 px-4" colSpan={7}>
                    No menu items found.
                  </td>
                </tr>
              )}

              {filtered.map((m) => {
                const categoryName =
                  (m.category?.name ??
                    (m.category as any)?.title ??
                    (m as any).category_name ??
                    '') as string

                return (
                  <tr key={m.id} className="border-t">
                    <td className="py-3 px-4 w-[80px]">{m.id}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-lg bg-neutral-100 overflow-hidden flex items-center justify-center">
                          {typeof m.image === 'string' && m.image ? (
                            <img
                              src={m.image}
                              alt={m.title ?? (m as any).name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="font-medium">
                          <Link
                            to={`/admin/menu/${m.id}`}
                            className="hover:underline underline-offset-4"
                          >
                            {m.title ?? (m as any).name}
                          </Link>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-muted-foreground">
                      {truncate(m.description, 20)}
                    </td>
                    <td className="py-3 px-4">{m.size ?? ''}</td>
                    <td className="py-3 px-4">{m.price ?? ''}</td>
                    <td className="py-3 px-4">{categoryName}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button asChild size="sm" variant="outline" className="h-8 gap-1">
                          <Link to={`/admin/menu/${m.id}`}>
                            <Eye className="w-4 h-4" /> View
                          </Link>
                        </Button>
                        <Button asChild size="sm" variant="outline" className="h-8 gap-1">
                          <Link to={`/admin/menu/${m.id}/edit`}>
                            <Pencil className="w-4 h-4" /> Edit
                          </Link>
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 gap-1 border-red-200 text-red-600 hover:bg-red-50"
                          disabled={removing}
                          onClick={() => onDelete(m.id)}
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

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
