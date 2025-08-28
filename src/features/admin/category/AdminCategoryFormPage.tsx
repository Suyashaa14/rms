import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import CategoryForm from './CategoryForm'
import { useGetCategoriesQuery } from './categoryApi'
import type { Category } from '../../../types/catalog'

export default function AdminCategoryFormPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id?: string }>()
  const isEdit = Boolean(id)

  const { data, isLoading, isError } = useGetCategoriesQuery(undefined, { refetchOnMountOrArgChange: true })
  const initial: Category | undefined = isEdit
    ? (data?.result ?? []).find((c: Category) => String(c.id) === String(id))
    : undefined

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="flex items-center gap-3 mb-3">
        <Button asChild variant="ghost" className="-ml-2">
          <Link to="/admin/categories"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Link>
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{isEdit ? 'Edit Category' : 'Create Category'}</h1>
          <p className="text-sm text-muted-foreground">{isEdit ? 'Update category details' : 'Add a new category'}</p>
        </div>
      </div>

      {isEdit && isLoading && <div className="text-sm text-muted-foreground">Loading…</div>}
      {isEdit && isError && <div className="text-sm text-red-600">Failed to load category.</div>}
      {isEdit && !initial && <div className="rounded-lg bg-white/70 dark:bg-neutral-900/60 p-4 text-sm">Category not found.</div>}

      <div className="py-2">
        <CategoryForm initial={initial} onDone={() => navigate('/admin/categories')} />
      </div>
    </div>
  )
}
