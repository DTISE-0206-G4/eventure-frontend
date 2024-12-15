export function formatCurrency(value: number): string {
  // Convert the number to a localized string with thousands separators
  return value.toLocaleString("id-ID");
}
