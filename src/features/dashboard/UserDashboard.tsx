import Container from '../../components/common/Container'
import { Link } from 'react-router-dom'
import { Button } from '../../components/ui/button'

export default function UserDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-4">
        <Stat title="Orders" value="0" />
        <Stat title="Saved Addresses" value="1" />
        <Stat title="Loyalty Points" value="120" />
      </div>

      <section className="grid md:grid-cols-2 gap-4">
        <Card title="Quick actions">
          <div className="flex gap-2">
            <Button asChild><Link to="/menu">Browse Menu</Link></Button>
            <Button variant="outline" asChild><Link to="/cart">View Cart</Link></Button>
          </div>
        </Card>

        <Card title="Recent orders">
          <p className="text-sm text-muted-foreground">No orders yet. Start with our specials!</p>
        </Card>
      </section>
    </div>
  )
}

function Stat({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border p-4 bg-gradient-to-br from-white/90 to-white/70 dark:from-neutral-900/70 dark:to-neutral-900/40">
      <div className="text-sm text-muted-foreground">{title}</div>
      <div className="text-2xl font-extrabold mt-1">{value}</div>
    </div>
  )
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border p-5 bg-white/80 dark:bg-neutral-900/60">
      <h3 className="font-semibold mb-2">{title}</h3>
      {children}
    </div>
  )
}
