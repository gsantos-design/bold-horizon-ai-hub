import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency with dollar sign and 2 decimal places
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

// Format percentage with % sign
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value / 100);
}

// Format large numbers with commas
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

// Calculate annual premium from monthly premium
export function calculateAnnualPremium(monthlyPremium: number): number {
  return monthlyPremium * 12;
}

// Calculate commission based on rank and premium
export function calculateCommission(rankPercentage: number, premium: number): number {
  return premium * rankPercentage;
}

// Calculate points for a given premium (Transamerica)
export function calculateTransamericaPoints(annualPremium: number): number {
  return annualPremium * 1.25;
}

// Calculate points for other companies
export function calculateStandardPoints(annualPremium: number): number {
  return annualPremium;
}

// Scroll to section with offset
export function scrollToSection(sectionId: string, offset: number = 100): void {
  const element = document.getElementById(sectionId);
  if (element) {
    const position = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({
      top: position,
      behavior: 'smooth'
    });
  }
}
