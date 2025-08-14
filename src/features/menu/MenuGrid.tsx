import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { motion } from 'framer-motion'

export default function MenuGrid({ items }: { items: { id: number; name: string; price: number; desc: string; img: string }[] }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((i, idx) => (
        <motion.div key={i.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.04 }}>
          <Card className="overflow-hidden group">
            <img src={i.img} alt={i.name} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{i.name}</span>
                <span className="text-brand font-bold">${i.price}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{i.desc}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}