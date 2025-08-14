import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-bold text-brand mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link to="/" className="bg-brand text-brand-fg px-6 py-2 rounded-lg font-semibold shadow hover:bg-brand/90 transition">
        Go Home
      </Link>
    </div>
  )
}