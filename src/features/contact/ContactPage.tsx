import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { Input } from '../../components/ui/input'
import { Textarea } from '../../components/ui/textarea'
import { Button } from '../../components/ui/button'
import { Mail, User, MessageSquare } from 'lucide-react'
import { HERO_SPLASH } from '../../lib/assets'

export default function ContactPage() {
  return (
    <Section className="relative bg-gradient-to-br from-brand/10 via-neutral-50 to-white overflow-hidden">
      {/* Decorative splash image for color pop (top left) */}
      <img
        src={HERO_SPLASH}
        alt="Decorative splash"
        className="absolute -top-24 -left-32 w-[420px] opacity-90 pointer-events-none select-none z-0"
      />
      {/* Decorative splash image for color pop (bottom right) */}
      <img
        src={HERO_SPLASH}
        alt="Decorative splash"
        className="absolute -bottom-24 -right-32 w-[420px] opacity-80 pointer-events-none select-none z-0"
      />
      <Container>
        <SectionHeader
          title="Contact Us"
          subtitle="We’re here to help. Reach out for reservations, events, or feedback."
        />
        <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Contact Form */}
          <form className="space-y-7 w-full flex flex-col justify-between">
            <div className="grid md:grid-cols-2 gap-5">
              <div className="relative">
                <User className="absolute left-2 top-4 h-7 w-7 text-green-500 bg-green-100 rounded-full p-1 shadow" />
                <Input
                  placeholder="Your Name"
                  required
                  className="pl-14 bg-neutral-50 focus:bg-white focus:border-green-400 rounded-lg shadow-sm h-14 text-base"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-2 top-4 h-7 w-7 text-blue-500 bg-blue-100 rounded-full p-1 shadow" />
                <Input
                  type="email"
                  placeholder="Your Email"
                  required
                  className="pl-14 bg-neutral-50 focus:bg-white focus:border-blue-400 rounded-lg shadow-sm h-14 text-base"
                />
              </div>
            </div>
            <Input
              placeholder="Subject"
              className="bg-neutral-50 focus:bg-white focus:border-brand rounded-lg shadow-sm pl-4 h-14 text-base"
            />
            <div className="relative">
              <MessageSquare className="absolute left-2 top-4 h-7 w-7 text-pink-500 bg-pink-100 rounded-full p-1 shadow" />
              <Textarea
                placeholder="Your Message"
                rows={7}
                className="pl-14 bg-neutral-50 focus:bg-white focus:border-pink-400 rounded-lg shadow-sm resize-none h-36 text-base"
              />
            </div>
            <Button className="bg-gradient-to-r from-pink-500 via-brand to-yellow-400 text-white w-full py-4 font-semibold shadow-lg hover:brightness-110 transition text-lg rounded-lg">
              Send Message
            </Button>
          </form>

          {/* Map */}
          <div className="flex items-center justify-center w-full">
            <div className="rounded-2xl overflow-hidden border border-neutral-200 shadow-lg w-full h-[420px] bg-white flex">
              <iframe
                title="Map: Thamel, Kathmandu"
                src="https://www.google.com/maps?q=Thamel%2C%20Kathmandu&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[420px]"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}