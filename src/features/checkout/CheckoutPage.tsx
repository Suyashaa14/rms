import Container from '../../components/common/Container'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectCart, selectCartTotals, clearCart } from '../../store/cartSlice'
import { toMoney } from '../../lib/money'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function CheckoutPage() {
  const cart = useAppSelector(selectCart)
  const totals = useAppSelector(selectCartTotals)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [addr, setAddr] = useState({ line1: '', city: '', note: '' })

  const placeOrder = () => {
    // MVP: fake success then clear cart
    dispatch(clearCart())
    navigate('/orders/thank-you')
  }

  if (cart.lines.length === 0) {
    return (
      <section className="py-12">
        <Container>
          <div className="text-center">
            <div className="text-lg text-muted-foreground">Your cart is empty.</div>
            <Button asChild className="mt-4">
              <Link to="/menu">Browse menu</Link>
            </Button>
          </div>
        </Container>
      </section>
    )
  }

  return (
    <section className="py-8 md:py-12">
      <Container>
        <h1 className="text-3xl font-extrabold tracking-tight">Checkout</h1>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border p-4 bg-white/70 dark:bg-neutral-900/60">
              <div className="font-semibold mb-2">Contact & Address</div>
              <div className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="Address Line" value={addr.line1} onChange={e => setAddr(a => ({ ...a, line1: e.target.value }))} />
                <Input placeholder="City" value={addr.city} onChange={e => setAddr(a => ({ ...a, city: e.target.value }))} />
                <Input className="sm:col-span-2" placeholder="Delivery Note (optional)" value={addr.note} onChange={e => setAddr(a => ({ ...a, note: e.target.value }))} />
              </div>
            </div>

            <div className="rounded-2xl border p-4 bg-white/70 dark:bg-neutral-900/60">
              <div className="font-semibold mb-2">Payment</div>
              <div className="text-sm text-muted-foreground">MVP: select at delivery (Cash/Card). Integrate Stripe later.</div>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="sticky top-24 rounded-2xl border p-4 bg-gradient-to-b from-white/80 to-white/60 dark:from-neutral-900/60 dark:to-neutral-900/40 backdrop-blur">
              <div className="font-semibold mb-3">Summary</div>
              <div className="space-y-2 text-sm">
                <Row label="Items" value={cart.lines.length} />
                <Row label="Total" value={toMoney(totals.grandTotal)} />
              </div>
              <Button className="w-full mt-4 bg-brand text-brand-fg" onClick={placeOrder}>
                Place Order • {toMoney(totals.grandTotal)}
              </Button>
              <Button asChild variant="outline" className="w-full mt-2">
                <Link to="/cart">Back to Cart</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Row({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </div>
  )
}
