import React from 'react';
import { GridType } from '../../types';

interface WorkingSpaceCanvasProps {
  gridType: GridType;
  onChangeGridType?: (type: GridType) => void;
  showSelector?: boolean;
  className?: string;
}

export const WorkingSpaceCanvas: React.FC<WorkingSpaceCanvasProps> = ({
  gridType,
  onChangeGridType,
  showSelector = true,
  className = '',
}) => {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[#FAF7F2] ${className}`}>
      {/* Background Grid Patterns */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Dot Grid */}
          <pattern id="dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="16" cy="16" r="1.5" fill="#CBD5E1" />
          </pattern>

          {/* Square Grid */}
          <pattern id="square-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E2E8F0" strokeWidth="1.5" />
          </pattern>

          {/* Lined */}
          <pattern id="lined-pattern" x="0" y="0" width="100" height="36" patternUnits="userSpaceOnUse">
            <line x1="0" y1="36" x2="100" y2="36" stroke="#E2E8F0" strokeWidth="1.5" />
          </pattern>

          {/* Graph Paper with Axes */}
          <pattern id="graph-small" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E2E8F0" strokeWidth="1" />
          </pattern>
          <pattern id="graph-large" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <rect width="80" height="80" fill="url(#graph-small)" />
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#CBD5E1" strokeWidth="1.75" />
          </pattern>
        </defs>

        {gridType === 'dot' && <rect width="100%" height="100%" fill="url(#dot-pattern)" />}
        {gridType === 'square' && <rect width="100%" height="100%" fill="url(#square-pattern)" />}
        {gridType === 'lined' && <rect width="100%" height="100%" fill="url(#lined-pattern)" />}
        {gridType === 'graph' && (
          <>
            <rect width="100%" height="100%" fill="url(#graph-large)" />
            {/* Graph Paper Baseline Axes */}
            <g stroke="#94A3B8" strokeWidth="2.5">
              <line x1="60" y1="40" x2="60" y2="92%" />
              <line x1="60" y1="92%" x2="96%" y2="92%" />
              {/* Arrowheads */}
              <polyline points="55,50 60,35 65,50" fill="none" />
              <polyline points="95%,87% 96.5%,92% 95%,97%" fill="none" />
            </g>
          </>
        )}
      </svg>

      {/* Grid Pattern Toggle Buttons (Teacher-friendly, large touch targets) */}
      {showSelector && onChangeGridType && (
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 bg-white/95 rounded-2xl shadow-sm border border-slate-200">
          {(
            [
              { id: 'blank', label: 'Blank' },
              { id: 'dot', label: 'Dots' },
              { id: 'square', label: 'Grid' },
              { id: 'lined', label: 'Lined' },
              { id: 'graph', label: 'Graph Paper' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onChangeGridType(item.id)}
              className={`min-h-[44px] px-3.5 py-1.5 rounded-xl font-bold text-sm tracking-wide transition-all ${
                gridType === item.id
                  ? 'bg-slate-900 text-white shadow'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
