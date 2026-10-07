import React from 'react';
import { BarChart3, TrendingUp, PieChart as PieIcon, ListTree, Share2, Sparkles } from 'lucide-react';

export const QuickRevisionPanel: React.FC = () => {
  const displays = [
    {
      name: 'Frequency diagram',
      purpose: 'Continuous data grouped into equal classes with no gaps.',
      icon: BarChart3,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    {
      name: 'Time series graph',
      purpose: 'Shows how data changes over regular intervals of time.',
      icon: TrendingUp,
      color: 'bg-teal-50 text-teal-700 border-teal-200',
    },
    {
      name: 'Pie chart',
      purpose: 'Compares proportions or fractions of a whole (360° total).',
      icon: PieIcon,
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    {
      name: 'Stem-and-leaf diagram',
      purpose: 'Orders data while preserving every original value and shows the shape.',
      icon: ListTree,
      color: 'bg-orange-50 text-orange-700 border-orange-200',
    },
    {
      name: 'Scatter graph',
      purpose: 'Investigates relationships and correlation between two variables.',
      icon: Share2,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      name: 'Infographic',
      purpose: 'Combines key numbers, icons, and charts for an immediate visual summary.',
      icon: Sparkles,
      color: 'bg-pink-50 text-pink-700 border-pink-200',
    },
  ];

  return (
    <div className="w-full flex justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {displays.map((disp) => {
          const Icon = disp.icon;
          return (
            <div
              key={disp.name}
              className={`p-6 rounded-3xl border-2 ${disp.color} bg-white/95 flex flex-col gap-3 shadow-sm`}
            >
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-white shadow-sm border border-slate-200">
                  <Icon className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-black text-slate-900">{disp.name}</h4>
              </div>
              <p className="text-xl font-bold text-slate-700 leading-relaxed mt-1">
                {disp.purpose}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
