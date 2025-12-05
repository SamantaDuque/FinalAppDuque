// src/utils/formatPrice.js
export function formatPrice(amount) {
  if (amount == null) return '';
  const num = Number(amount);
  return '$' + num.toFixed(2);
}
