import { Link, useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { ArrowLeft } from 'lucide-react'
import MenuForm from './MenuForm'
import { useGetMenusQuery } from './menuApi'
import type { MenuItem } from '../../../types/catalog'

export default function AdminMenuFormPage() {
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)
  const { data, isLoading, isError } = useGetMenusQuery(undefined, { refetchOnMountOrArgChange: true })
  const initial: MenuItem | undefined =
    isEdit ? data?.items?.find((it: MenuItem) => String(it.id) === String(id)) : undefined

  return (
    <div className="mx-auto w-full max-w-6xl">
      <div className="mb-4 flex items-center justify-between">
        <Button variant="ghost" asChild>
          <Link to="/admin/menu">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Items
          </Link>
        </Button>
      </div>

      <div className="mb-2">
        <h1 className="text-xl font-semibold">{isEdit ? 'Edit Item' : 'Create Item'}</h1>
        <p className="text-sm text-muted-foreground">
          {isEdit ? 'Update item details and availability.' : 'Add a new item to your menu.'}
        </p>
      </div>

      {isEdit && isLoading && <div className="text-sm text-muted-foreground">Loading item…</div>}
      {isEdit && isError && <div className="text-sm text-red-600">Failed to load item.</div>}
      {isEdit && !initial && (
        <div className="rounded-lg bg-white/70 dark:bg-neutral-900/60 p-4 text-sm">Item not found.</div>
      )}

      {/* Clean form — no extra outer border */}
      <div className="py-2">
        <MenuForm initial={initial} onDone={() => history.back()} />
      </div>
    </div>
  )
}
