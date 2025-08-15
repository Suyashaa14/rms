import { Link } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { toMoney } from '../../../lib/money'

const queue = [
  { id: 'O-1035', customer: 'Maya S', total: 129900, status: 'Preparing', time: '2 min ago' },
  { id: 'O-1034', customer: 'Sagar P', total: 89900, status: 'New', time: '5 min ago' },
]

export default function AdminOrdersPage() {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {queue.map(o => (
          <div key={o.id} className="rounded-xl border p-4 bg-white/70 dark:bg-neutral-900/60">
            <div className="flex items-center justify-between">
              <div className="font-semibold">{o.id}</div>
              <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-200">{o.status}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1">by {o.customer} • {o.time}</div>
            <div className="mt-3 font-bold">{toMoney(o.total)}</div>
            <div className="mt-3 flex gap-2">
              <Button size="sm" asChild><Link to={`/admin/orders/${o.id}`}>Open</Link></Button>
              <Button size="sm" variant="outline">Mark Preparing</Button>
              <Button size="sm" variant="outline">Ready</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
