// Round any long floating point balances to hundredths.
// Add epsilon (the smallest value JS floats can represent) to ensure we round up when exactly at the rounding boundary.
export function roundToHundredths(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
