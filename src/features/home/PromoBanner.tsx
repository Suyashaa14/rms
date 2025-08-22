// src/features/home/PromoBanner.tsx
import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function PromoBanner() {
  return (
    <Section className="min-h-screen snap-start flex items-center py-0 md:py-0">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[36px] md:rounded-[44px] bg-[#d9bd6e]"
        >
          {/* texture + tint */}
          <img
            src="https://images.unsplash.com/photo-1615714024786-7b1d0b6f9b90?q=80&w=1920&auto=format&fit=crop"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply pointer-events-none select-none"
          />
          <div className="absolute inset-0 bg-[#d9bd6e]/88" />

          <div className="relative grid items-center gap-10 px-6 py-12 md:grid-cols-2 md:px-14 md:py-16 lg:px-20">
            {/* LEFT: artwork */}
            <div className="relative h-[280px] sm:h-[320px] md:h-[380px]">
              {/* wrapper has NO overflow so badge can hang out */}
              <div className="absolute left-1/2 top-6 -translate-x-1/2 z-10">
                {/* plate image (clipped) */}
                <div className="h-56 w-56 sm:h-64 sm:w-64 md:h-80 md:w-80 rounded-full overflow-hidden ring-[10px] ring-[#d9bd6e] shadow-2xl">
                  <img
                    src="https://images.pexels.com/photos/1860208/pexels-photo-1860208.jpeg?q=80&w=1600&auto=format&fit=crop"
                    alt="Promo dish"
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* badge is a SIBLING so it won't be clipped */}
                <div className="absolute -top-6 -left-6 grid h-24 w-24 sm:h-28 sm:w-28 place-items-center rounded-full bg-white/95 shadow-xl">
                  <div className="text-center leading-tight">
                    <div className="text-xs sm:text-sm text-neutral-700">Save</div>
                    <div className="text-2xl sm:text-3xl font-extrabold">55%</div>
                  </div>
                </div>
              </div>

              {/* small circle overlapping from left */}
              <div className="absolute left-6 sm:left-10 bottom-6 h-28 w-28 sm:h-32 sm:w-32 rounded-full overflow-hidden ring-[6px] ring-[#d9bd6e] shadow-xl z-0">
                <img
                  src="https://images.unsplash.com/photo-1432139555190-58524dae6a55?q=80&w=1200&auto=format&fit=crop"
                  alt="Side dish"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* RIGHT: copy */}
            <div className="text-neutral-900">
              <div className="text-sm md:text-base tracking-[0.22em] font-semibold uppercase">
                Today Special Offer
              </div>

              <h3 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.05]">
                Explore Irresistible
                <br className="hidden lg:block" /> Promotions!
              </h3>

              <p className="mt-5 max-w-xl text-neutral-800/80 text-sm md:text-base leading-relaxed">
                Contrasted dissimilar get joy you instrument out reasonably. Again keeps at
                no meant stuff. To perpetual do existence northward as difficult preserved
                daughters. Continued at up to zealously necessary.
              </p>

              <div className="mt-8">
                <Button
                  asChild
                  size="lg"
                  className="rounded-full bg-stone-700 hover:bg-stone-800 text-white px-6 py-6 md:py-7 shadow-md"
                >
                  <Link to="/menu">Order Today</Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}
