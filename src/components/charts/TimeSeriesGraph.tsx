import React, { useState } from 'react';

export interface TimeSeriesPoint {
  timeLabel: string;
  value: number;
}

interface TimeSeriesGraphProps {
  data: TimeSeriesPoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  accentColor?: string;
  showTrendArrow?: boolean;
  minY?: number;
  maxY?: number;
  yStep?: number;
}

export const TimeSeriesGraph: React.FC<TimeSeriesGraphProps> = ({
  data,
  title = 'Temperature at midday (°C)',
  xLabel = 'Day of the week',
  yLabel = 'Temperature (°C)',
  accentColor = '#0D9488',
  showTrendArrow = false,
  minY,
  maxY,
  yStep,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(3);

  const values = data.map((d) => d.value);
  const dataMin = Math.min(...values);
  const dataMax = Math.max(...values);

  const calculatedMinY = minY !== undefined ? minY : Math.floor(Math.max(0, dataMin - 4) / 5) * 5;
  const calculatedMaxY = maxY !== undefined ? maxY : Math.ceil((dataMax + 4) / 5) * 5;
  const step = yStep || Math.max(2, Math.ceil((calculatedMaxY - calculatedMinY) / 6));

  const yTicks: number[] = [];
  for (let y = calculatedMinY; y <= calculatedMaxY; y += step) {
    yTicks.push(y);
  }

  const svgWidth = 740;
  const svgHeight = 440;
  const margin = { top: 60, right: 50, bottom: 80, left: 90 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const count = data.length;
  const getX = (idx: number) => margin.left + (idx / (count - 1)) * plotWidth;
  const getY = (val: number) =>
    margin.top +
    plotHeight -
    ((val - calculatedMinY) / (calculatedMaxY - calculatedMinY)) * plotHeight;

  // Points path string
  const pathD = data
    .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.value)}`)
    .join(' ');

  const activePoint = data[selectedIndex];
  const activeX = getX(selectedIndex);
  const activeY = getY(activePoint?.value ?? 0);

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Header reading panel */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="text-xl font-black text-slate-900">{title}</div>
          {activePoint && (
            <div className="flex items-center gap-3 bg-teal-50 px-5 py-2.5 rounded-2xl border border-teal-200">
              <span className="text-lg font-bold text-teal-900">{activePoint.timeLabel}:</span>
              <span className="text-2xl font-black text-teal-700 math-font">
                {activePoint.value}
              </span>
            </div>
          )}
        </div>

        {/* SVG Time Series Graph */}
        <div className="mt-4 flex justify-center">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            className="w-full max-w-[700px] h-auto select-none"
          >
            {/* Gridlines */}
            {yTicks.map((tick) => {
              const y = getY(tick);
              return (
                <line
                  key={tick}
                  x1={margin.left}
                  y1={y}
                  x2={margin.left + plotWidth}
                  y2={y}
                  stroke="#E2E8F0"
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
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
              const y = getY(tick);
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
              y={26}
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

            {/* Horizontal Guide Line to Y Axis from active point */}
            {activePoint && (
              <g stroke="#E11D48" strokeWidth="2.5" strokeDasharray="5,5">
                <line x1={margin.left} y1={activeY} x2={activeX} y2={activeY} />
                <line x1={activeX} y1={activeY} x2={activeX} y2={margin.top + plotHeight} />
              </g>
            )}

            {/* Line connecting points */}
            <path
              d={pathD}
              fill="none"
              stroke={accentColor}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Trend Arrow (if enabled) */}
            {showTrendArrow && (
              <g stroke="#E11D48" strokeWidth="3.5" markerEnd="url(#arrow)">
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="5"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#E11D48" />
                  </marker>
                </defs>
                <line
                  x1={getX(0)}
                  y1={getY(data[0].value) - 20}
                  x2={getX(count - 1)}
                  y2={getY(data[count - 1].value) - 20}
                  markerEnd="url(#arrow)"
                />
              </g>
            )}

            {/* Data Points (Tappable touch targets) */}
            {data.map((d, i) => {
              const x = getX(i);
              const y = getY(d.value);
              const isSelected = selectedIndex === i;

              return (
                <g
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setSelectedIndex(i)}
                >
                  {/* Invisible enlarged touch area */}
                  <circle cx={x} cy={y} r="28" fill="transparent" />

                  {/* Visual Point */}
                  <circle
                    cx={x}
                    cy={y}
                    r={isSelected ? 10 : 7}
                    fill={isSelected ? '#E11D48' : '#FFFFFF'}
                    stroke={isSelected ? '#9F1239' : accentColor}
                    strokeWidth="3.5"
                    className="transition-all duration-200"
                  />

                  {/* Value above point */}
                  <text
                    x={x}
                    y={y - 16}
                    textAnchor="middle"
                    className="fill-slate-900 font-black math-font"
                    style={{ fontSize: '20px' }}
                  >
                    {d.value}
                  </text>

                  {/* X Axis Time Tick & Label */}
                  <line
                    x1={x}
                    y1={margin.top + plotHeight}
                    x2={x}
                    y2={margin.top + plotHeight + 10}
                    stroke="#334155"
                    strokeWidth="2.5"
                  />
                  <text
                    x={x}
                    y={margin.top + plotHeight + 36}
                    textAnchor="middle"
                    className="fill-slate-900 font-bold"
                    style={{ fontSize: count > 8 ? '16px' : '20px' }}
                  >
                    {d.timeLabel}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Timeline Slider Control */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-6">
          <span className="text-base font-bold text-slate-700 whitespace-nowrap">
            Point selector:
          </span>
          <input
            type="range"
            min={0}
            max={count - 1}
            value={selectedIndex}
            onChange={(e) => setSelectedIndex(Number(e.target.value))}
            className="w-full h-4 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
          />
        </div>
      </div>
    </div>
  );
};
