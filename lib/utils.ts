import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}

export function formatDateRange(start: string | Date, end: string | Date): string {
  const startDate = formatDate(start);
  const endDate = formatDate(end);
  return `${startDate} - ${endDate}`;
}

