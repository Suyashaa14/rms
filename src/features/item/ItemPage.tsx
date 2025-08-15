import { useParams } from 'react-router-dom'
import Container from '../../components/common/Container'
import { items } from '../../lib/mockData'
import { useMemo, useState } from 'react'
import type { Variant, Modifier, Item } from '../../lib/types'
import { Button } from '../../components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { toMoney } from '../../lib/money'
import { useAppDispatch } from '../../hooks/hooks'
import { addLine } from '../../store/cartSlice'
import { cn } from '../../lib/cn'

export default function ItemPage() {
  const { slug } = useParams()
  const item = useMemo(() => items.find(i => i.slug === slug), [slug]) as Item | undefined

  const [variant, setVariant] = useState<Variant | undefined>(item?.variants?.[0])
  const [selected, setSelected] = useState<Modifier[]>([])
  const [qty, setQty] = useState(1)

  if (!item) return (
    <section className="py-16">
      <Container><div className="text-center text-muted-foreground">Item not found.</div></Container>
    </section>
  )

  const price = useMemo(() => {
    const v = variant?.priceDiff ?? 0
    const m = selected.reduce((s, x) => s + x.priceDiff, 0)
    return (item.basePrice + v + m) * qty
  }, [item.basePrice, variant, selected, qty])

  const dispatch = useAppDispatch()
  const toggleMod = (mod: Modifier) => {
    const exists = selected.find(m => m.id === mod.id)
    if (exists) setSelected(prev => prev.filter(m => m.id !== mod.id))
    else setSelected(prev => [...prev, mod])
  }

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-3xl overflow-hidden border bg-white/70 dark:bg-neutral-900/60">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">{item.name}</h1>
              <p className="text-muted-foreground mt-2">{item.desc}</p>
            </div>

            {item.variants && item.variants.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {item.variants.map(v => (
                    <button
                      key={v.id}
                      onClick={() => setVariant(v)}
                      className={cn(
                        "px-3 py-1.5 rounded-full border text-sm",
                        variant?.id === v.id ? "bg-brand text-brand-fg border-brand" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      )}
                    >
                      {v.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {item.modifierGroups?.map(g => (
              <div key={g.id}>
                <h3 className="font-semibold mb-2">{g.name} {g.required ? <span className="text-red-500">*</span> : null}</h3>
                <div className="flex flex-wrap gap-2">
                  {g.options.map(o => {
                    const active = !!selected.find(s => s.id === o.id)
                    return (
                      <button
                        key={o.id}
                        onClick={() => toggleMod(o)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-sm",
                          active ? "bg-neutral-900 text-white dark:bg-white dark:text-black" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        )}
                      >
                        {o.name} {o.priceDiff ? `(+${toMoney(o.priceDiff)})` : ''}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between">
              <div className="text-2xl font-extrabold">{toMoney(price)}</div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setQty(q => Math.max(1, q - 1))}><Minus className="w-4 h-4" /></Button>
                <div className="w-10 text-center font-semibold">{qty}</div>
                <Button variant="outline" size="icon" onClick={() => setQty(q => q + 1)}><Plus className="w-4 h-4" /></Button>
              </div>
            </div>

            <Button
              className="w-full bg-brand text-brand-fg"
              onClick={() => {
                dispatch(addLine({
                  itemId: item.id,
                  name: item.name,
                  image: item.image,
                  basePrice: item.basePrice,
                  variant,
                  modifiers: selected,
                  qty
                }))
              }}
            >
              Add to cart • {toMoney(price)}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
