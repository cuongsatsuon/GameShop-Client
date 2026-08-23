import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Tailwind-aware className combiner (shadcn convention). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Vietnamese đồng, e.g. 2777400 -> "2.777.400đ". */
export function formatVND(value: number): string {
  return `${new Intl.NumberFormat("vi-VN").format(Math.round(value))}đ`;
}

/** Compact number, e.g. 1083 -> "1.083", used for view counts / stats. */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("vi-VN").format(value);
}

/** Discount percentage from an original + sale price. */
export function discountPercent(original: number, sale: number): number {
  if (!original || sale >= original) return 0;
  return Math.round(((original - sale) / original) * 100);
}

/** Two-digit zero padded string, e.g. 7 -> "07" (countdown timers). */
export function pad2(value: number): string {
  return value.toString().padStart(2, "0");
}

/** Relative Vietnamese time label from a number of days ago. */
export function daysAgoLabel(days: number): string {
  if (days <= 0) return "Hôm nay";
  return `${days} ngày trước`;
}
