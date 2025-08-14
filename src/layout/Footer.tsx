import Container from '../components/common/Container'
import { Separator } from '../components/ui/separator'

export default function Footer() {
  return (
    <footer className="border-t">
      <Container className="py-10 grid gap-8 md:grid-cols-3">
        <div>
          <h4 className="font-semibold text-lg">Bites Restaurant</h4>
          <p className="text-muted-foreground mt-2">Modern cuisine with classic soul. Crafted daily with local ingredients.</p>
        </div>
        <div>
          <h5 className="font-semibold">Hours</h5>
          <p className="text-sm text-muted-foreground mt-2">Mon–Sun: 10:00 – 22:00</p>
        </div>
        <div>
          <h5 className="font-semibold">Contact</h5>
          <p className="text-sm text-muted-foreground mt-2">123 Food Street, Flavor Town</p>
          <p className="text-sm text-muted-foreground">(555) 123‑4567</p>
        </div>
      </Container>
      <Separator />
      <Container className="py-4 text-sm text-muted-foreground flex items-center justify-between">
        <span>© {new Date().getFullYear()} Bites. All rights reserved.</span>
        <a href="#top" className="hover:text-brand">Back to top ↑</a>
      </Container>
    </footer>
  )
}