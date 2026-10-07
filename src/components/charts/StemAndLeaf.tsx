import React, { useState } from 'react';
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateRange,
} from '../../utils/mathUtils';
import { Plus, Minus } from 'lucide-react';

interface StemAndLeafProps {
  initialData?: number[];
  unit?: string;
  keyDescription?: string;
  keyExample?: { stem: number; leaf: number; valueStr: string };
  buildStep?: 'all' | 'A' | 'B' | 'C' | 'D';
  highlightMode?: boolean;
  highlightRange?: boolean;
  highlightMedian?: boolean;
  isInteractiveAddRemove?: boolean;
  isDecimal?: boolean;
}

export const StemAndLeaf: React.FC<StemAndLeafProps> = ({
  initialData = [19, 23, 25, 21, 32, 28, 23, 30, 25, 23, 17, 34],
  unit = '°C',
  keyExample = { stem: 1, leaf: 9, valueStr: '19 °C' },
  buildStep = 'all',
  highlightMode = false,
  highlightRange = false,
  highlightMedian = false,
  isInteractiveAddRemove = false,
  isDecimal = false,
}) => {
  const [data, setData] = useState<number[]>(initialData);
  const [selectedLeaf, setSelectedLeaf] = useState<{ stem: number; leaf: number; fullVal: number } | null>(null);
  const [crossOffStep, setCrossOffStep] = useState<number>(0); // for median cross-off animation

  // Mode, range, median calculations
  const { modes, frequency: modeFreq } = calculateMode(data);
  const { min, max, range } = calculateRange(data);
  const median = calculateMedian(data);

  // Group by stem
  const sortedData = [...data].sort((a, b) => a - b);
  const stemsMap = new Map<number, number[]>();

  // Determine stems needed
  const minStem = Math.floor(Math.min(...data) / 10);
  const maxStem = Math.floor(Math.max(...data) / 10);
  for (let s = minStem; s <= maxStem; s++) {
    stemsMap.set(s, []);
  }

  // Populate leaves
  if (buildStep === 'B') {
    // Unordered draft as given in data array
    for (const val of data) {
      const stem = Math.floor(val / 10);
      const leaf = val % 10;
      if (stemsMap.has(stem)) {
        stemsMap.get(stem)!.push(leaf);
      }
    }
  } else {
    // Ordered from smallest to largest
    for (const val of sortedData) {
      const stem = Math.floor(val / 10);
      const leaf = val % 10;
      if (stemsMap.has(stem)) {
        stemsMap.get(stem)!.push(leaf);
      }
    }
  }

  const stemsList = Array.from(stemsMap.keys()).sort((a, b) => a - b);

  // Add random realistic leaf
  const handleAddValue = () => {
    const candidates = [22, 26, 29, 31, 33, 18];
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    setData((prev) => [...prev, pick]);
  };

  const handleRemoveValue = () => {
    if (data.length <= 4) return;
    setData((prev) => prev.slice(0, -1));
  };

  // Cross off indices for median animation
  const count = sortedData.length;
  const leftCrossed = Math.min(crossOffStep, Math.floor((count - 1) / 2));
  const rightCrossed = Math.min(crossOffStep, Math.floor((count - 1) / 2));

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-3xl">
        {/* Top Key Card & Value Inspector */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-100 flex-wrap gap-4">
          {/* Key (Shown in steps C, D, all) */}
          {(buildStep === 'D' || buildStep === 'all' || buildStep === 'C') && (
            <div className="flex items-center gap-4 bg-amber-50 px-5 py-3 rounded-2xl border border-amber-200">
              <span className="font-extrabold text-amber-900 text-xl">Key:</span>
              <div className="flex items-center gap-2 text-2xl font-black text-amber-950 math-font">
                <span>{keyExample.stem}</span>
                <span className="text-amber-400">|</span>
                <span>{keyExample.leaf}</span>
                <span className="text-lg font-bold text-slate-700 ml-1">means {keyExample.valueStr}</span>
              </div>
            </div>
          )}

          {/* Interactive Tap Result */}
          {selectedLeaf && (
            <div className="flex items-center gap-3 bg-blue-50 px-5 py-3 rounded-2xl border border-blue-200 animate-in fade-in">
              <span className="font-bold text-blue-900 text-lg">Value:</span>
              <span className="text-3xl font-black text-blue-700 math-font">
                {isDecimal ? (selectedLeaf.fullVal / 10).toFixed(1) : selectedLeaf.fullVal} {unit}
              </span>
            </div>
          )}
        </div>

        {/* Stem and Leaf Grid */}
        <div className="py-6 flex justify-center">
          <div className="inline-block text-2xl math-font font-bold">
            {stemsList.map((stem) => {
              const leaves = stemsMap.get(stem) || [];
              return (
                <div key={stem} className="flex items-center py-2.5">
                  {/* Stem Column */}
                  <div className="w-20 text-right pr-6 font-extrabold text-slate-900 text-3xl">
                    {stem}
                  </div>

                  {/* Vertical Divider Line */}
                  <div className="w-1 self-stretch bg-slate-900 rounded-full" />

                  {/* Leaves Column (Neatly aligned with equal spacing) */}
                  <div className="pl-6 flex items-center gap-5 min-h-[44px]">
                    {buildStep === 'A' ? null : (
                      leaves.map((leaf, leafIndex) => {
                        const fullVal = stem * 10 + leaf;
                        const isMode = highlightMode && modes.includes(fullVal);
                        const isMin = highlightRange && fullVal === min;
                        const isMax = highlightRange && fullVal === max;

                        // Check if crossed off for median
                        const valIndex = sortedData.indexOf(fullVal);
                        const isCrossed =
                          highlightMedian &&
                          (valIndex < leftCrossed || valIndex >= count - rightCrossed);

                        return (
                          <button
                            key={leafIndex}
                            type="button"
                            onClick={() => setSelectedLeaf({ stem, leaf, fullVal })}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all text-2xl relative ${
                              isMode
                                ? 'bg-amber-400 text-slate-950 font-black ring-4 ring-amber-200'
                                : isMin
                                ? 'bg-emerald-200 text-emerald-950 font-black ring-4 ring-emerald-100'
                                : isMax
                                ? 'bg-rose-200 text-rose-950 font-black ring-4 ring-rose-100'
                                : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                            }`}
                          >
                            <span className={isCrossed ? 'line-through text-slate-400 opacity-60' : ''}>
                              {leaf}
                            </span>
                            {isCrossed && (
                              <span className="absolute inset-0 flex items-center justify-center text-rose-500 font-extrabold text-3xl">
                                ✕
                              </span>
                            )}
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Statistical Highlights / Summaries */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-around flex-wrap gap-4 text-lg">
          {highlightMode && (
            <div className="bg-amber-50 px-5 py-3 rounded-2xl border border-amber-200">
              <span className="font-bold text-amber-900">Mode: </span>
              <span className="font-black text-2xl text-amber-700 math-font">
                {modes.join(', ')} {unit}
              </span>
              <span className="text-slate-600 ml-2">({modeFreq} times)</span>
            </div>
          )}

          {highlightRange && (
            <div className="bg-rose-50 px-5 py-3 rounded-2xl border border-rose-200 flex items-center gap-3">
              <span className="font-bold text-rose-900">Range: </span>
              <span className="font-black text-2xl text-rose-700 math-font">
                {max} − {min} = {range} {unit}
              </span>
            </div>
          )}

          {highlightMedian && (
            <div className="bg-emerald-50 px-5 py-3 rounded-2xl border border-emerald-200 flex items-center gap-4">
              <span className="font-bold text-emerald-900">Median: </span>
              <span className="font-black text-2xl text-emerald-700 math-font">
                {median} {unit}
              </span>
              <button
                type="button"
                onClick={() => setCrossOffStep((prev) => (prev + 1) % (Math.floor(count / 2) + 1))}
                className="min-h-[44px] px-4 rounded-xl font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
              >
                Next step
              </button>
            </div>
          )}
        </div>

        {/* Interactive Add / Remove Leaf Controls */}
        {isInteractiveAddRemove && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={handleRemoveValue}
              disabled={data.length <= 4}
              className="min-h-[52px] px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-2 disabled:opacity-30"
            >
              <Minus className="w-5 h-5" />
              <span>Remove a value</span>
            </button>
            <button
              type="button"
              onClick={handleAddValue}
              className="min-h-[52px] px-6 rounded-2xl bg-orange-600 hover:bg-orange-700 text-white font-bold flex items-center gap-2 shadow"
            >
              <Plus className="w-5 h-5" />
              <span>Add a value</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
