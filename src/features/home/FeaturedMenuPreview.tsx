import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import routes from '../../app/routes'
import { motion } from 'framer-motion'

const items = [
  { title: 'Truffle Pasta', price: '$18', img: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Fire‑Grilled Steak', price: '$24', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Heirloom Salad', price: '$12', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1200&q=80' },
]

export default function FeaturedMenuPreview() {
  return (
    <Section>
      <Container>
        <SectionHeader title="Today’s Highlights" subtitle="A peek at what’s cooking." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((i, idx) => (
            <motion.div key={i.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }}>
              <Card className="overflow-hidden group">
                <img src={i.img} alt={i.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{i.title}</span>
                    <span className="text-brand font-bold">{i.price}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">House‑made and packed with seasonal flavor.</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Button asChild className="bg-brand text-brand-fg">
            <Link to={routes.menu}>View Full Menu</Link>
          </Button>
        </div>
      </Container>
    </Section>
  )
}