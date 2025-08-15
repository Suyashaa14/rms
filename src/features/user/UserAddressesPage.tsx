import { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'

export default function UserAddressesPage() {
  const [list, setList] = useState([{ id: 'a1', line1: '123 Lakeside Rd', city: 'Kathmandu' }])
  const [addr, setAddr] = useState({ line1: '', city: '' })

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-3">Add address</div>
        <div className="grid sm:grid-cols-2 gap-2">
          <Input placeholder="Address line" value={addr.line1} onChange={e => setAddr(a => ({ ...a, line1: e.target.value }))} />
          <Input placeholder="City" value={addr.city} onChange={e => setAddr(a => ({ ...a, city: e.target.value }))} />
        </div>
        <Button
          className="mt-3"
          onClick={() => {
            if (!addr.line1 || !addr.city) return
            setList(prev => [...prev, { id: String(Date.now()), line1: addr.line1, city: addr.city }])
            setAddr({ line1: '', city: '' })
          }}
        >
          Save address
        </Button>
      </div>

      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-3">Saved addresses</div>
        <div className="space-y-2">
          {list.map(a => (
            <div key={a.id} className="flex items-center justify-between border rounded-lg p-3">
              <div className="text-sm">{a.line1}, {a.city}</div>
              <Button variant="outline" size="sm" onClick={() => setList(prev => prev.filter(x => x.id !== a.id))}>Remove</Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
