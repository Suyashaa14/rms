import React, { useEffect, useRef } from 'react'

type Props = {
  value: string[]          // length 6
  onChange: (v: string[]) => void
  disabled?: boolean
  autoFocus?: boolean
}

export default function OtpInput({ value, onChange, disabled, autoFocus }: Props) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (autoFocus && inputsRef.current[0]) inputsRef.current[0].focus()
  }, [autoFocus])

  const handleChange = (i: number, next: string) => {
    const digit = next.replace(/\D/g, '').slice(-1)
    const copy = [...value]
    copy[i] = digit || ''
    onChange(copy)
    if (digit && i < 5) inputsRef.current[i + 1]?.focus()
  }

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[i] && i > 0) inputsRef.current[i - 1]?.focus()
    if (e.key === 'ArrowLeft' && i > 0) inputsRef.current[i - 1]?.focus()
    if (e.key === 'ArrowRight' && i < 5) inputsRef.current[i + 1]?.focus()
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (!pasted) return
    e.preventDefault()
    const copy = [...value]
    for (let i = 0; i < 6; i++) copy[i] = pasted[i] ?? ''
    onChange(copy)
    const last = Math.min(5, pasted.length - 1)
    if (last >= 0) inputsRef.current[last]?.focus()
  }

  return (
    <div className="grid grid-cols-6 gap-2">
      {value.map((digit, i) => (
        <input
          key={i}
          ref={el => {
            inputsRef.current[i] = el;
          }}
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          disabled={disabled}
          value={digit}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          aria-label={`OTP digit ${i + 1}`}
          className="h-11 text-center text-lg border rounded-lg"
        />
      ))}
    </div>
  )
}

