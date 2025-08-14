import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedList({ items }: { items: ReactNode[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        show: { transition: { staggerChildren: 0.12 } },
      }}
      className="grid gap-4"
    >
      {items.map((child, i) => (
        <motion.li
          key={i}
          variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
        >
          {child}
        </motion.li>
      ))}
    </motion.ul>
  )
}