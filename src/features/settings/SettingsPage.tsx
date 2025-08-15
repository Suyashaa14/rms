import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { useState } from 'react'
import { useAppSelector } from '../../hooks/hooks'

export default function SettingsPage() {
  const { user } = useAppSelector(s => s.auth)
  const [name, setName] = useState(user?.name ?? '')
  const [phone, setPhone] = useState('')

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-3">Profile</div>
        <div className="grid gap-2">
          <Input placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
          <Input placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
          <Button className="mt-2">Save</Button>
        </div>
      </div>
      <div className="rounded-xl border p-4">
        <div className="font-semibold mb-3">Preferences</div>
        <div className="text-sm text-muted-foreground">Add language/theme/notifications here.</div>
      </div>
    </div>
  )
}
