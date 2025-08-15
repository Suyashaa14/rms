import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SectionHeader from '../../components/common/SectionHeader'
import MenuGrid from './MenuGrid'
import data from './data/menu.json'
import { useMemo, useState } from 'react'
import { Input } from '../../components/ui/input'
import { Badge } from '../../components/ui/badge'

export default function MenuPage() {
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return data.categories
    return data.categories.map(c => ({
      ...c,
      items: c.items.filter(i => i.name.toLowerCase().includes(s) || i.desc.toLowerCase().includes(s))
    }))
  }, [q])

  return (
    <Section>
      <Container>
        <SectionHeader title="Our Menu" subtitle="Hand‑picked favorites and seasonal signatures." />
        <div className="max-w-md mx-auto mb-8">
          <Input placeholder="Search dishes…" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <div className="space-y-10">
          {filtered.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <Badge className="bg-brand text-brand-fg">{cat.items.length}</Badge>
              </div>
              <MenuGrid items={cat.items} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}