import Hero from './Hero'
import Specials from './Specials'
import Features from './Features'
import Testimonials from './Testimonials'
import FeaturedMenuPreview from './FeaturedMenuPreview'
import ReservationCTA from './ReservationCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedMenuPreview />
      <Specials />
      <Features />
      <Testimonials />
      <ReservationCTA />
    </>
  )
}