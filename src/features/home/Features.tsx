import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { motion } from 'framer-motion'
import AnimatedList from '../../components/common/AnimatedList'
import { Leaf, Sparkles, Timer, Utensils } from 'lucide-react'

const list = [
  { icon: <Leaf className="h-6 w-6 text-green-500 bg-green-100 rounded-full p-1" />, title: 'Local & Seasonal', text: 'We partner with nearby farms and change the menu often.' },
  { icon: <Sparkles className="h-6 w-6 text-yellow-500 bg-yellow-100 rounded-full p-1" />, title: 'Curated Ambience', text: 'Warm lighting, great music, and just the right vibe.' },
  { icon: <Timer className="h-6 w-6 text-blue-500 bg-blue-100 rounded-full p-1" />, title: 'Fast Service', text: 'Dine‑in or pick‑up in minutes with optimized workflows.' },
  { icon: <Utensils className="h-6 w-6 text-pink-500 bg-pink-100 rounded-full p-1" />, title: 'Crafted by Chefs', text: 'Every dish is tested and perfected by our culinary team.' },
]

export default function Features() {
  return (
    <Section className="bg-neutral-50">
      <Container>
        <SectionHeader title="Why diners love us" />
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <AnimatedList
            items={list.map((f) => (
              <div
                className="p-6 rounded-2xl border border-neutral-200 bg-white shadow transition hover:shadow-lg flex items-start gap-4"
                key={f.title}
              >
                <div className="flex-shrink-0">{f.icon}</div>
                <div>
                  <h4 className="font-semibold text-gray-900">{f.title}</h4>
                  <p className="text-sm text-gray-500">{f.text}</p>
                </div>
              </div>
            ))}
          />
        </motion.div>
      </Container>
    </Section>
  )
}