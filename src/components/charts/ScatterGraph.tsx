import React, { useState } from 'react';

export interface ScatterPoint {
  x: number;
  y: number;
  label?: string;
}

interface ScatterGraphProps {
  initialPoints?: ScatterPoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  correlationType?: 'positive' | 'negative' | 'none';
  xMin?: number;
  xMax?: number;
  yMin?: number;
  yMax?: number;
  allowDragPoint?: boolean;
}

export const ScatterGraph: React.FC<ScatterGraphProps> = ({
  initialPoints = [
    { x: 1, y: 45 },
    { x: 2, y: 50 },
    { x: 3, y: 58 },
    { x: 4, y: 62 },
    { x: 5, y: 70 },
    { x: 6, y: 78 },
    { x: 7, y: 82 },
  ],
  title = 'Hours studied vs Test score',
  xLabel = 'Hours studied',
  yLabel = 'Test score (%)',
  correlationType = 'positive',
  xMin = 0,
  xMax = 8,
  yMin = 30,
  yMax = 90,
  allowDragPoint = true,
}) => {
  const [points, setPoints] = useState<ScatterPoint[]>(initialPoints);
  const [draggedPoint, setDraggedPoint] = useState<ScatterPoint>({ x: 4.5, y: 66 });
  const [isDragging, setIsDragging] = useState(false);

  const svgWidth = 720;
  const svgHeight = 440;
  const margin = { top: 60, right: 40, bottom: 80, left: 90 };
  const plotWidth = svgWidth - margin.left - margin.right;
  const plotHeight = svgHeight - margin.top - margin.bottom;

  const getX = (val: number) => margin.left + ((val - xMin) / (xMax - xMin)) * plotWidth;
  const getY = (val: number) => margin.top + plotHeight - ((val - yMin) / (yMax - yMin)) * plotHeight;

  const invertX = (px: number) => {
    const clamped = Math.max(margin.left, Math.min(margin.left + plotWidth, px));
    return Number((xMin + ((clamped - margin.left) / plotWidth) * (xMax - xMin)).toFixed(1));
  };

  const invertY = (py: number) => {
    const clamped = Math.max(margin.top, Math.min(margin.top + plotHeight, py));
    return Number((yMin + ((margin.top + plotHeight - clamped) / plotHeight) * (yMax - yMin)).toFixed(1));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!allowDragPoint) return;
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const svgX = ((e.clientX - rect.left) / rect.width) * svgWidth;
    const svgY = ((e.clientY - rect.top) / rect.height) * svgHeight;
    setDraggedPoint({ x: invertX(svgX), y: invertY(svgY) });
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Generate ticks
  const xTicks = [];
  const xStep = Math.max(1, Math.round((xMax - xMin) / 8));
  for (let x = xMin; x <= xMax; x += xStep) xTicks.push(x);

  const yTicks = [];
  const yStep = Math.max(5, Math.round((yMax - yMin) / 6));
  for (let y = yMin; y <= yMax; y += yStep) yTicks.push(y);

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="text-xl font-black text-slate-900">{title}</div>
          {allowDragPoint && (
            <div className="flex items-center gap-3 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-200">
              <span className="text-sm font-bold text-purple-900">Movable point:</span>
              <span className="text-xl font-black text-purple-700 math-font">
                ({draggedPoint.x}, {draggedPoint.y})
              </span>
            </div>
          )}
        </div>

        {/* SVG Plot */}
        <div className="mt-4 flex justify-center">
          <svg
            viewBox={`0 0 ${svgWidth} ${svgHeight}`}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="w-full max-w-[680px] h-auto select-none"
          >
            {/* Gridlines */}
            {yTicks.map((tick) => (
              <line
                key={tick}
                x1={margin.left}
                y1={getY(tick)}
                x2={margin.left + plotWidth}
                y2={getY(tick)}
                stroke="#E2E8F0"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            ))}
            {xTicks.map((tick) => (
              <line
                key={tick}
                x1={getX(tick)}
                y1={margin.top}
                x2={getX(tick)}
                y2={margin.top + plotHeight}
                stroke="#E2E8F0"
                strokeWidth="1.5"
                strokeDasharray="4,4"
              />
            ))}

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

            {/* Y Axis Ticks & Labels */}
            {yTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={margin.left - 8}
                  y1={getY(tick)}
                  x2={margin.left}
                  y2={getY(tick)}
                  stroke="#334155"
                  strokeWidth="2.5"
                />
                <text
                  x={margin.left - 16}
                  y={getY(tick) + 7}
                  textAnchor="end"
                  className="fill-slate-700 font-bold math-font"
                  style={{ fontSize: '20px' }}
                >
                  {tick}
                </text>
              </g>
            ))}

            {/* X Axis Ticks & Labels */}
            {xTicks.map((tick) => (
              <g key={tick}>
                <line
                  x1={getX(tick)}
                  y1={margin.top + plotHeight}
                  x2={getX(tick)}
                  y2={margin.top + plotHeight + 10}
                  stroke="#334155"
                  strokeWidth="2.5"
                />
                <text
                  x={getX(tick)}
                  y={margin.top + plotHeight + 36}
                  textAnchor="middle"
                  className="fill-slate-900 font-bold math-font"
                  style={{ fontSize: '20px' }}
                >
                  {tick}
                </text>
              </g>
            ))}

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

            {/* Trend Line (for positive or negative correlation) */}
            {correlationType === 'positive' && (
              <line
                x1={getX(1)}
                y1={getY(44)}
                x2={getX(7.5)}
                y2={getY(85)}
                stroke="#3B82F6"
                strokeWidth="3"
                strokeDasharray="6,6"
              />
            )}
            {correlationType === 'negative' && (
              <line
                x1={getX(1)}
                y1={getY(19)}
                x2={getX(6.5)}
                y2={getY(5)}
                stroke="#EF4444"
                strokeWidth="3"
                strokeDasharray="6,6"
              />
            )}

            {/* Plotted Data Points */}
            {points.map((pt, i) => (
              <circle
                key={i}
                cx={getX(pt.x)}
                cy={getY(pt.y)}
                r="7"
                fill="#2563EB"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            ))}

            {/* Draggable Teacher Point */}
            {allowDragPoint && (
              <g
                onPointerDown={handlePointerDown}
                className="cursor-move"
                transform={`translate(${getX(draggedPoint.x)}, ${getY(draggedPoint.y)})`}
              >
                <circle cx="0" cy="0" r="28" fill="rgba(147, 51, 234, 0.2)" />
                <circle cx="0" cy="0" r="10" fill="#9333EA" stroke="#FFFFFF" strokeWidth="3" />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
};
