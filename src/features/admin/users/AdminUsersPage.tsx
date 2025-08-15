const users = [
  { id: 'u1', name: 'Maya Shrestha', email: 'maya@example.com', orders: 3 },
  { id: 'u2', name: 'Sagar Pandey', email: 'sagar@example.com', orders: 1 },
]

export default function AdminUsersPage() {
  return (
    <div className="rounded-xl border overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-left bg-neutral-50 dark:bg-neutral-900/50">
          <tr>
            <th className="py-2 px-3">Name</th>
            <th className="py-2 px-3">Email</th>
            <th className="py-2 px-3">Orders</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id} className="border-t">
              <td className="py-2 px-3 font-medium">{u.name}</td>
              <td className="py-2 px-3">{u.email}</td>
              <td className="py-2 px-3">{u.orders}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
