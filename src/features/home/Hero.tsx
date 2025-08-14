import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import { Button } from '../../components/ui/button'
import routes from '../../app/routes'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HERO_PLATE, HERO_SPLASH, HERO_SPLASH2 } from '../../lib/assets'

export default function Hero() {
  return (
    <Section className="pt-10 md:pt-16">
      <Container>
        {/* Relative wrapper so splashes can live outside the grid */}
        <div className="relative">
          {/* Big decorative splash on the bottom-left like the reference */}
          <motion.img
            src={HERO_SPLASH}
            alt="orange splash"
            className="hidden md:block absolute top-45 -left-100 w-[28rem] lg:w-[31rem] xl:w-[34rem] pointer-events-none select-none drop-shadow-xl opacity-90 z-0" // <-- add z-0
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          />

          <div className="grid md:grid-cols-2 gap-10 items-center">
            {/* Left copy */}
            <div className="relative z-30"> {/* <-- change z-20 to z-30 */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-semibold">
                WELCOME TO OUR RESTAURANT
              </div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-4 text-4xl md:text-6xl font-black leading-tight"
              >
                Your <span className="text-brand">Go‑To</span> Spot
                <br /> For Great <span className="text-brand">Food</span> And
                <br /> Good <span className="text-brand">Times</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="mt-4 text-lg text-muted-foreground z-30"
              >
                Join us for delicious meals and memorable moments!
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="mt-6 flex flex-wrap gap-3 z-30"
              >
                <Button asChild className="bg-brand text-brand-fg shadow-lg ">
                  <Link to={routes.menu}>Order Now</Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="#specials">See Specials</a>
                </Button>
              </motion.div>
            </div>

            {/* Right: layered PNG composition (bigger splashes behind, plate on top) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative aspect-[5/4] md:aspect-[4/3] z-10"
            >
              {/* Splash top-left — larger */}
              <motion.img
                src={HERO_SPLASH2}
                alt="orange splash"
                className="absolute -top-12 -left-10 w-48 sm:w-64 md:w-80 lg:w-[26rem] pointer-events-none select-none drop-shadow-xl z-0"
                initial={{ rotate: -10, opacity: 0, y: -12 }}
                animate={{ rotate: -2, opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              />

              {/* Extra splash top-right — behind the plate */}
              <motion.img
                src={HERO_SPLASH2}
                alt="orange splash"
                className="absolute -top-10 right-8 w-48 sm:w-60 md:w-72 lg:w-80 pointer-events-none select-none drop-shadow-xl z-0"
                style={{ transform: 'rotate(8deg)' }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.05 }}
              />

              {/* Splash bottom-right — mirrored and bigger */}
              <motion.img
                src={HERO_SPLASH2}
                alt="orange splash"
                className="absolute -bottom-14 -right-10 w-56 sm:w-72 md:w-96 lg:w-[30rem] pointer-events-none select-none drop-shadow-xl z-0"
                style={{ transform: 'scaleX(-1) rotate(12deg)' }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              />

              {/* Plate on top */}
              <motion.img
                src={HERO_PLATE}
                alt="signature plate"
                className="absolute inset-0 m-auto w-4/5 md:w-[85%] object-contain drop-shadow-2xl z-20"
                initial={{ y: 16, opacity: 0, rotate: -1 }}
                animate={{ y: [16, -4, 0], rotate: [-1, 1, 0], opacity: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
              />
            </motion.div>
          </div>
        </div>
      </Container>
    </Section>
  )
}