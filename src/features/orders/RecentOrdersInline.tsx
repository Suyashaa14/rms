// src/features/orders/RecentOrdersInline.tsx
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'
import { motion } from 'framer-motion'
import { toMoney } from '../../lib/money'

const mock = [
  { id: 'O-1029', date: '2025-08-12', total: 189900, status: 'Delivered' },
  { id: 'O-1028', date: '2025-08-05', total: 99900, status: 'Cancelled' },
  { id: 'O-1027', date: '2025-08-01', total: 124900, status: 'Delivered' },
]

export default function RecentOrdersInline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border bg-white/80 dark:bg-neutral-900/60 p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold">Recent orders</h3>
        <Button variant="outline" size="sm" asChild>
          <Link to="/orders/history">View all</Link>
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-muted-foreground">
            <tr>
              <th className="py-2">Order</th>
              <th>Date</th>
              <th>Status</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {mock.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="py-3 font-medium">{o.id}</td>
                <td className="py-3">{o.date}</td>
                <td className="py-3">{o.status}</td>
                <td className="py-3 text-right">{toMoney(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.section>
  )
}
