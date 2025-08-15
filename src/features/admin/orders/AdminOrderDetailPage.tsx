import { useParams } from 'react-router-dom'
import { Button } from '../../../components/ui/button'
import { toMoney } from '../../../lib/money'

const lines = [
  { name: 'Crispy Chicken Burger • Medium', qty: 1, price: 84900 },
  { name: 'Sparkling Lemonade', qty: 1, price: 24900 },
]

export default function AdminOrderDetailPage() {
  const { id } = useParams()
  const subtotal = lines.reduce((s, l) => s + l.price, 0)
  const tax = Math.floor(subtotal * 0.13)
  const total = subtotal + tax + 5000

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 rounded-xl border p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold">Order {id}</div>
            <div className="text-sm text-muted-foreground">Customer: Maya S • Kathmandu</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Accept</Button>
            <Button variant="outline">Ready</Button>
            <Button variant="outline">Out for Delivery</Button>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {lines.map((l, i) => (
            <div key={i} className="flex items-center justify-between text-sm">
              <span>{l.name} × {l.qty}</span>
              <span className="font-medium">{toMoney(l.price)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-2">Summary</div>
        <Row label="Subtotal" value={toMoney(subtotal)} />
        <Row label="Tax (13%)" value={toMoney(tax)} />
        <Row label="Delivery" value={toMoney(5000)} />
        <div className="border-t my-2" />
        <Row label={<b>Total</b>} value={<b>{toMoney(total)}</b>} />
      </div>
    </div>
  )
}
function Row({ label, value }: { label: any; value: any }) {
  return <div className="flex items-center justify-between text-sm"><span className="text-muted-foreground">{label}</span><span>{value}</span></div>
}
