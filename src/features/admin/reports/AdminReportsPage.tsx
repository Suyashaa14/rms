import { toMoney } from '../../../lib/money'

export default function AdminReportsPage() {
  // mock aggregates
  const today = { orders: 12, revenue: 1299900, avgOrder: 108325 }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Stat title="Orders (Today)" value={String(today.orders)} />
        <Stat title="Revenue (Today)" value={toMoney(today.revenue)} />
        <Stat title="Avg Order Value" value={toMoney(today.avgOrder)} />
      </div>

      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-2">Trends</div>
        <div className="text-sm text-muted-foreground">Integrate charts later (Recharts). For now, add your CSV export here.</div>
      </div>
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
