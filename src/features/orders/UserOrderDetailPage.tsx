import { useParams } from 'react-router-dom'
import { toMoney } from '../../lib/money'

const lines = [
  { name: 'Signature Smash Burger • Large', qty: 1, price: 109900 },
  { name: 'Sparkling Lemonade', qty: 2, price: 49800 },
]

export default function UserOrderDetailPage() {
  const { id } = useParams()
  const subtotal = lines.reduce((s, l) => s + l.price, 0)
  const tax = Math.floor(subtotal * 0.13)
  const fees = 6500
  const total = subtotal + tax + fees

  return (
    <div className="space-y-6">
      <div className="rounded-xl border p-4 bg-white/70 dark:bg-neutral-900/60">
        <div className="font-semibold">Order {id}</div>
        <div className="text-sm text-muted-foreground">Placed on 2025-08-12 • Delivered</div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 rounded-xl border p-4 bg-white/70 dark:bg-neutral-900/60">
          <div className="font-semibold mb-3">Items</div>
          <div className="space-y-2">
            {lines.map((l, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="text-sm">{l.name} × {l.qty}</div>
                <div className="text-sm font-medium">{toMoney(l.price)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border p-4 bg-white/70 dark:bg-neutral-900/60">
          <div className="font-semibold mb-3">Summary</div>
          <Row label="Subtotal" value={toMoney(subtotal)} />
          <Row label="Tax (13%)" value={toMoney(tax)} />
          <Row label="Fees" value={toMoney(fees)} />
          <div className="border-t my-2" />
          <Row label={<b>Total</b>} value={<b>{toMoney(total)}</b>} />
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: any; value: any }) {
  return <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>
}
