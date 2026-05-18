const plnFormatter = new Intl.NumberFormat('pl-PL', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export function formatPln(value: number): string {
  return `${plnFormatter.format(value)} PLN`
}
