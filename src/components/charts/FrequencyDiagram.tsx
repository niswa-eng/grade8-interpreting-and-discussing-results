import React, { useState } from 'react';
import { calculateSum } from '../../utils/mathUtils';
import { Plus, Minus } from 'lucide-react';

export interface FrequencyClass {
  min: number;
  max: number;
  frequency: number;
  label?: string; // e.g. "40 < m ≤ 50"
}

interface FrequencyDiagramProps {
  initialClasses?: FrequencyClass[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  accentColor?: string;
  isInteractive?: boolean; // provides +/- buttons to alter frequencies
  highlightAbove?: number; // e.g. highlight bars where min >= 60
  stepByStep?: boolean;
}

export const FrequencyDiagram: React.FC<FrequencyDiagramProps> = ({
  initialClasses = [
    { min: 40, max: 50, frequency: 3, label: '40 < m ≤ 50' },
    { min: 50, max: 60, frequency: 8, label: '50 < m ≤ 60' },
    { min: 60, max: 70, frequency: 11, label: '60 < m ≤ 70' },
    { min: 70, max: 80, frequency: 6, label: '70 < m ≤ 80' },
    { min: 80, max: 90, frequency: 2, label: '80 < m ≤ 90' },
  ],
  title = 'Masses of 30 students',
  xLabel = 'Mass (kg)',
  yLabel = 'Frequency',
  accentColor = '#2563EB',
  isInteractive = false,
  highlightAbove,
  stepByStep = false,
}) => {
  const [classes, setClasses] = useState<FrequencyClass[]>(initialClasses);
  const [currentStep, setCurrentStep] = useState(stepByStep ? 0 : 4);

  const totalFrequency = calculateSum(classes.map((c) => c.frequency));
  const maxFreq = Math.max(...classes.map((c) => c.frequency), 12);
  const maxScale = Math.ceil(maxFreq / 2) * 2;

  // Modal class
  let modalClass: FrequencyClass | null = null;
  let highestFreq = -1;
  for (const c of classes) {
    if (c.frequency > highestFreq) {
      highestFreq = c.frequency;
      modalClass = c;
    }
  }

  // Count > 60 kg if specified
  const above60Count = classes
    .filter((c) => c.min >= 60)
    .reduce((acc, c) => acc + c.frequency, 0);

  const svgWidth = 720;
  const svgHeight = 440;
  const margin = { top: 60, right: 40, bottom: 80, left: 90 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const yTicks = [0, 2, 4, 6, 8, 10, 12];

  // In a frequency diagram: NO GAPS between bars!
  const barCount = classes.length;
  const barWidth = plotWidth / barCount;

  // Boundary scale numbers for horizontal axis
  const boundaries = [classes[0].min, ...classes.map((c) => c.max)];

  const updateFreq = (index: number, delta: number) => {
    setClasses((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          return { ...item, frequency: Math.max(0, item.frequency + delta) };
        }
        return item;
      })
    );
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Header Stats */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="text-xl font-black text-slate-900">{title}</div>
          <div className="flex items-center gap-6 text-lg font-bold">
            <div className="text-slate-700">
              Total frequency: <span className="text-blue-700 math-font text-2xl">{totalFrequency}</span>
            </div>
            {modalClass && (
              <div className="text-slate-700">
                Modal class:{' '}
                <span className="text-amber-600 font-extrabold">{modalClass.label}</span>
              </div>
            )}
            {highlightAbove !== undefined && (
              <div className="text-slate-700">
                More than {highlightAbove} kg:{' '}
                <span className="text-emerald-700 math-font text-2xl font-black">
                  {above60Count}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* SVG Histogram */}
        <div className="mt-4 flex justify-center">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[680px] h-auto select-none"
          >
            {/* Gridlines */}
            {yTicks.map((tick) => {
              const y = margin.top + plotHeight - (tick / 12) * plotHeight;
              return (
                <line
                  key={tick}
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + plotWidth}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeDasharray={tick === 0 ? 'none' : '4,4'}
                />
              );
            })}

            {/* Axes Lines */}
            <g stroke="#334155" strokeWidth="3">
              <line
                x1={margin.left}
                y1={margin.top}
                x2={margin.left}
                y2={margin.top + plotHeight}
              />
              <line
                x1={margin.left}
                y1={margin.top + plotHeight}
                x2={margin.left + plotWidth}
                y2={margin.top + plotHeight}
              />
            </g>

            {/* Y Axis Numbers & Ticks */}
            {yTicks.map((tick) => {
              const y = margin.top + plotHeight - (tick / 12) * plotHeight;
              return (
                <g key={tick}>
                  <line
                    x1={margin.left - 8}
                    y1={y}
                    x2={margin.left}
                    y2={y}
                    stroke="#334155"
                    strokeWidth="2.5"
                  />
                  <text
                    x={margin.left - 16}
                    y={y + 7}
                    textAnchor="end"
                    className="fill-slate-700 font-bold math-font"
                    style={{ fontSize: '22px' }}
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Axis Labels */}
            <text
              x={-(margin.top + plotHeight / 2)}
              y={28}
              transform="rotate(-90)"
              textAnchor="middle"
              className="fill-slate-800 font-extrabold"
              style={{ fontSize: '24px' }}
            >
              {yLabel}
            </text>
            <text
              x={margin.left + plotWidth / 2}
              y={svgHeight - 16}
              textAnchor="middle"
              className="fill-slate-800 font-extrabold"
              style={{ fontSize: '24px' }}
            >
              {xLabel}
            </text>

            {/* Histogram Continuous Bars (NO GAPS between bars!) */}
            {classes.map((c, index) => {
              const barX = margin.left + index * barWidth;
              const barH = (c.frequency / 12) * plotHeight;
              const barY = margin.top + plotHeight - barH;

              const isHighlighted =
                highlightAbove !== undefined ? c.min >= highlightAbove : false;
              const fillColor = isHighlighted ? '#10B981' : accentColor;

              return (
                <g key={index}>
                  <rect
                    x={barX}
                    y={barY}
                    width={barWidth}
                    height={barH}
                    fill={fillColor}
                    stroke="#1E293B"
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  {/* Frequency label on top of bar */}
                  {c.frequency > 0 && (
                    <text
                      x={barX + barWidth / 2}
                      y={barY - 8}
                      textAnchor="middle"
                      className="fill-slate-900 font-black math-font"
                      style={{ fontSize: '22px' }}
                    >
                      {c.frequency}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Continuous X Scale Numbers at Bar Edges */}
            {boundaries.map((val, index) => {
              const edgeX = margin.left + index * barWidth;
              return (
                <g key={index}>
                  <line
                    x1={edgeX}
                    y1={margin.top + plotHeight}
                    x2={edgeX}
                    y2={margin.top + plotHeight + 10}
                    stroke="#334155"
                    strokeWidth="2.5"
                  />
                  <text
                    x={edgeX}
                    y={margin.top + plotHeight + 36}
                    textAnchor="middle"
                    className="fill-slate-900 font-extrabold math-font"
                    style={{ fontSize: '24px' }}
                  >
                    {val}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Interactive +/- Buttons to adjust frequency and watch total update */}
        {isInteractive && (
          <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-around flex-wrap gap-4">
            {classes.map((c, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center gap-2 p-3 bg-slate-50 rounded-2xl border border-slate-200"
              >
                <span className="text-sm font-bold text-slate-700">{c.label}</span>
                <span className="text-2xl font-black text-slate-900 math-font">{c.frequency}</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateFreq(idx, -1)}
                    disabled={c.frequency === 0}
                    className="w-12 h-12 rounded-xl bg-white border border-slate-300 shadow-sm flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 disabled:opacity-30"
                  >
                    <Minus className="w-5 h-5 stroke-[2.5]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => updateFreq(idx, 1)}
                    className="w-12 h-12 rounded-xl bg-blue-600 shadow-sm flex items-center justify-center text-white hover:bg-blue-700 active:scale-95"
                  >
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
