import React, { useState } from 'react';
import {
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateRange,
} from '../../utils/mathUtils';
import { Plus, Minus, RefreshCw } from 'lucide-react';

// Continuous Interval Number Line: 60 < m ≤ 70
export const IntervalNumberLine: React.FC = () => {
  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-3xl">
        <h4 className="text-3xl font-black text-slate-900 mb-2 text-center math-font">
          60 &lt; m ≤ 70
        </h4>
        <p className="text-xl font-bold text-slate-700 text-center mb-8">
          More than 60 and up to and including 70
        </p>

        <svg viewBox="0 0 680 180" className="w-full h-auto select-none">
          {/* Main Number Line */}
          <line x1="60" y1="90" x2="620" y2="90" stroke="#334155" strokeWidth="4" />
          <polyline points="60,82 45,90 60,98" stroke="#334155" strokeWidth="4" fill="none" />
          <polyline points="620,82 635,90 620,98" stroke="#334155" strokeWidth="4" fill="none" />

          {/* Ticks from 50 to 80 (step of 5) */}
          {[50, 55, 60, 65, 70, 75, 80].map((val) => {
            const x = 90 + ((val - 50) / 30) * 500;
            return (
              <g key={val}>
                <line x1={x} y1="78" x2={x} y2="102" stroke="#475569" strokeWidth="3" />
                <text
                  x={x}
                  y="135"
                  textAnchor="middle"
                  className="fill-slate-900 font-extrabold text-2xl math-font"
                  style={{ fontSize: '24px' }}
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Shaded Interval Line between 60 and 70 */}
          {(() => {
            const x60 = 90 + ((60 - 50) / 30) * 500;
            const x70 = 90 + ((70 - 50) / 30) * 500;
            return (
              <g>
                <line x1={x60} y1="90" x2={x70} y2="90" stroke="#2563EB" strokeWidth="8" />

                {/* Open circle at 60 (NOT included) */}
                <circle cx={x60} cy="90" r="10" fill="#FFFFFF" stroke="#2563EB" strokeWidth="4" />
                <text
                  x={x60}
                  y="45"
                  textAnchor="middle"
                  className="fill-rose-600 font-black text-xl"
                  style={{ fontSize: '20px' }}
                >
                  60 is NOT included
                </text>

                {/* Closed circle at 70 (INCLUDED) */}
                <circle cx={x70} cy="90" r="10" fill="#2563EB" stroke="#1D4ED8" strokeWidth="2" />
                <text
                  x={x70}
                  y="45"
                  textAnchor="middle"
                  className="fill-emerald-600 font-black text-xl"
                  style={{ fontSize: '20px' }}
                >
                  70 IS included
                </text>
              </g>
            );
          })()}
        </svg>

        {/* Where values are counted */}
        <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-100 text-center">
          <div className="bg-rose-50 p-4 rounded-2xl border border-rose-200">
            <span className="text-xl font-black text-rose-900">Value of 60 kg</span>
            <p className="text-lg font-bold text-rose-700 mt-1">
              Counted in the previous interval (50 &lt; m ≤ 60)
            </p>
          </div>
          <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200">
            <span className="text-xl font-black text-emerald-900">Value of 70 kg</span>
            <p className="text-lg font-bold text-emerald-700 mt-1">
              Counted in this interval (60 &lt; m ≤ 70)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mean "Levelling Out" Animated Visual: 3, 5, 5, 7, 10 -> levelled to 6
export const MeanLevellingVisual: React.FC = () => {
  const [isLevelled, setIsLevelled] = useState(false);
  const values = [3, 5, 5, 7, 10];
  const mean = calculateMean(values); // 6
  const total = values.reduce((a, b) => a + b, 0); // 30

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-3xl flex flex-col items-center">
        {/* Math explanation */}
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-slate-800">
            Total: 3 + 5 + 5 + 7 + 10 = <span className="text-blue-700 font-black math-font">{total}</span>
          </div>
          <div className="text-3xl font-black text-slate-900 mt-2">
            Mean = Total ÷ Count = {total} ÷ 5 ={' '}
            <span className="text-blue-700 math-font text-4xl">{mean}</span>
          </div>
        </div>

        {/* SVG Levelling Columns */}
        <svg viewBox="0 0 540 280" className="w-full max-w-[500px] h-auto select-none">
          {/* Baseline */}
          <line x1="40" y1="240" x2="500" y2="240" stroke="#334155" strokeWidth="3" />

          {/* Levelled Target Line (y = 6) */}
          <line
            x1="40"
            y1={240 - mean * 18}
            x2="500"
            y2={240 - mean * 18}
            stroke="#DC2626"
            strokeWidth="3"
            strokeDasharray="6,6"
          />
          <text
            x="510"
            y={245 - mean * 18}
            className="fill-rose-600 font-black text-xl math-font"
            style={{ fontSize: '18px' }}
          >
            6
          </text>

          {/* 5 Towers */}
          {values.map((v, i) => {
            const displayHeight = isLevelled ? mean * 18 : v * 18;
            const y = 240 - displayHeight;
            const x = 70 + i * 85;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width="55"
                  height={displayHeight}
                  fill={isLevelled ? '#3B82F6' : '#93C5FD'}
                  stroke="#1D4ED8"
                  strokeWidth="2.5"
                  rx="4"
                  className="transition-all duration-700 ease-out"
                />
                <text
                  x={x + 27}
                  y={y - 10}
                  textAnchor="middle"
                  className="fill-slate-900 font-black text-2xl math-font"
                  style={{ fontSize: '24px' }}
                >
                  {isLevelled ? mean : v}
                </text>
              </g>
            );
          })}
        </svg>

        {/* Toggle Button */}
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => setIsLevelled(!isLevelled)}
            className="min-h-[56px] px-8 rounded-2xl font-black text-xl text-white bg-blue-600 hover:bg-blue-700 transition-all shadow-md active:scale-95"
          >
            {isLevelled ? 'Original heights' : 'Level out bars'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Interactive Data Strip with live number line statistics
export const InteractiveDataStrip: React.FC = () => {
  const [data, setData] = useState<number[]>([3, 5, 5, 7, 10]);
  const [showMean, setShowMean] = useState(true);
  const [showMedian, setShowMedian] = useState(false);
  const [showMode, setShowMode] = useState(false);
  const [showRange, setShowRange] = useState(false);

  const mean = calculateMean(data);
  const median = calculateMedian(data);
  const { modes } = calculateMode(data);
  const { min, max, range } = calculateRange(data);

  const addValue = (val: number) => {
    if (data.length >= 10) return;
    setData((prev) => [...prev, val].sort((a, b) => a - b));
  };

  const removeValue = (index: number) => {
    if (data.length <= 3) return;
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  const updateVal = (index: number, delta: number) => {
    setData((prev) => {
      const copy = [...prev];
      copy[index] = Math.max(0, Math.min(20, copy[index] + delta));
      return copy.sort((a, b) => a - b);
    });
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Chips Row */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
          {data.map((val, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border-2 border-slate-300 rounded-2xl p-2.5 flex flex-col items-center gap-1 shadow-sm"
            >
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => updateVal(idx, -1)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => updateVal(idx, 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-700 hover:bg-slate-100"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
              <span className="text-3xl font-black text-slate-900 math-font my-1">{val}</span>
              <button
                type="button"
                onClick={() => removeValue(idx)}
                className="text-xs text-rose-600 font-bold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => addValue(6)}
            disabled={data.length >= 10}
            className="min-h-[90px] px-5 rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50/50 hover:bg-slate-100 text-slate-700 font-bold flex flex-col items-center justify-center gap-1"
          >
            <Plus className="w-6 h-6" />
            <span>Add data</span>
          </button>
        </div>

        {/* Statistic Toggle Buttons */}
        <div className="flex items-center justify-center gap-3 flex-wrap mb-8">
          <button
            type="button"
            onClick={() => setShowMean(!showMean)}
            className={`min-h-[48px] px-5 rounded-xl font-bold transition-all ${
              showMean ? 'bg-blue-600 text-white shadow' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Mean: {mean}
          </button>
          <button
            type="button"
            onClick={() => setShowMedian(!showMedian)}
            className={`min-h-[48px] px-5 rounded-xl font-bold transition-all ${
              showMedian ? 'bg-emerald-600 text-white shadow' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Median: {median}
          </button>
          <button
            type="button"
            onClick={() => setShowMode(!showMode)}
            className={`min-h-[48px] px-5 rounded-xl font-bold transition-all ${
              showMode ? 'bg-amber-500 text-slate-950 shadow' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Mode: {modes.length > 0 ? modes.join(', ') : 'None'}
          </button>
          <button
            type="button"
            onClick={() => setShowRange(!showRange)}
            className={`min-h-[48px] px-5 rounded-xl font-bold transition-all ${
              showRange ? 'bg-purple-600 text-white shadow' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Range: {range}
          </button>
        </div>

        {/* Number Line Display with Markers */}
        <div className="flex justify-center">
          <svg viewBox="0 0 740 180" className="w-full max-w-[700px] h-auto select-none">
            {/* Main Axis */}
            <line x1="50" y1="100" x2="690" y2="100" stroke="#334155" strokeWidth="3.5" />

            {/* Ticks 0 to 20 */}
            {Array.from({ length: 21 }).map((_, val) => {
              const x = 70 + (val / 20) * 600;
              return (
                <g key={val}>
                  <line x1={x} y1="92" x2={x} y2="108" stroke="#64748B" strokeWidth="2" />
                  {val % 2 === 0 && (
                    <text
                      x={x}
                      y="132"
                      textAnchor="middle"
                      className="fill-slate-800 font-bold math-font"
                      style={{ fontSize: '18px' }}
                    >
                      {val}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Data Point Dots on line */}
            {data.map((val, idx) => {
              const x = 70 + (val / 20) * 600;
              return (
                <circle
                  key={idx}
                  cx={x}
                  cy="100"
                  r="7"
                  fill="#64748B"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
              );
            })}

            {/* Mean Marker */}
            {showMean && (
              <g transform={`translate(${70 + (mean / 20) * 600}, 65)`}>
                <polygon points="0,25 -8,8 8,8" fill="#2563EB" />
                <rect x="-35" y="-18" width="70" height="26" rx="6" fill="#2563EB" />
                <text
                  x="0"
                  y="0"
                  textAnchor="middle"
                  className="fill-white font-black text-sm math-font"
                >
                  Mean {mean}
                </text>
              </g>
            )}

            {/* Median Marker */}
            {showMedian && (
              <g transform={`translate(${70 + (median / 20) * 600}, 30)`}>
                <polygon points="0,60 -8,45 8,45" fill="#059669" />
                <rect x="-42" y="18" width="84" height="26" rx="6" fill="#059669" />
                <text
                  x="0"
                  y="36"
                  textAnchor="middle"
                  className="fill-white font-black text-sm math-font"
                >
                  Median {median}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
