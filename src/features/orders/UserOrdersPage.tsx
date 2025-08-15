import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { toMoney } from '../../lib/money'

const mock = [
  { id: 'O-1029', date: '2025-08-12', total: 189900, status: 'Delivered' },
  { id: 'O-1028', date: '2025-08-05', total: 99900, status: 'Cancelled' },
]

export default function UserOrdersPage() {
  return (
    <div className="space-y-4">
      <table className="w-full text-sm">
        <thead className="text-left text-muted-foreground">
          <tr>
            <th className="py-2">Order</th>
            <th className="py-2">Date</th>
            <th className="py-2">Total</th>
            <th className="py-2">Status</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {mock.map(o => (
            <tr key={o.id} className="border-t">
              <td className="py-3 font-medium">{o.id}</td>
              <td className="py-3">{o.date}</td>
              <td className="py-3">{toMoney(o.total)}</td>
              <td className="py-3">
                <span className="px-2 py-1 rounded-full text-xs bg-neutral-100 dark:bg-neutral-800">
                  {o.status}
                </span>
              </td>
              <td className="py-3 text-right">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/orders/${o.id}`}>View</Link>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-xs text-muted-foreground">Showing last {mock.length} orders</div>
    </div>
  )
}
