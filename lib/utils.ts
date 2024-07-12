import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ucwords(str: string) {
  return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
}

export function title(str: string) {
  return ucwords(str.slice(1)).replace("-", " ")
}
