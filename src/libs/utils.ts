import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { appConfig } from "@/configs/app";

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

export function getNumPriceAfterDiscount(
  price: number,
  discountPercent: number,
  digit: number = 2
): number {
  if (!price) return 0;
  if (discountPercent <= 0) return 0;

  const calPrice = price - (price * discountPercent) / 100;

  return Number(calPrice.toFixed(digit))
}

export function handleGetRefreshToken() {
  return Cookies.get(appConfig.REFRESH_TOKEN_KEY);
}

export function handleGetToken(isToken: boolean = true) {
  const result = Cookies.get(
    isToken ? appConfig.ACCESS_TOKEN_KEY : appConfig.REFRESH_TOKEN_KEY
  );
  return result;
}

export function handleSetToken(
  data: { token: string; refresh: string },
  isRememberLogin?: boolean
) {
  const options = isRememberLogin ? { expires: 30 } : undefined;

  // if (!data.token || !data.refresh) return;
  Cookies.set(appConfig.ACCESS_TOKEN_KEY, data.token, options);
  Cookies.set(appConfig.REFRESH_TOKEN_KEY, data.refresh, options);
  return data;
}

export function handleRemoveToken() {
  Cookies.remove(appConfig.ACCESS_TOKEN_KEY);
  Cookies.remove(appConfig.REFRESH_TOKEN_KEY);
  return;
}

export function getJWTDecode(token: string): TDummyJWT {
  return jwtDecode<TDummyJWT>(token);
}