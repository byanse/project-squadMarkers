export function parseHectogramsToKgs(hectograms) {
  return (hectograms / 10).toFixed(1);
}

export function parseHectogramsToPounds(hectograms) {
  return (hectograms / 4.536).toFixed(1);
}

export function parseDecimetresToPounds(decimetres) {
  return decimetres * 10;
}
