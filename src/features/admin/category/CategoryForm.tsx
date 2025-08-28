import { useState } from 'react'
import { Button } from '../../../components/ui/button'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Textarea } from '../../../components/ui/textarea'
import { Image as ImageIcon, Upload, X } from 'lucide-react'
import { useCreateMediaMutation } from '../media/mediaApi'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from './categoryApi'
import type { Category } from '../../../types/catalog'
import AlertPopup from '../../../components/ui/AlertPopup'

type Status = 'active' | 'inactive'

export default function CategoryForm({
  initial,
  onDone,
}: {
  initial?: Partial<Category>
  onDone: (saved?: Category) => void
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? '',
    description: initial?.description ?? '',
    image: (initial as any)?.image ?? null, // will hold media id or url
    status: ((initial as any)?.status ?? 'active') as Status,
  })
  const [filePreview, setFilePreview] = useState<string | null>(null)

  const [createMedia, { isLoading: uploading }] = useCreateMediaMutation()
  const [createCategory, { isLoading: creating }] = useCreateCategoryMutation()
  const [updateCategory, { isLoading: updating }] = useUpdateCategoryMutation()

  const [popup, setPopup] = useState<{
    open: boolean
    type: 'success' | 'error'
    title?: string
    description?: string
    afterClose?: () => void
  }>({ open: false, type: 'success' })

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setFilePreview(URL.createObjectURL(file))

    const fd = new FormData()
    fd.append('file', file)
    try {
      const res = await createMedia(fd).unwrap()
      // assume API returns { id, url } — we store id for payload
      updateField('image', res.id)
      setPopup({
        open: true,
        type: 'success',
        title: 'Image uploaded',
        description: 'Media saved successfully.',
      })
    } catch (err: any) {
      setPopup({
        open: true,
        type: 'error',
        title: 'Image upload failed',
        description: err?.data?.message ?? 'Please try again.',
      })
    }
  }

  async function submit() {
    const payload = {
      name: form.name.trim(),
      description: form.description.trim(),
      image: form.image as number | string, // SAME as create
      status: form.status as Status,
    }

    if (!payload.name) {
      setPopup({ open: true, type: 'error', title: 'Name required', description: 'Please enter a category name.' })
      return
    }
    if (!payload.image) {
      setPopup({ open: true, type: 'error', title: 'Image required', description: 'Please upload an image.' })
      return
    }

    try {
      let saved: Category
      if ((initial as any)?.id) {
        const idNum = Number((initial as any).id)
        saved = await updateCategory({ id: idNum, data: payload }).unwrap()
        setPopup({
          open: true,
          type: 'success',
          title: 'Success',
          description: 'Category updated successfully.',
          afterClose: () => onDone(saved),
        })
      } else {
        saved = await createCategory(payload).unwrap()
        setPopup({
          open: true,
          type: 'success',
          title: 'Success',
          description: 'Category created successfully.',
          afterClose: () => onDone(saved),
        })
      }
    } catch (err: any) {
      setPopup({
        open: true,
        type: 'error',
        title: 'Save failed',
        description: err?.data?.message ?? 'Something went wrong.',
      })
    }
  }

  return (
    <>
      <div className="rounded-2xl border bg-white">
        <div className="p-4 border-b bg-neutral-50">
          <h2 className="font-medium">
            {(initial as any)?.id ? 'Edit Category' : 'Create Category'}
          </h2>
        </div>

        <div className="p-6 grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="e.g., Burgers"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" placeholder="Short description (optional)"
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Image</Label>
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
              <div>
                <label className="inline-flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border bg-white hover:bg-neutral-50">
                  <Upload className="w-4 h-4" />
                  <span>Upload image</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
                {uploading && <div className="text-xs text-muted-foreground mt-1">Uploading…</div>}
                {form.image && !uploading && (
                  <div className="text-xs text-muted-foreground mt-1">Media ID: {String(form.image)}</div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={submit} disabled={creating || updating || uploading}>
              {(initial as any)?.id ? 'Update Category' : 'Create Category'}
            </Button>
            <Button variant="outline" type="button" onClick={() => onDone(undefined)}>
              <X className="w-4 h-4 mr-1" /> Cancel
            </Button>
          </div>
        </div>
      </div>

      <AlertPopup
        open={popup.open}
        type={popup.type}
        title={popup.title}
        description={popup.description}
        onClose={() => {
          const cb = popup.afterClose
          setPopup((p) => ({ ...p, open: false, afterClose: undefined }))
          cb?.()
        }}
      />
    </>
  )
}
