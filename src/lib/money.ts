export const toMoney = (minor: number) => {
  const sign = minor < 0 ? '-' : ''
  const abs = Math.abs(minor)
  const major = Math.floor(abs / 100)
  const cents = String(abs % 100).padStart(2, '0')
  return `${sign}Rs. ${major}.${cents}`
}

export const pct = (v: number) => `${v}%`
