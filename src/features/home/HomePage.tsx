import Hero from './Hero'
import Specials from './Specials'
import Features from './Features'
import Testimonials from './Testimonials'
import RecentOrdersInline from '../orders/RecentOrdersInline'
import { useAppSelector } from '../../hooks/hooks'
import FeaturedMenuPreview from './FeaturedMenuPreview'
import ReservationCTA from './ReservationCTA'
import CategoryBrowser from './CategoryBrowser'
import AutoScrollGallery from './AutoScrollGallery'
import PromoBanner from './PromoBanner'
import HowItWorks from './HowItWorks'

export default function HomePage() {
  const auth = useAppSelector((s) => s.auth)
  return (
    <>
      <Hero />
      <CategoryBrowser />
      <FeaturedMenuPreview />
      <AutoScrollGallery />
      <PromoBanner />
      <HowItWorks />

      {auth?.user && (
        <div className="mt-6">
          <RecentOrdersInline />
        </div>
      )}

      {/* <Specials />
      <Features />
      <Testimonials /> */}
      <ReservationCTA />
    </>
  )
}