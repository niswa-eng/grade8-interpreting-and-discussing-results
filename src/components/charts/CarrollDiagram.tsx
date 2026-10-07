import React from 'react';

export const CarrollDiagram: React.FC = () => {
  // Numbers from 1 to 12 sorted into Even/Not Even and Multiple of 3/Not Multiple of 3
  const cells = {
    evenMult3: [6, 12],
    evenNotMult3: [2, 4, 8, 10],
    oddMult3: [3, 9],
    oddNotMult3: [1, 5, 7, 11],
  };

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="relative bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-3xl">
        <h4 className="text-2xl font-black text-slate-900 mb-6 text-center">
          Carroll Diagram: Numbers from 1 to 12
        </h4>

        {/* 2x2 Carroll Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xl">
          {/* Top-left empty header */}
          <div className="p-4" />

          {/* Column Headers */}
          <div className="p-4 bg-purple-100 rounded-2xl font-black text-purple-900 text-2xl">
            Multiple of 3
          </div>
          <div className="p-4 bg-purple-50 rounded-2xl font-black text-purple-800 text-2xl">
            Not a multiple of 3
          </div>

          {/* Row 1 Header: Even */}
          <div className="p-4 bg-blue-100 rounded-2xl font-black text-blue-900 flex items-center justify-center text-2xl">
            Even
          </div>

          {/* Cell 1: Even & Multiple of 3 */}
          <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center gap-4 flex-wrap min-h-[90px]">
            {cells.evenMult3.map((n) => (
              <span
                key={n}
                className="w-12 h-12 rounded-xl bg-purple-600 text-white font-black text-2xl flex items-center justify-center math-font shadow-sm"
              >
                {n}
              </span>
            ))}
          </div>

          {/* Cell 2: Even & Not Multiple of 3 */}
          <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center gap-3 flex-wrap min-h-[90px]">
            {cells.evenNotMult3.map((n) => (
              <span
                key={n}
                className="w-12 h-12 rounded-xl bg-blue-600 text-white font-black text-2xl flex items-center justify-center math-font shadow-sm"
              >
                {n}
              </span>
            ))}
          </div>

          {/* Row 2 Header: Not Even */}
          <div className="p-4 bg-blue-50 rounded-2xl font-black text-blue-800 flex items-center justify-center text-2xl">
            Not even (Odd)
          </div>

          {/* Cell 3: Odd & Multiple of 3 */}
          <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center gap-3 flex-wrap min-h-[90px]">
            {cells.oddMult3.map((n) => (
              <span
                key={n}
                className="w-12 h-12 rounded-xl bg-teal-600 text-white font-black text-2xl flex items-center justify-center math-font shadow-sm"
              >
                {n}
              </span>
            ))}
          </div>

          {/* Cell 4: Odd & Not Multiple of 3 */}
          <div className="p-6 bg-slate-50 border-2 border-slate-200 rounded-2xl flex items-center justify-center gap-3 flex-wrap min-h-[90px]">
            {cells.oddNotMult3.map((n) => (
              <span
                key={n}
                className="w-12 h-12 rounded-xl bg-slate-700 text-white font-black text-2xl flex items-center justify-center math-font shadow-sm"
              >
                {n}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
