import React, { useState } from 'react';

interface VennDiagramProps {
  total?: number;
  setAName?: string;
  setBName?: string;
  onlyACount?: number;
  bothCount?: number;
  onlyBCount?: number;
  neitherCount?: number;
  interactiveRegions?: boolean;
}

export const VennDiagram: React.FC<VennDiagramProps> = ({
  total = 30,
  setAName = 'Football (18)',
  setBName = 'Basketball (14)',
  onlyACount = 12,
  bothCount = 6,
  onlyBCount = 8,
  neitherCount = 4,
  interactiveRegions = true,
}) => {
  const [highlightedRegion, setHighlightedRegion] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-6 shadow-sm border border-slate-200 w-full max-w-3xl flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <span className="text-xl font-black text-slate-900">Total: {total} students</span>
          <div className="flex items-center gap-4 text-base font-bold text-slate-700">
            <span>Football: 12 + 6 = 18</span>
            <span>·</span>
            <span>Basketball: 8 + 6 = 14</span>
          </div>
        </div>

        {/* SVG Venn Diagram */}
        <div className="relative w-full max-w-[620px] my-4">
          <svg viewBox="0 0 620 400" className="w-full h-auto select-none">
            {/* Universal Set Rectangle */}
            <rect
              x="20"
              y="20"
              width="580"
              height="360"
              rx="24"
              fill="#F8FAFC"
              stroke="#64748B"
              strokeWidth="3"
            />
            <text
              x="46"
              y="58"
              className="fill-slate-700 font-extrabold text-2xl"
              style={{ fontSize: '26px' }}
            >
              Universal set (30)
            </text>

            {/* Set A Circle (Football) */}
            <circle
              cx="230"
              cy="210"
              r="140"
              fill={highlightedRegion === 'A' ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.2)'}
              stroke="#2563EB"
              strokeWidth="3.5"
              className="cursor-pointer transition-colors"
              onClick={() => setHighlightedRegion(highlightedRegion === 'A' ? null : 'A')}
            />

            {/* Set B Circle (Basketball) */}
            <circle
              cx="390"
              cy="210"
              r="140"
              fill={highlightedRegion === 'B' ? 'rgba(234, 88, 12, 0.4)' : 'rgba(234, 88, 12, 0.2)'}
              stroke="#EA580C"
              strokeWidth="3.5"
              className="cursor-pointer transition-colors"
              onClick={() => setHighlightedRegion(highlightedRegion === 'B' ? null : 'B')}
            />

            {/* Set Titles */}
            <text
              x="180"
              y="110"
              textAnchor="middle"
              className="fill-blue-900 font-black text-2xl"
              style={{ fontSize: '24px' }}
            >
              {setAName}
            </text>
            <text
              x="440"
              y="110"
              textAnchor="middle"
              className="fill-orange-900 font-black text-2xl"
              style={{ fontSize: '24px' }}
            >
              {setBName}
            </text>

            {/* Only Football (12) */}
            <text
              x="170"
              y="225"
              textAnchor="middle"
              className="fill-blue-950 font-black text-4xl math-font"
              style={{ fontSize: '44px' }}
            >
              {onlyACount}
            </text>
            <text
              x="170"
              y="260"
              textAnchor="middle"
              className="fill-blue-800 font-bold text-lg"
              style={{ fontSize: '18px' }}
            >
              (Football only)
            </text>

            {/* Both Overlap (6) */}
            <text
              x="310"
              y="225"
              textAnchor="middle"
              className="fill-purple-950 font-black text-4xl math-font"
              style={{ fontSize: '44px' }}
            >
              {bothCount}
            </text>
            <text
              x="310"
              y="260"
              textAnchor="middle"
              className="fill-purple-900 font-bold text-lg"
              style={{ fontSize: '18px' }}
            >
              (Both)
            </text>

            {/* Only Basketball (8) */}
            <text
              x="450"
              y="225"
              textAnchor="middle"
              className="fill-orange-950 font-black text-4xl math-font"
              style={{ fontSize: '44px' }}
            >
              {onlyBCount}
            </text>
            <text
              x="450"
              y="260"
              textAnchor="middle"
              className="fill-orange-800 font-bold text-lg"
              style={{ fontSize: '18px' }}
            >
              (Basketball only)
            </text>

            {/* Neither Outside (4) */}
            <text
              x="540"
              y="330"
              textAnchor="middle"
              className="fill-slate-900 font-black text-4xl math-font"
              style={{ fontSize: '44px' }}
            >
              {neitherCount}
            </text>
            <text
              x="540"
              y="360"
              textAnchor="middle"
              className="fill-slate-600 font-bold text-lg"
              style={{ fontSize: '18px' }}
            >
              (Neither)
            </text>
          </svg>
        </div>

        {/* Total Verification equation */}
        <div className="w-full text-center pt-3 border-t border-slate-100 text-xl font-bold text-slate-800">
          Calculation:{' '}
          <span className="math-font text-blue-700">{onlyACount}</span> +{' '}
          <span className="math-font text-purple-700">{bothCount}</span> +{' '}
          <span className="math-font text-orange-700">{onlyBCount}</span> +{' '}
          <span className="math-font text-slate-700">{neitherCount}</span> ={' '}
          <span className="math-font text-slate-950 text-2xl font-black">{total}</span>
        </div>
      </div>
    </div>
  );
};
