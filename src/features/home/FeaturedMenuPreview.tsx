import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import { motion } from 'framer-motion'

const items = [
  { title: 'Burger with Fries', img: 'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?q=80&w=1400&auto=format&fit=crop' },
  { title: 'Fish and Veggie',  img: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1400&auto=format&fit=crop' },
  { title: 'Tofu Chili',       img: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1400&auto=format&fit=crop' },
  { title: 'Egg and Cucumber', img: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1400&auto=format&fit=crop' },
]

export default function FeaturedMenuPreview() {
  return (
    <Section className="bg-[#0f2a26]">
      <Container>
        <div className="text-center mb-25">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Today’s Highlight
          </h2>
          <p className="mt-3 text-white/80 text-base md:text-lg">
            Chef-picked plates you’ll love
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {items.map((it, idx) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: idx * 0.06 }}
              className="relative rounded-[32px] bg-white/7 text-white px-6 pb-10 pt-28 overflow-visible"
            >
              {/* Floating circular dish (centered) */}
              <div className="absolute left-1/2 -top-16 -translate-x-1/2 h-40 w-40 md:h-44 md:w-44 rounded-full overflow-hidden shadow-2xl ring-4 ring-[#0f2a26] z-10">
                <img src={it.img} alt={it.title} className="h-full w-full object-cover" />
              </div>

              <h3 className="mt-2 text-center text-xl font-bold">{it.title}</h3>
              <p className="mt-3 text-center text-white/80 text-sm leading-relaxed max-w-[24ch] mx-auto">
                Lorem ipsum dolor sit, consectetur adipiscing elit, sed do eiusmod tempor
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
