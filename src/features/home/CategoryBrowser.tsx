import Section from '../../components/common/Section'
import Container from '../../components/common/Container'

const categories = [
  { name: 'Italian', img: 'https://images.pexels.com/photos/1437267/pexels-photo-1437267.jpeg?q=80&w=800&auto=format&fit=crop' },
  { name: 'Thai', img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800&auto=format&fit=crop' },
  { name: 'Chinese', img: 'https://images.pexels.com/photos/2089712/pexels-photo-2089712.jpeg?q=80&w=800&auto=format&fit=crop' },
  { name: 'Mexican', img: 'https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?q=80&w=800&auto=format&fit=crop' },
  { name: 'Indian', img: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop' },
  { name: 'Japanese', img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?q=80&w=800&auto=format&fit=crop' },
  { name: 'American', img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop' },
]

export default function CategoryBrowser() {
  return (
    <Section>
      <Container>
        {/* Centered Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
          Browse by category
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-8">
          {categories.map((c) => (
            <div key={c.name} className="text-center">
              <div className="mx-auto h-24 w-24 md:h-28 md:w-28 rounded-full overflow-hidden ring-2 ring-black/10">
                <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-3 text-base md:text-lg font-medium">
                {c.name}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
