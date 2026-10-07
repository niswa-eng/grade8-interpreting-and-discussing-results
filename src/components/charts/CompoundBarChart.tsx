import React from 'react';

export interface CompoundBarItem {
  category: string;
  part1Value: number;
  part2Value: number;
}

interface CompoundBarChartProps {
  data?: CompoundBarItem[];
  title?: string;
  part1Name?: string;
  part2Name?: string;
  part1Color?: string;
  part2Color?: string;
  yLabel?: string;
  xLabel?: string;
}

export const CompoundBarChart: React.FC<CompoundBarChartProps> = ({
  data = [
    { category: 'Year 7', part1Value: 48, part2Value: 52 },
    { category: 'Year 8', part1Value: 55, part2Value: 45 },
    { category: 'Year 9', part1Value: 50, part2Value: 60 },
  ],
  title = 'Students in Years 7, 8 and 9 (Boys and Girls)',
  part1Name = 'Boys',
  part2Name = 'Girls',
  part1Color = '#3B82F6',
  part2Color = '#EC4899',
  yLabel = 'Total students',
  xLabel = 'Year group',
}) => {
  const svgWidth = 720;
  const svgHeight = 440;
  const margin = { top: 60, right: 40, bottom: 80, left: 90 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const maxVal = 120;
  const yTicks = [0, 30, 60, 90, 120];

  const slotWidth = plotWidth / data.length;
  const barWidth = slotWidth * 0.45;

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Header & Legend */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="text-xl font-black text-slate-900">{title}</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md" style={{ backgroundColor: part1Color }} />
              <span className="font-bold text-slate-800">{part1Name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md" style={{ backgroundColor: part2Color }} />
              <span className="font-bold text-slate-800">{part2Name}</span>
            </div>
          </div>
        </div>

        {/* SVG Compound Bar Chart */}
        <div className="mt-4 flex justify-center">
          <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-[680px] h-auto select-none">
            {/* Gridlines */}
            {yTicks.map((tick) => {
              const y = margin.top + plotHeight - (tick / maxVal) * plotHeight;
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
              <line x1={margin.left} y1={margin.top} x2={margin.left} y2={margin.top + plotHeight} />
              <line
                x1={margin.left}
                y1={margin.top + plotHeight}
                x2={margin.left + plotWidth}
                y2={margin.top + plotHeight}
              />
            </g>

            {/* Y Axis Numbers & Ticks */}
            {yTicks.map((tick) => {
              const y = margin.top + plotHeight - (tick / maxVal) * plotHeight;
              return (
                <g key={tick}>
                  <line x1={margin.left - 8} y1={y} x2={margin.left} y2={y} stroke="#334155" strokeWidth="2.5" />
                  <text
                    x={margin.left - 16}
                    y={y + 7}
                    textAnchor="end"
                    className="fill-slate-700 font-bold math-font"
                    style={{ fontSize: '20px' }}
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

            {/* Stacked Bars */}
            {data.map((item, idx) => {
              const total = item.part1Value + item.part2Value;
              const barX = margin.left + idx * slotWidth + (slotWidth - barWidth) / 2;

              const h1 = (item.part1Value / maxVal) * plotHeight;
              const h2 = (item.part2Value / maxVal) * plotHeight;

              const yPart1 = margin.top + plotHeight - h1;
              const yPart2 = yPart1 - h2;

              return (
                <g key={item.category}>
                  {/* Part 1 (Bottom) */}
                  <rect x={barX} y={yPart1} width={barWidth} height={h1} fill={part1Color} rx={2} />
                  <text
                    x={barX + barWidth / 2}
                    y={yPart1 + h1 / 2 + 6}
                    textAnchor="middle"
                    className="fill-white font-black math-font"
                    style={{ fontSize: '18px' }}
                  >
                    {item.part1Value}
                  </text>

                  {/* Part 2 (Top) */}
                  <rect x={barX} y={yPart2} width={barWidth} height={h2} fill={part2Color} rx={2} />
                  <text
                    x={barX + barWidth / 2}
                    y={yPart2 + h2 / 2 + 6}
                    textAnchor="middle"
                    className="fill-white font-black math-font"
                    style={{ fontSize: '18px' }}
                  >
                    {item.part2Value}
                  </text>

                  {/* Total on top of compound bar */}
                  <text
                    x={barX + barWidth / 2}
                    y={yPart2 - 8}
                    textAnchor="middle"
                    className="fill-slate-900 font-black math-font"
                    style={{ fontSize: '20px' }}
                  >
                    Total: {total}
                  </text>

                  {/* Category Label */}
                  <text
                    x={barX + barWidth / 2}
                    y={margin.top + plotHeight + 36}
                    textAnchor="middle"
                    className="fill-slate-900 font-bold"
                    style={{ fontSize: '20px' }}
                  >
                    {item.category}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
};
