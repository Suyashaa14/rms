import Container from '../../components/common/Container'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { selectCart, selectCartTotals, removeLine, setQty, setDeliveryMethod, applyCoupon, clearCoupon } from '../../store/cartSlice'
import { toMoney, pct } from '../../lib/money'
import { Button } from '../../components/ui/button'
import { Minus, Plus, X } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CartPage() {
  const cart = useAppSelector(selectCart)
  const totals = useAppSelector(selectCartTotals)
  const dispatch = useAppDispatch()

  return (
    <section className="py-8 md:py-12">
      <Container>
        <h1 className="text-3xl font-extrabold tracking-tight">Your Cart</h1>

        {cart.lines.length === 0 ? (
          <div className="mt-8 text-center text-muted-foreground">
            Your cart is empty. <Link className="text-brand font-semibold" to="/menu">Browse the menu</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2 space-y-4">
              {cart.lines.map(line => (
                <div key={line.id} className="flex items-center gap-4 rounded-2xl border bg-white/70 dark:bg-neutral-900/60 p-3">
                  <img src={line.image} alt={line.name} className="w-24 h-20 object-cover rounded-xl" />
                  <div className="flex-1">
                    <div className="font-semibold">{line.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {line.variant ? `• ${line.variant.name} ` : '' }
                      {line.modifiers?.length ? `• ${line.modifiers.map(m => m.name).join(', ')}` : ''}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="icon" onClick={() => dispatch(setQty({ id: line.id, qty: line.qty - 1 }))}><Minus className="w-4 h-4" /></Button>
                      <div className="w-10 text-center font-semibold">{line.qty}</div>
                      <Button variant="outline" size="icon" onClick={() => dispatch(setQty({ id: line.id, qty: line.qty + 1 }))}><Plus className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{toMoney(line.lineTotal)}</div>
                    <Button variant="ghost" size="icon" onClick={() => dispatch(removeLine(line.id))}><X className="w-5 h-5" /></Button>
                  </div>
                </div>
              ))}

              <div className="rounded-2xl border p-4 bg-white/70 dark:bg-neutral-900/60">
                <div className="font-semibold mb-2">Order type</div>
                <div className="flex gap-2">
                  <Button
                    variant={cart.deliveryMethod === 'pickup' ? 'default' : 'outline'}
                    onClick={() => dispatch(setDeliveryMethod('pickup'))}
                  >
                    Pickup (Free)
                  </Button>
                  <Button
                    variant={cart.deliveryMethod === 'delivery' ? 'default' : 'outline'}
                    onClick={() => dispatch(setDeliveryMethod('delivery'))}
                  >
                    Delivery (+{toMoney(5000)})
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border p-4 bg-white/70 dark:bg-neutral-900/60">
                <div className="font-semibold mb-2">Coupon</div>
                <div className="flex gap-2">
                  <Button onClick={() => dispatch(applyCoupon({ code: 'WELCOME15', type: 'percent', value: 15 }))}>
                    Apply WELCOME15 ({pct(15)})
                  </Button>
                  {cart.coupon && (
                    <Button variant="outline" onClick={() => dispatch(clearCoupon())}>
                      Remove {cart.coupon.code}
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-24 rounded-2xl border p-4 bg-gradient-to-b from-white/80 to-white/60 dark:from-neutral-900/60 dark:to-neutral-900/40 backdrop-blur">
                <div className="font-semibold mb-3">Order Summary</div>
                <div className="space-y-2 text-sm">
                  <Row label="Subtotal" value={toMoney(totals.subtotal)} />
                  <Row label={`Discount ${cart.coupon ? `(${cart.coupon.code})` : ''}`} value={toMoney(-totals.discount)} />
                  <Row label={`Tax (${pct(cart.taxRate)})`} value={toMoney(totals.tax)} />
                  <Row label="Fees" value={toMoney(totals.fees)} />
                  <div className="pt-2 border-t mt-2" />
                  <Row label={<span className="font-bold">Total</span>} value={<span className="font-extrabold">{toMoney(totals.grandTotal)}</span>} />
                </div>
                <Button asChild className="w-full mt-4 bg-brand text-brand-fg">
                  <Link to="/checkout">Proceed to Checkout</Link>
                </Button>
                <Button asChild variant="outline" className="w-full mt-2">
                  <Link to="/menu">Add more items</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
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
