import { items } from '../../../lib/mockData'
import { Button } from '../../../components/ui/button'
import { Plus, Pencil, Trash2 } from 'lucide-react'

export default function AdminMenuPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xl font-bold">Items</div>
          <div className="text-sm text-muted-foreground">Create, edit, and control availability</div>
        </div>
        <Button><Plus className="w-4 h-4 mr-2" /> New Item</Button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map(i => (
          <div key={i.id} className="rounded-xl border overflow-hidden">
            <img src={i.image} alt={i.name} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="font-semibold">{i.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">{i.desc}</div>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant="outline"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
                <Button size="sm" variant="outline" className="text-red-600"><Trash2 className="w-4 h-4 mr-1" /> Delete</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
