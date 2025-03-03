/**
 * Formats a numeric value as a currency string.
 *
 * @param {number} value - The numeric value to be formatted.
 * @returns {string} The formatted value as US dollars (USD).
 *
 * @example
 * // Returns "$1,000.00"
 * formatCurrency(1000);
 */
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
};

export default formatCurrency;
