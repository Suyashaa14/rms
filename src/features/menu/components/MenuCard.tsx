import { Link } from 'react-router-dom'
import { toMoney } from '../../../lib/money'
import {type Item } from '../../../lib/types'
import { Star } from 'lucide-react'
import { cn } from '../../../lib/cn'

export default function MenuCard({ item }: { item: Item }) {
  const fromPrice = item.basePrice + (item.variants?.[0]?.priceDiff ?? 0)
  return (
    <Link
      to={`/item/${item.slug}`}
      className="group rounded-2xl overflow-hidden bg-white/70 dark:bg-neutral-900/60 border hover:shadow-xl transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform"
        />
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg leading-tight">{item.name}</h3>
          {item.rating && (
            <span className="inline-flex items-center gap-1 text-amber-500 text-sm">
              <Star className="w-4 h-4 fill-current" />
              {item.rating.toFixed(1)}
            </span>
          )}
        </div>
        <p className={cn("text-sm text-muted-foreground line-clamp-2")}>{item.desc}</p>
        <div className="pt-1 font-semibold">{toMoney(fromPrice)}</div>
        <div className="flex gap-2 pt-1">
          {item.tags?.slice(0, 3).map(t => (
            <span key={t} className="text-xs bg-brand/10 text-brand px-2 py-1 rounded-full">
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
