export function formatPrice(
 numberString: string,
 options?: {
  currencySymbol?: string;
  thousandSeparator?: string;
  decimalSeparator?: string;
 },
) {
 const parts = numberString.split(".");
 const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

 const currencySymbol = options?.currencySymbol || "";

 return `${integerPart} ${currencySymbol}`;
}
