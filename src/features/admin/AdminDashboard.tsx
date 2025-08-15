import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-4 gap-4">
        <Stat title="Live Orders" value="0" />
        <Stat title="Revenue (Today)" value="Rs. 0.00" />
        <Stat title="Avg Prep Time" value="—" />
        <Stat title="Low Stock" value="2" />
      </div>

      <section className="grid md:grid-cols-3 gap-4">
        <Card title="Orders Queue" hint="Incoming orders and status">
          <Button variant="outline" asChild><Link to="/admin/orders">Open Queue</Link></Button>
        </Card>
        <Card title="Menu Manager" hint="Add/update items, pricing, availability">
          <Button variant="outline" asChild><Link to="/admin/menu">Manage Menu</Link></Button>
        </Card>
        <Card title="Customers" hint="View users and activity">
          <Button variant="outline" asChild><Link to="/admin/users">Open Customers</Link></Button>
        </Card>
      </section>
    </div>
  )
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4 bg-gradient-to-br from-white/90 to-white/70 dark:from-neutral-900/70 dark:to-neutral-900/40">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-lg font-extrabold mt-1">{value}</div>
    </div>
  )
}

function Card({ title, hint, children }: { title: string; hint?: string; children?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5 bg-white/80 dark:bg-neutral-900/60">
      <h3 className="font-semibold">{title}</h3>
      {hint && <p className="text-sm text-muted-foreground mb-3">{hint}</p>}
      {children}
    </div>
  )
}
