import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

export function getStrPrice(
  price: number,
  zone: string = "en-US",
  digit: number = 2
): string {
  if (!price) return "$0";

  const formatPrice = new Intl.NumberFormat(zone, {
    maximumFractionDigits: digit,
  }).format(price)

  return `$${formatPrice}`;
}

export function getStrPriceAfterDiscount(
  price: number,
  discountPercent: number,
  zone: string = "en-US",
  digit: number = 2
): string {
  if (!price) return "$0";
  if (discountPercent <= 0) return "$0";

  const calPrice = price - (price * discountPercent) / 100;

  const formatPrice = new Intl.NumberFormat(zone, {
    maximumFractionDigits: digit,
  }).format(calPrice)

  return `$${formatPrice}`;
}
