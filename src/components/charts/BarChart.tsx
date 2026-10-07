import React, { useState } from 'react';
import { calculateSum } from '../../utils/mathUtils';

export interface BarChartItem {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartItem[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  accentColor?: string;
  stepByStep?: boolean;
  showRulesChecklist?: boolean;
}

export const BarChart: React.FC<BarChartProps> = ({
  data,
  title = 'Number of siblings of 24 students',
  xLabel = 'Number of siblings',
  yLabel = 'Frequency',
  accentColor = '#2563EB',
  stepByStep = false,
  showRulesChecklist = false,
}) => {
  // Build steps: 0=Axes, 1=Labels, 2=Scale, 3=Bars, 4=Title
  const [currentBuildStep, setCurrentBuildStep] = useState(stepByStep ? 0 : 4);

  const maxValue = Math.max(...data.map((d) => d.value), 10);
  const total = calculateSum(data.map((d) => d.value));

  const svgWidth = 720;
  const svgHeight = 440;
  const margin = { top: 60, right: 40, bottom: 80, left: 90 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  // Y Scale ticks (e.g. 0 to 10 with step of 2)
  const yTicks = [0, 2, 4, 6, 8, 10];
  const maxTick = Math.max(...yTicks);

  const barCount = data.length;
  // Equal width bars with equal gaps
  const slotWidth = plotWidth / barCount;
  const barWidth = slotWidth * 0.58;
  const barGap = (slotWidth - barWidth) / 2;

  const rules = [
    { text: 'Bars of equal width', active: currentBuildStep >= 3 },
    { text: 'Equal gaps between bars', active: currentBuildStep >= 3 },
    { text: 'Each bar labelled', active: currentBuildStep >= 1 },
    { text: 'Clear title', active: currentBuildStep >= 4 },
    { text: 'Both axes labelled', active: currentBuildStep >= 1 },
    { text: 'Sensible consistent scale', active: currentBuildStep >= 2 },
  ];

  return (
    <div className="w-full flex flex-col xl:flex-row items-center gap-8 justify-center">
      {/* SVG Bar Chart */}
      <div className="relative bg-white/90 rounded-3xl p-6 shadow-sm border border-slate-200">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full max-w-[680px] h-auto select-none"
        >
          {/* Title (Step 4) */}
          {currentBuildStep >= 4 && (
            <text
              x={svgWidth / 2}
              y={38}
              textAnchor="middle"
              className="text-2xl font-black fill-slate-900"
              style={{ fontSize: '26px', fontWeight: 800 }}
            >
              {title}
            </text>
          )}

          {/* Gridlines (Step 2) */}
          {currentBuildStep >= 2 &&
            yTicks.map((tick) => {
              const y = margin.top + plotHeight - (tick / maxTick) * plotHeight;
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

          {/* Axes Lines (Step 0) */}
          {currentBuildStep >= 0 && (
            <g stroke="#334155" strokeWidth="3">
              {/* Y Axis */}
              <line
                x1={margin.left}
                y1={margin.top}
                x2={margin.left}
                y2={margin.top + plotHeight}
              />
              {/* X Axis */}
              <line
                x1={margin.left}
                y1={margin.top + plotHeight}
                x2={margin.left + plotWidth}
                y2={margin.top + plotHeight}
              />
            </g>
          )}

          {/* Y Axis Numbers & Ticks (Step 2) */}
          {currentBuildStep >= 2 &&
            yTicks.map((tick) => {
              const y = margin.top + plotHeight - (tick / maxTick) * plotHeight;
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

          {/* Axis Labels (Step 1) */}
          {currentBuildStep >= 1 && (
            <>
              {/* Y Label */}
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
              {/* X Label */}
              <text
                x={margin.left + plotWidth / 2}
                y={svgHeight - 16}
                textAnchor="middle"
                className="fill-slate-800 font-extrabold"
                style={{ fontSize: '24px' }}
              >
                {xLabel}
              </text>
            </>
          )}

          {/* Bars & X Category Labels (Step 3) */}
          {data.map((item, index) => {
            const barX = margin.left + index * slotWidth + barGap;
            const barH = (item.value / maxTick) * plotHeight;
            const barY = margin.top + plotHeight - barH;

            return (
              <g key={item.label}>
                {/* Bar */}
                {currentBuildStep >= 3 && (
                  <g>
                    <rect
                      x={barX}
                      y={barY}
                      width={barWidth}
                      height={barH}
                      fill={accentColor}
                      rx={4}
                      className="transition-all duration-300"
                    />
                    {/* Value on top of bar */}
                    <text
                      x={barX + barWidth / 2}
                      y={barY - 10}
                      textAnchor="middle"
                      className="fill-slate-900 font-black math-font"
                      style={{ fontSize: '22px' }}
                    >
                      {item.value}
                    </text>
                  </g>
                )}

                {/* X Category Label */}
                {currentBuildStep >= 1 && (
                  <text
                    x={barX + barWidth / 2}
                    y={margin.top + plotHeight + 36}
                    textAnchor="middle"
                    className="fill-slate-800 font-bold"
                    style={{ fontSize: '22px' }}
                  >
                    {item.label}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Step-by-Step Build Controls */}
        {stepByStep && (
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
            <span className="text-lg font-bold text-slate-700">
              Stage: {['Axes', 'Labels', 'Scale', 'Bars', 'Title'][currentBuildStep]}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setCurrentBuildStep((prev) => Math.max(0, prev - 1))}
                disabled={currentBuildStep === 0}
                className="min-h-[48px] px-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setCurrentBuildStep((prev) => Math.min(4, prev + 1))}
                disabled={currentBuildStep === 4}
                className="min-h-[48px] px-5 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 shadow"
              >
                Next step
              </button>
              <button
                type="button"
                onClick={() => setCurrentBuildStep(0)}
                className="min-h-[48px] px-4 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 text-slate-700"
              >
                Replay
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rules Checklist (Step 4 demo) */}
      {showRulesChecklist && (
        <div className="bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-sm">
          <h4 className="text-xl font-black text-slate-900 mb-4 pb-2 border-b border-slate-100">
            Checklist
          </h4>
          <ul className="space-y-3">
            {rules.map((rule, idx) => (
              <li
                key={idx}
                className={`flex items-center gap-3 p-2.5 rounded-xl transition-all ${
                  rule.active ? 'bg-blue-50/80 text-blue-900 font-bold' : 'text-slate-400 font-medium'
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-sm ${
                    rule.active ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-400'
                  }`}
                >
                  {rule.active ? '✓' : idx + 1}
                </div>
                <span className="text-lg">{rule.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
