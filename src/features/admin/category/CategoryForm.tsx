import { useEffect, useState } from 'react'
import { useCreateCategoryMutation, useUpdateCategoryMutation } from './categoryApi'
import type { Category, CategoryCreate, Status } from '../../../types/catalog'
import { useCreateMediaMutation } from '../media/mediaApi'
import { ImageIcon, XIcon } from 'lucide-react'


export default function CategoryForm({
  initial,
  onDone,
}: {
  initial?: Partial<Category>
  onDone: (saved: Category) => void
}) {
  const [name, setName] = useState(initial?.name ?? '')
  const [description, setDescription] = useState(initial?.description ?? '')
  const [status, setStatus] = useState<Status>((initial?.status as Status) ?? 'active')
  const [image, setImage] = useState<number>(Number(initial?.image) || 0)
  const [err, setErr] = useState<string | null>(null)

  const [createCat, { isLoading: creating }] = useCreateCategoryMutation()
  const [updateCat, { isLoading: updating }] = useUpdateCategoryMutation()
  const [uploadMedia, { isLoading: uploading }] = useCreateMediaMutation()

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    const res = await uploadMedia(fd).unwrap()
    setImage(res.id)
  }

  async function submit() {
    setErr(null)
    if (!name.trim()) return setErr('Name is required')
    if (!image) return setErr('Please upload an image first')
    const payload: CategoryCreate = { name, description, image, status }
    const saved = initial?.id
      ? await updateCat({ id: initial.id!, body: payload }).unwrap()
      : await createCat(payload).unwrap()
    onDone(saved)
  }

  useEffect(() => {
    setName(initial?.name ?? '')
    setDescription(initial?.description ?? '')
    setStatus((initial?.status as Status) ?? 'active')
    setImage(Number(initial?.image) || 0)
  }, [initial])

  return (
    <div className="space-y-3">
      <div>
        <label className="text-sm font-medium">Name</label>
        <input className="w-full border rounded-lg px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label className="text-sm font-medium">Description</label>
        <textarea className="w-full border rounded-lg px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="text-sm font-medium">Status</label>
          <select className="w-full border rounded-lg px-3 py-2" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            <option value="active">active</option>
            <option value="inactive">inactive</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium flex items-center gap-2"><ImageIcon className="w-4 h-4" /> Category Image</label>
          <input type="file" accept="image/*" onChange={handleUpload} disabled={uploading} />
          {image ? <div className="text-xs text-green-600">Uploaded. Media ID: {image}</div> : <div className="text-xs text-gray-500">No image uploaded</div>}
        </div>
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      <div className="flex gap-2 pt-2">
        <button className="px-4 py-2 rounded-lg bg-black text-white disabled:opacity-50" onClick={submit} disabled={creating || updating || uploading}>
          {initial?.id ? 'Update Category' : 'Create Category'}
        </button>
        <button className="px-3 py-2 rounded-lg bg-gray-100" type="button" onClick={() => onDone as any}>
          <XIcon className="w-4 h-4 inline-block mr-1" /> Close
        </button>
      </div>
    </div>
  )
}
