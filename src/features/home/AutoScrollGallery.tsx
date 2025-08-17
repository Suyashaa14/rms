import Section from '../../components/common/Section'
import { motion } from 'framer-motion'

const imgs = [
  'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/262959/pexels-photo-262959.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/1059943/pexels-photo-1059943.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/70497/pexels-photo-70497.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?q=80&w=1600&auto=format&fit=crop',
  'https://images.pexels.com/photos/2232/vegetables-italian-pizza-restaurant.jpg?q=80&w=1600&auto=format&fit=crop',
]

export default function AutoScrollGallery() {
  const list = [...imgs, ...imgs] // duplicate for seamless loop

  return (
    <Section className="p-0 bg-white">
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            duration: 30, // slower or faster
            ease: 'linear',
            repeat: Infinity
          }}
          style={{ minWidth: '200%' }}
        >
          {list.map((src, i) => (
            <div
              key={i}
              className="shrink-0 w-[85vw] sm:w-[60vw] md:w-[40vw] lg:w-[32vw] h-[220px] sm:h-[260px] md:h-[320px]"
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  )
}
