import Hero from './Hero'
import Specials from './Specials'
import Features from './Features'
import Testimonials from './Testimonials'
import FeaturedMenuPreview from './FeaturedMenuPreview'
import ReservationCTA from './ReservationCTA'
import CategoryBrowser from './CategoryBrowser'
import AutoScrollGallery from './AutoScrollGallery'
import PromoBanner from './PromoBanner'
import HowItWorks from './HowItWorks'

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryBrowser />
      <FeaturedMenuPreview />
      <AutoScrollGallery />
      <PromoBanner/>
      <HowItWorks/>
      {/* <Specials />
      <Features />
      <Testimonials /> */}
      <ReservationCTA />
    </>
  )
}