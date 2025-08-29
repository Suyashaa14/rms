import { useNavigate, useParams } from 'react-router-dom'
import { useGetMenuQuery } from './menuApi'
import type { MenuItem } from './menuApi'
import MenuForm from './MenuForm'

export default function AdminMenuFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)

  // Use the full item when editing so we get addons/category/etc.
  const { data, isLoading, isError } = useGetMenuQuery(id!, {
    skip: !isEdit,
    refetchOnMountOrArgChange: true,
  })

  const initial: Partial<MenuItem> | undefined = isEdit ? (data as Partial<MenuItem> | undefined) : undefined

  if (isEdit && isLoading) return <div>Loading…</div>
  if (isEdit && isError) return <div className="text-red-600">Failed to load item.</div>

  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold">{isEdit ? 'Edit Menu' : 'Create Menu'}</h1>
        <p className="text-sm text-muted-foreground">
          {isEdit ? 'Update this menu item' : 'Add a new menu item'}
        </p>
      </div>

      <MenuForm initial={initial} onDone={() => navigate('/admin/menu')} />
    </div>
  )
}
