import { items } from '../../lib/mockData'
import MenuCard from '../menu/components/MenuCard'

export default function UserFavoritesPage() {
  const favs = items.slice(0, 3) // mock favorites
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {favs.map(i => <MenuCard key={i.id} item={i} />)}
    </div>
  )
}
