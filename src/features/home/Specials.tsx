import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { Badge } from '../../components/ui/badge'
import { ChefHat, Flame, Utensils } from 'lucide-react' // <-- Lucide icons

const specials = [
	{
		name: 'Chef’s Tasting',
		desc: 'Five‑course seasonal journey',
		tag: 'Limited',
		icon: <ChefHat size={40} className="text-brand" />,
	},
	{
		name: 'Wood‑Fired Fridays',
		desc: 'Rotating pizzas from our kiln',
		tag: 'Every Fri',
		icon: <Flame size={40} className="text-orange-500" />,
	},
	{
		name: 'Brunch & Bubbles',
		desc: 'Weekends 10–2 with mimosas',
		tag: 'Weekend',
		icon: <Utensils size={40} className="text-yellow-400" />,
	},
]

export default function Specials() {
	return (
		<Section className="bg-muted/40">
			<Container>
				<SectionHeader
					title="Special Experiences"
					subtitle="Make it a date — or a tradition."
				/>
				<div className="grid md:grid-cols-3 gap-8">
					{specials.map((s) => (
						<div
							key={s.name}
							className="flex flex-col items-center rounded-2xl border border-brand/10 bg-white p-7 text-center transition-transform duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl"
						>
							<div className="mb-4">{s.icon}</div>
							<div className="mb-2 flex items-center justify-center gap-2">
								<h3 className="text-xl font-bold text-gray-900">{s.name}</h3>
								<Badge className="bg-brand text-brand-fg">{s.tag}</Badge>
							</div>
							<p className="text-muted-foreground">{s.desc}</p>
						</div>
					))}
				</div>
			</Container>
		</Section>
	)
}