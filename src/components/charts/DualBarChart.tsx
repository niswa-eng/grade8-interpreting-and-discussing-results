import React from 'react';

export interface DualBarItem {
  category: string;
  series1Value: number;
  series2Value: number;
}

interface DualBarChartProps {
  data?: DualBarItem[];
  title?: string;
  series1Name?: string;
  series2Name?: string;
  series1Color?: string;
  series2Color?: string;
  yLabel?: string;
  xLabel?: string;
}

export const DualBarChart: React.FC<DualBarChartProps> = ({
  data = [
    { category: 'Jan', series1Value: 65, series2Value: 40 },
    { category: 'Feb', series1Value: 55, series2Value: 35 },
    { category: 'Mar', series1Value: 70, series2Value: 50 },
    { category: 'Apr', series1Value: 45, series2Value: 60 },
    { category: 'May', series1Value: 35, series2Value: 55 },
    { category: 'Jun', series1Value: 20, series2Value: 45 },
  ],
  title = 'Rainfall in City A and City B (Jan - Jun)',
  series1Name = 'City A',
  series2Name = 'City B',
  series1Color = '#2563EB',
  series2Color = '#EA580C',
  yLabel = 'Rainfall (mm)',
  xLabel = 'Month',
}) => {
  const svgWidth = 720;
  const svgHeight = 440;
  const margin = { top: 60, right: 40, bottom: 80, left: 90 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const maxVal = 80;
  const yTicks = [0, 20, 40, 60, 80];

  const slotWidth = plotWidth / data.length;
  const barWidth = slotWidth * 0.35;
  const gap = slotWidth * 0.05;

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Header & Legend */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="text-xl font-black text-slate-900">{title}</div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md" style={{ backgroundColor: series1Color }} />
              <span className="font-bold text-slate-800">{series1Name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 rounded-md" style={{ backgroundColor: series2Color }} />
              <span className="font-bold text-slate-800">{series2Name}</span>
            </div>
          </div>
        </div>

        {/* SVG Dual Bar Chart */}
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

            {/* Dual Bars */}
            {data.map((item, idx) => {
              const slotStartX = margin.left + idx * slotWidth;
              const bar1X = slotStartX + (slotWidth - (barWidth * 2 + gap)) / 2;
              const bar2X = bar1X + barWidth + gap;

              const h1 = (item.series1Value / maxVal) * plotHeight;
              const y1 = margin.top + plotHeight - h1;
              const h2 = (item.series2Value / maxVal) * plotHeight;
              const y2 = margin.top + plotHeight - h2;

              return (
                <g key={item.category}>
                  {/* Bar 1 */}
                  <rect x={bar1X} y={y1} width={barWidth} height={h1} fill={series1Color} rx={3} />
                  <text
                    x={bar1X + barWidth / 2}
                    y={y1 - 6}
                    textAnchor="middle"
                    className="fill-slate-800 font-bold math-font"
                    style={{ fontSize: '16px' }}
                  >
                    {item.series1Value}
                  </text>

                  {/* Bar 2 */}
                  <rect x={bar2X} y={y2} width={barWidth} height={h2} fill={series2Color} rx={3} />
                  <text
                    x={bar2X + barWidth / 2}
                    y={y2 - 6}
                    textAnchor="middle"
                    className="fill-slate-800 font-bold math-font"
                    style={{ fontSize: '16px' }}
                  >
                    {item.series2Value}
                  </text>

                  {/* Category Label */}
                  <text
                    x={slotStartX + slotWidth / 2}
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
