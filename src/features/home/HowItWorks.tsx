// src/features/home/HowItWorks.tsx
import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import { motion, type Variants } from 'framer-motion'

import { SELECT_MENU,  RESTAURANT_LOCATION,
    WAIT_FOR_DELIVERY } from '../../lib/assets'

const steps = [
  {
    no: '01',
    title: 'Select Restaurant',
    desc:
      'Non enim praesent elementum facilisis leo vel fringilla. Lectus proin nibh nisl condimentum id. Quis varius quam quisque id diam vel.',
    img: RESTAURANT_LOCATION,
  },
  {
    no: '02',
    title: 'Select menu',
    desc:
      'Eu mi bibendum neque egestas congue quisque. Nulla facilisi morbi tempus iaculis urna id volutpat lacus. Odio ut sem nulla pharetra diam sit amet.',
    img: SELECT_MENU,
  },
  {
    no: '03',
    title: 'Wait for delivery',
    desc:
      'Nunc lobortis mattis aliquam faucibus. Nibh ipsum consequat nisl vel pretium lectus quam id leo. A scelerisque purus semper eget.',
    img: WAIT_FOR_DELIVERY,
  },
]

const container: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function HowItWorks() {
  return (
    <Section className="bg-white min-h-screen snap-start flex items-center">
      <Container>
        {/* Heading */}
        <div className="mx-auto mb-12 md:mb-16 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Magna sit amet purus gravida quis blandit turpis cursus. Venenatis tellus in
            metus vulputate eu scelerisque felis.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-12 md:grid-cols-3"
        >
          {steps.map((s) => (
            <motion.div key={s.no} variants={item} className="text-center">
              {/* Illustration block */}
              <div className="mx-auto w-[360px] max-w-full">
                <div className="relative">
                  <div className="h-52 md:h-60 flex items-center justify-center">
                    <img
                      src={s.img}
                      alt={s.title}
                      className="h-full w-auto object-contain"
                      loading="lazy"
                    />
                  </div>
                  {/* base line */}
                  <div className="mt-2 h-2 rounded-full bg-gray-900/70 w-10/12 mx-auto" />
                </div>
              </div>

              {/* Number + Title */}
              <div className="mt-6 flex items-end justify-center gap-3">
                <span className="text-4xl md:text-5xl font-extrabold leading-none text-gray-300">
                  {s.no}
                </span>
                <h3 className="text-2xl md:text-3xl font-semibold text-gray-900">
                  {s.title}
                </h3>
              </div>

              {/* Copy */}
              <p className="mt-4 mx-auto max-w-[44ch] text-gray-600 text-base leading-relaxed">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  )
}
