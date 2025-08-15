import { useState } from 'react'
import { Input } from '../../../components/ui/input'
import { Button } from '../../../components/ui/button'

export default function AdminCouponsPage() {
  const [list, setList] = useState([{ code: 'WELCOME15', type: 'percent', value: 15 }])
  const [code, setCode] = useState(''), [value, setValue] = useState(10)

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-2">Create coupon</div>
        <div className="grid sm:grid-cols-3 gap-2">
          <Input placeholder="CODE" value={code} onChange={e => setCode(e.target.value.toUpperCase())} />
          <Input type="number" placeholder="Value (%)" value={value} onChange={e => setValue(+e.target.value)} />
          <Button onClick={() => { if (!code) return; setList(prev => [...prev, { code, type: 'percent', value }]); setCode(''); setValue(10) }}>Add</Button>
        </div>
      </div>

      <div className="rounded-xl border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left bg-neutral-50 dark:bg-neutral-900/50">
            <tr>
              <th className="py-2 px-3">Code</th>
              <th className="py-2 px-3">Type</th>
              <th className="py-2 px-3">Value</th>
            </tr>
          </thead>
          <tbody>
            {list.map((c, i) => (
              <tr key={i} className="border-t">
                <td className="py-2 px-3 font-medium">{c.code}</td>
                <td className="py-2 px-3">{c.type}</td>
                <td className="py-2 px-3">{c.value}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
