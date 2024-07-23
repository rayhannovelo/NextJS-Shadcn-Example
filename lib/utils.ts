import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ucwords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}

export function title(str: string) {
  return ucwords(str).replace("-", " ")
}

export function formatNumber(number: number) {
  return new Intl.NumberFormat("de-DE").format(number)
}

export function nl2br(str: string) {
  if (typeof str === "string") {
    return str.replace(/\n/g, "<br>")
  }
  return str
}
