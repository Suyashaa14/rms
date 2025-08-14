import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import { Button } from '../../components/ui/button'

// Example hotel image URL, replace with your own asset if needed
const bgImage =
  'https://plus.unsplash.com/premium_photo-1728454906293-9c2e0a6f10bb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=900&q=80'

export default function ReservationCTA() {
  return (
    <Section id="reserve">
      <Container>
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{ minHeight: '320px' }}
        >
          {/* Background image */}
          <img
            src={bgImage}
            alt="Restaurant background"
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-brand/90 to-brand/80 opacity-90" />
          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-brand-fg text-center px-8 py-12">
            <h3 className="text-3xl md:text-4xl font-bold drop-shadow-lg text-white">Reserve your table</h3>
            <p className="mt-3 text-xl drop-shadow text-white">
              Book instantly — limited seats during peak hours.
            </p>
            <div className="mt-7 flex justify-center">
              <Button variant="secondary" className="text-brand font-semibold shadow-lg shadow-brand/30 hover:scale-105 transition-transform duration-200">
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}