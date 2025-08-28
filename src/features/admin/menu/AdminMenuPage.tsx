import { Button } from '../../../components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import { useGetMenusQuery, useDeleteMenuMutation } from './menuApi'
import type { MenuItem } from '../../../types/catalog'
import { cn } from '../../../lib/cn'
import { Link } from 'react-router-dom'

export default function AdminMenuPage() {
  const { data, isLoading, isError } = useGetMenusQuery()
  const [deleteMenu, { isLoading: deleting }] = useDeleteMenuMutation()

  const items: MenuItem[] = data?.items ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">Items</div>
          <div className="text-sm text-muted-foreground">Create, edit, and control availability</div>
        </div>

        <Button asChild>
          <Link to="/admin/menu/new">
            <Plus className="w-4 h-4 mr-2" /> New Item
          </Link>
        </Button>
      </div>

      {isLoading && <div className="text-sm text-muted-foreground">Loading items…</div>}
      {isError && <div className="text-sm text-red-600">Failed to load items.</div>}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((i) => (
          <div key={i.id} className="rounded-xl border overflow-hidden bg-white/80 dark:bg-neutral-900/60">
            <div className="h-36 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">#{i.id}</span>
            </div>
            <div className="p-3">
              <div className="font-semibold">{i.title}</div>
              {i.description && <div className="text-xs text-muted-foreground line-clamp-2">{i.description}</div>}
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/admin/menu/${i.id}/edit`}>
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Link>
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className={cn('text-red-600 border-red-200 hover:bg-red-50 dark:hover:bg-red-950')}
                  disabled={deleting}
                  onClick={() => deleteMenu(i.id as number)}
                >
                  <Trash2 className="w-4 h-4 mr-1" /> Delete
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
