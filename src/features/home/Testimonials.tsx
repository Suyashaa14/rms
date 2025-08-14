import Section from '../../components/common/Section'
import Container from '../../components/common/Container'
import SectionHeader from '../../components/common/SectionHeader'
import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar'

const t = [
	{
		name: 'Maya',
		quote: 'The truffle pasta is unforgettable — and the ambience is perfect.',
		avatar: 'https://i.pravatar.cc/100?img=1',
	},
	{
		name: 'Ravi',
		quote: 'Easily the best steak in town. Friendly staff and quick service.',
		avatar: 'https://i.pravatar.cc/100?img=5',
	},
	{
		name: 'Elena',
		quote: 'I booked my birthday here — everyone loved the brunch!',
		avatar: 'https://i.pravatar.cc/100?img=8',
	},
]

export default function Testimonials() {
	return (
		<Section className="bg-muted/40">
			<Container>
				<SectionHeader title="What guests say" />
				<div className="grid md:grid-cols-3 gap-8">
					{t.map((x) => (
						<Card
							key={x.name}
							className="rounded-xl bg-white/80 shadow-lg hover:shadow-xl transition-shadow duration-300 border-0 flex flex-col items-center text-center p-6"
						>
							<div className="mb-4">
								<Avatar className="w-20 h-20 border-2 border-brand shadow">
									<AvatarImage src={x.avatar} />
									<AvatarFallback className="text-lg font-bold">
										{x.name.slice(0, 2)}
									</AvatarFallback>
								</Avatar>
							</div>
							<div className="mb-2 flex items-center justify-center">
								<svg
									width="28"
									height="28"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									className="text-brand mr-2"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 17a4 4 0 01-4-4V7a4 4 0 014-4m6 14a4 4 0 01-4-4V7a4 4 0 014-4"
									/>
								</svg>
								<span className="text-lg italic font-medium text-gray-800">
									“{x.quote}”
								</span>
							</div>
							<div className="mt-4">
								<div className="font-semibold text-brand">{x.name}</div>
								<div className="text-xs text-muted-foreground">
									Verified Diner
								</div>
							</div>
						</Card>
					))}
				</div>
			</Container>
		</Section>
	)
}