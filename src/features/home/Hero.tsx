import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import { Button } from '../../components/ui/button'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

// Simple typing effect hook
function useTyping(text: string, speed = 80) { // slowed speed
  const [output, setOutput] = useState('')
  useEffect(() => {
    setOutput('')
    let i = 0
    const id = setInterval(() => {
      setOutput(text.slice(0, ++i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return output
}

export default function Hero() {
  const headline = useTyping('Crafted with fire. Served with heart.', 70)
  const subline  = useTyping('Fresh, seasonal and made to remember', 70)

  const videoRef = useRef<HTMLVideoElement | null>(null)

  return (
    <Section className="relative overflow-hidden p-0 md:pt-0">
      {/* Background video */}
      <div className="absolute inset-0 -z-10">
        <video
          ref={videoRef}
          className="h-full w-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
          // poster="https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1887&auto=format&fit=crop"
        >
          <source src="https://videos.pexels.com/video-files/8180948/8180948-uhd_2732_1440_25fps.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content Centered */}
      <Container className="min-h-[80vh] flex flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
        >
          {headline}<span className="opacity-0">_</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 text-lg md:text-2xl text-white/90 max-w-2xl"
        >
          {subline}<span className="opacity-0">_</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-8 flex flex-wrap justify-center gap-4"
        >
          <Button asChild size="lg" className="bg-brand hover:bg-brand/90 text-white">
            <Link to="/menu">Explore Menu</Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-black hover:text-white"
          >
            <Link to="/reservation">Book a Table</Link>
          </Button>
        </motion.div>
      </Container>
    </Section>
  )
}
