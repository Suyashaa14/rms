import * as React from 'react'
import { createPortal } from 'react-dom'
import { CheckCircle2, XCircle } from 'lucide-react'

type Type = 'success' | 'error'

export interface AlertPopupProps {
  open: boolean
  type: Type
  title?: string
  description?: string
  /**
   * Button label. Defaults:
   *  - success => "Ok"
   *  - error   => "Try Again"
   */
  actionLabel?: string
  onClose?: () => void
  /**
   * Optional: auto close (ms). If provided, the popup closes automatically.
   */
  autoCloseMs?: number
}

export default function AlertPopup({
  open,
  type,
  title,
  description,
  actionLabel,
  onClose,
  autoCloseMs,
}: AlertPopupProps) {
  React.useEffect(() => {
    if (!open || !autoCloseMs) return
    const t = setTimeout(() => onClose?.(), autoCloseMs)
    return () => clearTimeout(t)
  }, [open, autoCloseMs, onClose])

  if (!open) return null

  const Icon = type === 'success' ? CheckCircle2 : XCircle
  const color =
    type === 'success'
      ? 'text-green-600'
      : 'text-red-600'

  const btnBase =
    'inline-flex items-center justify-center px-4 py-2 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-offset-2'
  const btnColor =
    type === 'success'
      ? 'bg-green-600 hover:bg-green-700 focus:ring-green-400'
      : 'bg-red-600 hover:bg-red-700 focus:ring-red-400'

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Card */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-sm rounded-2xl bg-white shadow-2xl p-6 text-center">
          <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center`}>
            <Icon className={`h-14 w-14 ${color}`} aria-hidden />
          </div>

          <h3 className={`text-2xl font-semibold ${color}`}>
            {title ?? (type === 'success' ? 'Success' : 'Error')}
          </h3>

          {description ? (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          ) : null}

          <div className="mt-6">
            <button
              type="button"
              onClick={onClose}
              className={`${btnBase} ${btnColor}`}
            >
              {actionLabel ?? (type === 'success' ? 'Ok' : 'Try Again')}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}
