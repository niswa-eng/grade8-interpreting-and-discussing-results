import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const SamplingSimulation: React.FC = () => {
  // 100 population items (40% blue = walk, 60% gray = other)
  const population = Array.from({ length: 100 }, (_, i) => ({
    id: i,
    walks: i < 40,
    clubMember: i >= 80, // 20 club members
  }));

  const [sampleIndices, setSampleIndices] = useState<number[]>([4, 12, 23, 37, 45, 58, 62, 77, 85, 91]);
  const [sampleType, setSampleType] = useState<'random' | 'biased'>('random');

  const takeRandomSample = () => {
    const shuffled = [...Array(100).keys()].sort(() => Math.random() - 0.5);
    setSampleIndices(shuffled.slice(0, 10));
    setSampleType('random');
  };

  const takeBiasedSample = () => {
    // Only sampling club members
    const clubIndices = [80, 81, 82, 83, 84, 85, 86, 87, 88, 89];
    setSampleIndices(clubIndices);
    setSampleType('biased');
  };

  const sampledWalkers = sampleIndices.filter((idx) => population[idx].walks).length;

  return (
    <div className="w-full flex flex-col items-center gap-6 justify-center">
      <div className="bg-white/95 rounded-3xl p-8 shadow-sm border border-slate-200 w-full max-w-4xl">
        {/* Header stats */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 flex-wrap gap-4">
          <div className="text-xl font-black text-slate-900">
            Population: 100 students (40 walk, 60 other)
          </div>
          <div className="bg-blue-50 px-5 py-2.5 rounded-2xl border border-blue-200 text-lg font-bold">
            Sample of 10 students:{' '}
            <span className="text-2xl font-black text-blue-700 math-font">
              {sampledWalkers} walk ({sampledWalkers * 10}%)
            </span>
          </div>
        </div>

        {/* 10x10 Grid of 100 dots */}
        <div className="py-6 flex justify-center">
          <div className="grid grid-cols-10 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
            {population.map((dot) => {
              const isSelected = sampleIndices.includes(dot.id);
              return (
                <div
                  key={dot.id}
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs transition-all ${
                    isSelected
                      ? 'ring-4 ring-amber-400 scale-125 z-10 ' +
                        (dot.walks ? 'bg-blue-600 text-white' : 'bg-slate-700 text-white')
                      : dot.walks
                      ? 'bg-blue-200 text-blue-900 opacity-80'
                      : 'bg-slate-200 text-slate-700 opacity-60'
                  }`}
                >
                  {isSelected ? '✓' : ''}
                </div>
              );
            })}
          </div>
        </div>

        {/* Sampling Buttons */}
        <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={takeRandomSample}
            className="min-h-[56px] px-8 rounded-2xl font-black text-lg bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md active:scale-95"
          >
            <RefreshCw className="w-5 h-5" />
            <span>Take a random sample</span>
          </button>
          <button
            type="button"
            onClick={takeBiasedSample}
            className="min-h-[56px] px-6 rounded-2xl font-black text-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-300"
          >
            Show unfair sample
          </button>
        </div>
      </div>
    </div>
  );
};
