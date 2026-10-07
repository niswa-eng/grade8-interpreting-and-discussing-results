import React, { useState, useRef } from 'react';
import { calculatePieSectors } from '../../utils/mathUtils';
import { Compass, RotateCw } from 'lucide-react';

export interface PieCategory {
  label: string;
  count: number;
  color?: string;
}

interface PieChartProps {
  categories?: PieCategory[];
  title?: string;
  showTable?: boolean;
  showProtractorOption?: boolean;
  animatedStep?: number; // 0=none, 1..N sectors revealed
  comparisonMode?: boolean; // For School A vs School B
  comparisonData?: {
    schoolAName: string;
    schoolATotal: number;
    schoolAWalk: number;
    schoolBName: string;
    schoolBTotal: number;
    schoolBWalk: number;
  };
}

export const PieChart: React.FC<PieChartProps> = ({
  categories = [
    { label: 'Apple', count: 12, color: '#DC2626' },
    { label: 'Banana', count: 9, color: '#EAB308' },
    { label: 'Orange', count: 6, color: '#EA580C' },
    { label: 'Grapes', count: 9, color: '#9333EA' },
  ],
  title = 'Favourite fruit of 36 students',
  showTable = true,
  showProtractorOption = true,
  animatedStep,
  comparisonMode = false,
  comparisonData,
}) => {
  const [showProtractor, setShowProtractor] = useState(false);
  const [protractorRotation, setProtractorRotation] = useState(0);
  const [protractorPos, setProtractorPos] = useState({ x: 220, y: 220 });
  const [isDraggingProtractor, setIsDraggingProtractor] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, initialX: 0, initialY: 0 });

  const { sectors, total } = calculatePieSectors(categories);

  const radius = 170;
  const centerX = 220;
  const centerY = 220;

  // Generate SVG path for a sector
  const getSectorPath = (startAngle: number, endAngle: number, r: number) => {
    const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
    const x1 = centerX + r * Math.cos(toRad(startAngle));
    const y1 = centerY + r * Math.sin(toRad(startAngle));
    const x2 = centerX + r * Math.cos(toRad(endAngle));
    const y2 = centerY + r * Math.sin(toRad(endAngle));

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  // Protractor drag handlers
  const handlePointerDownProtractor = (e: React.PointerEvent) => {
    setIsDraggingProtractor(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      initialX: protractorPos.x,
      initialY: protractorPos.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMoveProtractor = (e: React.PointerEvent) => {
    if (!isDraggingProtractor) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setProtractorPos({
      x: dragStartRef.current.initialX + dx,
      y: dragStartRef.current.initialY + dy,
    });
  };

  const handlePointerUpProtractor = () => {
    setIsDraggingProtractor(false);
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      {/* Comparison Mode (School A vs School B) */}
      {comparisonMode && comparisonData ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {/* School A */}
          <div className="bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center">
            <h4 className="text-2xl font-black text-slate-900 mb-1">{comparisonData.schoolAName}</h4>
            <p className="text-lg font-bold text-slate-600 mb-4">
              Total students: <span className="text-slate-900 math-font text-xl">{comparisonData.schoolATotal}</span>
            </p>
            <svg viewBox="0 0 340 340" className="w-64 h-64">
              {/* 40% walk = 144 deg */}
              <circle cx="170" cy="170" r="130" fill="#E2E8F0" />
              <path
                d={`M 170 170 L 170 40 A 130 130 0 0 1 ${170 + 130 * Math.cos(((144 - 90) * Math.PI) / 180)} ${170 + 130 * Math.sin(((144 - 90) * Math.PI) / 180)} Z`}
                fill="#2563EB"
              />
            </svg>
            <div className="mt-4 text-center">
              <span className="text-2xl font-black text-blue-700">40% Walk</span>
              <div className="text-xl font-bold text-slate-800 math-font mt-1">
                = {comparisonData.schoolAWalk} students
              </div>
            </div>
          </div>

          {/* School B */}
          <div className="bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center">
            <h4 className="text-2xl font-black text-slate-900 mb-1">{comparisonData.schoolBName}</h4>
            <p className="text-lg font-bold text-slate-600 mb-4">
              Total students: <span className="text-slate-900 math-font text-xl">{comparisonData.schoolBTotal}</span>
            </p>
            <svg viewBox="0 0 340 340" className="w-64 h-64">
              {/* 30% walk = 108 deg */}
              <circle cx="170" cy="170" r="130" fill="#E2E8F0" />
              <path
                d={`M 170 170 L 170 40 A 130 130 0 0 1 ${170 + 130 * Math.cos(((108 - 90) * Math.PI) / 180)} ${170 + 130 * Math.sin(((108 - 90) * Math.PI) / 180)} Z`}
                fill="#0D9488"
              />
            </svg>
            <div className="mt-4 text-center">
              <span className="text-2xl font-black text-teal-700">30% Walk</span>
              <div className="text-xl font-bold text-slate-800 math-font mt-1">
                = {comparisonData.schoolBWalk} students
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Standard Pie Chart Display */
        <div className="flex flex-col xl:flex-row items-center gap-8 justify-center w-full max-w-5xl">
          {/* SVG Pie Chart Stage */}
          <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col items-center">
            <h4 className="text-2xl font-black text-slate-900 mb-4">{title}</h4>

            <div className="relative w-[440px] h-[440px] flex items-center justify-center">
              <svg viewBox="0 0 440 440" className="w-full h-full select-none">
                {/* Background circle outline */}
                <circle cx={centerX} cy={centerY} r={radius} fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />

                {/* Sectors */}
                {sectors.map((sec, idx) => {
                  if (animatedStep !== undefined && idx >= animatedStep) return null;
                  const path = getSectorPath(sec.startAngle, sec.endAngle, radius);
                  const midAngle = (sec.startAngle + sec.endAngle) / 2;
                  const midRad = ((midAngle - 90) * Math.PI) / 180;
                  const labelX = centerX + (radius * 0.65) * Math.cos(midRad);
                  const labelY = centerY + (radius * 0.65) * Math.sin(midRad);

                  return (
                    <g key={sec.label}>
                      <path d={path} fill={sec.color} stroke="#FFFFFF" strokeWidth="2.5" />
                      {/* Label on sector if angle large enough */}
                      {sec.angle >= 25 && (
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="fill-white font-extrabold text-lg math-font drop-shadow-sm"
                          style={{ fontSize: '18px' }}
                        >
                          {sec.label} ({sec.angle}°)
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Center point */}
                <circle cx={centerX} cy={centerY} r="5" fill="#0F172A" />
              </svg>

              {/* Draggable & Rotatable Protractor Overlay */}
              {showProtractor && (
                <div
                  onPointerDown={handlePointerDownProtractor}
                  onPointerMove={handlePointerMoveProtractor}
                  onPointerUp={handlePointerUpProtractor}
                  style={{
                    left: `${protractorPos.x - 170}px`,
                    top: `${protractorPos.y - 170}px`,
                    transform: `rotate(${protractorRotation}deg)`,
                    touchAction: 'none',
                  }}
                  className="absolute w-[340px] h-[340px] cursor-move select-none z-30 pointer-events-auto"
                >
                  <svg viewBox="0 0 340 340" className="w-full h-full opacity-85">
                    {/* Semi-transparent protractor body */}
                    <circle
                      cx="170"
                      cy="170"
                      r="160"
                      fill="rgba(56, 189, 248, 0.25)"
                      stroke="#0284C7"
                      strokeWidth="2.5"
                    />
                    <circle cx="170" cy="170" r="40" fill="none" stroke="#0284C7" strokeWidth="1.5" />
                    <line x1="10" y1="170" x2="330" y2="170" stroke="#0284C7" strokeWidth="2" />
                    <line x1="170" y1="10" x2="170" y2="330" stroke="#0284C7" strokeWidth="2" />

                    {/* Degree tick marks every 10 degrees */}
                    {Array.from({ length: 36 }).map((_, i) => {
                      const deg = i * 10;
                      const rad = ((deg - 90) * Math.PI) / 180;
                      const x1 = 170 + 160 * Math.cos(rad);
                      const y1 = 170 + 160 * Math.sin(rad);
                      const x2 = 170 + (deg % 30 === 0 ? 142 : 150) * Math.cos(rad);
                      const y2 = 170 + (deg % 30 === 0 ? 142 : 150) * Math.sin(rad);

                      return (
                        <g key={i}>
                          <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#0369A1" strokeWidth="1.5" />
                          {deg % 30 === 0 && (
                            <text
                              x={170 + 130 * Math.cos(rad)}
                              y={170 + 130 * Math.sin(rad)}
                              textAnchor="middle"
                              dominantBaseline="central"
                              className="fill-sky-950 font-bold math-font"
                              style={{ fontSize: '11px' }}
                            >
                              {deg}°
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>

            {/* Protractor Controls Toggle */}
            {showProtractorOption && (
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between w-full">
                <button
                  type="button"
                  onClick={() => setShowProtractor(!showProtractor)}
                  className={`min-h-[48px] px-5 rounded-xl font-bold flex items-center gap-2 transition-all ${
                    showProtractor
                      ? 'bg-sky-600 text-white shadow'
                      : 'bg-slate-100 text-slate-800 hover:bg-slate-200'
                  }`}
                >
                  <Compass className="w-5 h-5" />
                  <span>{showProtractor ? 'Hide Protractor' : 'Show Protractor'}</span>
                </button>

                {showProtractor && (
                  <div className="flex items-center gap-3">
                    <RotateCw className="w-5 h-5 text-slate-500" />
                    <input
                      type="range"
                      min={0}
                      max={360}
                      value={protractorRotation}
                      onChange={(e) => setProtractorRotation(Number(e.target.value))}
                      className="w-36 h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
                    />
                    <span className="text-lg font-bold text-slate-800 math-font w-12 text-right">
                      {protractorRotation}°
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Angle Calculation Table */}
          {showTable && (
            <div className="bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-md">
              <h4 className="text-xl font-black text-slate-900 mb-2">Angle Calculation</h4>
              <p className="text-base font-bold text-slate-600 mb-4">
                Formula: <span className="text-blue-700 math-font">(frequency ÷ total) × 360°</span>
              </p>

              <div className="overflow-hidden rounded-2xl border border-slate-200">
                <table className="w-full text-left text-lg">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4 font-black text-slate-900">Category</th>
                      <th className="py-3 px-4 font-black text-slate-900 text-center">Count</th>
                      <th className="py-3 px-4 font-black text-slate-900 text-right">Angle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {sectors.map((sec) => (
                      <tr key={sec.label} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold flex items-center gap-2">
                          <span
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: sec.color }}
                          />
                          <span className="text-slate-800">{sec.label}</span>
                        </td>
                        <td className="py-3 px-4 font-bold text-center text-slate-900 math-font">
                          {sec.count}
                        </td>
                        <td className="py-3 px-4 font-black text-right text-blue-700 math-font">
                          {sec.angle}°
                        </td>
                      </tr>
                    ))}
                    {/* Total Row */}
                    <tr className="bg-slate-50 font-black">
                      <td className="py-3 px-4 text-slate-900">Total</td>
                      <td className="py-3 px-4 text-center text-slate-900 math-font">{total}</td>
                      <td className="py-3 px-4 text-right text-slate-900 math-font">360°</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
