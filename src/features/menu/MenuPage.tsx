import Container from '../../components/common/Container'
import { categories, items } from '../../lib/mockData'
import MenuCard from './components/MenuCard'
import { useState, useMemo } from 'react'
import { Input } from '../../components/ui/input'
import { cn } from '../../lib/cn'

export default function MenuPage() {
  const [activeCat, setActiveCat] = useState<string>('all')
  const [q, setQ] = useState('')

  const list = useMemo(() => {
    let filtered = items.filter(i => i.active)
    if (activeCat !== 'all') filtered = filtered.filter(i => i.categoryId === activeCat)
    if (q.trim()) {
      const s = q.toLowerCase()
      filtered = filtered.filter(i => i.name.toLowerCase().includes(s) || i.desc.toLowerCase().includes(s))
    }
    return filtered
  }, [activeCat, q])

  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">Explore the Menu</h1>
          <div className="w-full md:w-80">
            <Input value={q} onChange={e => setQ(e.target.value)} placeholder="Search dishes…" />
          </div>
        </div>

        <div className="flex gap-2 overflow-auto mt-6 pb-2">
          <button
            onClick={() => setActiveCat('all')}
            className={cn(
              "px-3 py-1.5 rounded-full border",
              activeCat === 'all' ? "bg-brand text-brand-fg border-brand" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
            )}
          >
            All
          </button>
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCat(c.id)}
              className={cn(
                "px-3 py-1.5 rounded-full border",
                activeCat === c.id ? "bg-brand text-brand-fg border-brand" : "hover:bg-neutral-100 dark:hover:bg-neutral-800"
              )}
            >
              {c.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {list.map(item => <MenuCard key={item.id} item={item} />)}
        </div>
      </Container>
    </section>
  )
}
