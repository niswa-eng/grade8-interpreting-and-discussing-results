import React from 'react';

// SVG Tally Marks helper
export const SvgTallyGroup: React.FC<{ count: number }> = ({ count }) => {
  const fullGroups = Math.floor(count / 5);
  const remainder = count % 5;

  return (
    <div className="flex items-center gap-3">
      {Array.from({ length: fullGroups }).map((_, gIdx) => (
        <svg key={gIdx} viewBox="0 0 44 36" className="w-11 h-9">
          {/* 4 vertical lines */}
          <line x1="6" y1="4" x2="6" y2="32" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="4" x2="14" y2="32" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="22" y1="4" x2="22" y2="32" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="30" y1="4" x2="30" y2="32" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          {/* 1 diagonal strike line across all 4 */}
          <line x1="2" y1="30" x2="34" y2="6" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      ))}

      {remainder > 0 && (
        <svg viewBox="0 0 44 36" className="w-11 h-9">
          {Array.from({ length: remainder }).map((_, rIdx) => (
            <line
              key={rIdx}
              x1={6 + rIdx * 8}
              y1="4"
              x2={6 + rIdx * 8}
              y2="32"
              stroke="#0F172A"
              strokeWidth="3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      )}
    </div>
  );
};

// Tally Chart Component
export const TallyChart: React.FC<{
  items?: { label: string; count: number }[];
  title?: string;
}> = ({
  items = [
    { label: 'Red', count: 9 },
    { label: 'Blue', count: 8 },
    { label: 'Green', count: 3 },
  ],
  title = 'Tally Chart: Favourite Colour',
}) => {
  const total = items.reduce((acc, it) => acc + it.count, 0);

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-2xl">
        <h4 className="text-2xl font-black text-slate-900 mb-6 text-center">{title}</h4>
        <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
          <table className="w-full text-left text-xl">
            <thead className="bg-slate-100 border-b-2 border-slate-200">
              <tr>
                <th className="py-4 px-6 font-black text-slate-900">Colour</th>
                <th className="py-4 px-6 font-black text-slate-900">Tally</th>
                <th className="py-4 px-6 font-black text-slate-900 text-right">Frequency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {items.map((item) => (
                <tr key={item.label}>
                  <td className="py-4 px-6 font-bold text-slate-800 text-2xl">{item.label}</td>
                  <td className="py-4 px-6">
                    <SvgTallyGroup count={item.count} />
                  </td>
                  <td className="py-4 px-6 font-black text-right text-blue-700 math-font text-3xl">
                    {item.count}
                  </td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-black">
                <td className="py-4 px-6 text-slate-900 text-2xl">Total</td>
                <td className="py-4 px-6" />
                <td className="py-4 px-6 text-right text-slate-950 math-font text-3xl">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Two-Way Table Component
export const TwoWayTable: React.FC<{
  missingValue?: boolean;
}> = ({ missingValue = false }) => {
  // 40 students: Boys (3 left, 17 right, total 20), Girls (4 left, 16 right, total 20)
  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-2xl">
        <h4 className="text-2xl font-black text-slate-900 mb-6 text-center">
          Two-Way Table: 40 Students
        </h4>
        <div className="overflow-hidden rounded-2xl border-2 border-slate-200">
          <table className="w-full text-center text-xl">
            <thead className="bg-slate-100 border-b-2 border-slate-200">
              <tr>
                <th className="py-4 px-6 font-black text-slate-900 text-left">Group</th>
                <th className="py-4 px-6 font-black text-slate-900">Left-handed</th>
                <th className="py-4 px-6 font-black text-slate-900">Right-handed</th>
                <th className="py-4 px-6 font-black text-slate-900 bg-slate-200/60">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-bold text-2xl math-font">
              <tr>
                <td className="py-4 px-6 font-black text-slate-800 text-left text-xl">Boys</td>
                <td className="py-4 px-6 text-slate-900">3</td>
                <td className="py-4 px-6 text-slate-900">17</td>
                <td className="py-4 px-6 text-blue-700 bg-slate-50 font-black">20</td>
              </tr>
              <tr>
                <td className="py-4 px-6 font-black text-slate-800 text-left text-xl">Girls</td>
                <td className="py-4 px-6 text-slate-900">4</td>
                <td className="py-4 px-6 text-slate-900">
                  {missingValue ? (
                    <span className="w-12 h-10 border-2 border-dashed border-rose-400 bg-rose-50 text-rose-600 rounded-lg inline-flex items-center justify-center font-black">
                      ?
                    </span>
                  ) : (
                    '16'
                  )}
                </td>
                <td className="py-4 px-6 text-blue-700 bg-slate-50 font-black">20</td>
              </tr>
              <tr className="bg-slate-100 font-black text-slate-950">
                <td className="py-4 px-6 text-left text-xl">Total</td>
                <td className="py-4 px-6 text-blue-700">7</td>
                <td className="py-4 px-6 text-blue-700">{missingValue ? '?' : '33'}</td>
                <td className="py-4 px-6 text-3xl text-slate-950 bg-slate-200 font-black">40</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
