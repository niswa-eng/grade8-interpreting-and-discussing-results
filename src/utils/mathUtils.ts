/**
 * Mathematical and statistical utility functions for Cambridge Stage 8 Handling Data.
 * All statistics, angles, class counts, and totals are computed strictly in code from raw data.
 */

export function calculateSum(values: number[]): number {
  return values.reduce((acc, curr) => acc + curr, 0);
}

export function calculateMean(values: number[]): number {
  if (values.length === 0) return 0;
  const sum = calculateSum(values);
  return Number((sum / values.length).toFixed(2));
}

export function calculateMedian(values: number[]): number {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 1) {
    return sorted[mid];
  }
  return Number(((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2));
}

export function calculateMode(values: number[]): { modes: number[]; frequency: number } {
  if (values.length === 0) return { modes: [], frequency: 0 };
  const counts = new Map<number, number>();
  let maxCount = 0;

  for (const v of values) {
    const c = (counts.get(v) || 0) + 1;
    counts.set(v, c);
    if (c > maxCount) {
      maxCount = c;
    }
  }

  // If all elements appear the same number of times (e.g. all 1 time), no mode
  const uniqueFreqs = new Set(counts.values());
  if (uniqueFreqs.size === 1 && maxCount === 1) {
    return { modes: [], frequency: 1 };
  }

  const modes: number[] = [];
  counts.forEach((count, val) => {
    if (count === maxCount) {
      modes.push(val);
    }
  });

  modes.sort((a, b) => a - b);
  return { modes, frequency: maxCount };
}

export function calculateRange(values: number[]): { min: number; max: number; range: number } {
  if (values.length === 0) return { min: 0, max: 0, range: 0 };
  const min = Math.min(...values);
  const max = Math.max(...values);
  return { min, max, range: Number((max - min).toFixed(2)) };
}

export interface PieSectorData {
  label: string;
  count: number;
  fraction: string;
  angle: number;
  percentage: number;
  startAngle: number;
  endAngle: number;
  color: string;
}

export function calculatePieSectors(
  categories: { label: string; count: number; color?: string }[]
): { sectors: PieSectorData[]; total: number } {
  const total = calculateSum(categories.map((c) => c.count));
  const defaultColors = ['#2563EB', '#0D9488', '#EA580C', '#16A34A', '#9333EA', '#E11D48', '#D97706'];

  let currentAngle = 0;
  const sectors: PieSectorData[] = categories.map((cat, idx) => {
    const angle = total > 0 ? (cat.count / total) * 360 : 0;
    const percentage = total > 0 ? (cat.count / total) * 100 : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angle;
    currentAngle += angle;

    // GCD for fraction representation
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(cat.count, total);
    const fraction = total > 0 ? `${cat.count / divisor}/${total / divisor}` : '0';

    return {
      label: cat.label,
      count: cat.count,
      fraction,
      angle: Number(angle.toFixed(1)),
      percentage: Number(percentage.toFixed(1)),
      startAngle,
      endAngle,
      color: cat.color || defaultColors[idx % defaultColors.length],
    };
  });

  return { sectors, total };
}

export interface ClassInterval {
  min: number;
  max: number;
  label: string; // e.g. "40 < m ≤ 50"
  frequency: number;
}

export function calculateHistogramFrequencies(
  values: number[],
  intervals: { min: number; max: number; label: string }[]
): ClassInterval[] {
  return intervals.map((interval) => {
    // Cambridge convention: x_min < m <= x_max
    const count = values.filter((v) => v > interval.min && v <= interval.max).length;
    return {
      ...interval,
      frequency: count,
    };
  });
}

export interface StemLeafRow {
  stem: number;
  leaves: number[];
}

export function buildStemAndLeaf(values: number[]): StemLeafRow[] {
  const stemsMap = new Map<number, number[]>();

  for (const val of values) {
    const stem = Math.floor(val / 10);
    const leaf = Math.abs(val % 10);
    if (!stemsMap.has(stem)) {
      stemsMap.set(stem, []);
    }
    stemsMap.get(stem)!.push(leaf);
  }

  // Sort stems
  const sortedStems = Array.from(stemsMap.keys()).sort((a, b) => a - b);
  return sortedStems.map((stem) => ({
    stem,
    leaves: (stemsMap.get(stem) || []).sort((a, b) => a - b),
  }));
}
