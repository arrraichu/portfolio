export function parseNumber(input: string): number | null {
  const s = input.trim();
  if (s == '') return 0;

  const n = Number(s);
  return Number.isNaN(n) ? null : n;
}
