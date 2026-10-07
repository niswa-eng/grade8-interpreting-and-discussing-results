import React, { useState } from 'react';
import { StepItem, GridType } from '../types';
import { WorkingSpaceCanvas } from './whiteboard/WorkingSpaceCanvas';
import { BarChart } from './charts/BarChart';
import { FrequencyDiagram } from './charts/FrequencyDiagram';
import { TimeSeriesGraph } from './charts/TimeSeriesGraph';
import { StemAndLeaf } from './charts/StemAndLeaf';
import { PieChart } from './charts/PieChart';
import { ScatterGraph } from './charts/ScatterGraph';
import { DualBarChart } from './charts/DualBarChart';
import { CompoundBarChart } from './charts/CompoundBarChart';
import { VennDiagram } from './charts/VennDiagram';
import { CarrollDiagram } from './charts/CarrollDiagram';
import { TallyChart, TwoWayTable } from './charts/DataTable';
import {
  IntervalNumberLine,
  MeanLevellingVisual,
  InteractiveDataStrip,
} from './charts/NumberLine';
import { SamplingSimulation } from './charts/SamplingSimulation';
import { QuickRevisionPanel } from './charts/QuickRevisionPanel';
import {
  Sparkles,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  RefreshCw,
  HelpCircle,
  Eye,
} from 'lucide-react';

interface StepRendererProps {
  step: StepItem;
  accentColor: string;
}

export const StepRenderer: React.FC<StepRendererProps> = ({ step, accentColor }) => {
  const [gridType, setGridType] = useState<GridType>('graph');

  // --- PRACTICE SCREEN LAYOUT (Question ~40% / Working Space ~60%) ---
  if (step.type === 'practice') {
    return (
      <div className="w-full h-full flex flex-col lg:flex-row overflow-hidden">
        {/* Left 40%: Question & Data Visual */}
        <div className="w-full lg:w-[42%] p-8 border-b lg:border-b-0 lg:border-r-2 border-slate-200 bg-white/70 overflow-y-auto flex flex-col justify-between">
          <div>
            {/* Practice Level Indicator */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`px-4 py-1.5 rounded-xl text-base font-black uppercase tracking-wider ${
                  step.practiceLevel === 'basic'
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                    : step.practiceLevel === 'medium'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}
              >
                {step.practiceLevel === 'basic'
                  ? 'Level 1 · Basic'
                  : step.practiceLevel === 'medium'
                  ? 'Level 2 · Medium'
                  : 'Level 3 · Challenge'}
              </span>
              <span className="text-xl font-black text-slate-800 math-font">
                Question {step.questionNumber} of 9
              </span>
            </div>

            {/* Question Text (Large projection font) */}
            <div className="space-y-4 mb-8">
              {step.sentences?.map((s, idx) => (
                <p
                  key={idx}
                  className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight"
                >
                  {s}
                </p>
              ))}
            </div>

            {/* Question-Specific Data Visuals */}
            <div className="my-6">
              {renderPracticeVisual(step.componentKey)}
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200 text-slate-500 font-bold text-base">
            Cambridge Stage 8 · Unit 16
          </div>
        </div>

        {/* Right 60%: Large Dedicated Working Space for Whiteboard Handwriting */}
        <div className="w-full lg:w-[58%] h-full relative">
          <WorkingSpaceCanvas
            gridType={gridType}
            onChangeGridType={setGridType}
            showSelector={true}
          />
        </div>
      </div>
    );
  }

  // --- LESSON SCREEN LAYOUT ---
  return (
    <div className="w-full h-full p-8 md:p-12 overflow-y-auto flex flex-col justify-between">
      {/* Top Slide Header */}
      <div>
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">
            {step.title}
          </h2>
          {step.cambridgeCodes && step.cambridgeCodes.length > 0 && (
            <div className="text-base font-bold text-slate-600 bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200">
              Cambridge {step.cambridgeCodes.join(', ')}
            </div>
          )}
        </div>

        {/* Student-facing sentences (At most 2 short sentences) */}
        {step.sentences && step.sentences.length > 0 && (
          <div className="space-y-2 mb-6">
            {step.sentences.map((sentence, idx) => (
              <p
                key={idx}
                className="text-2xl md:text-3xl font-bold text-slate-800 leading-snug"
              >
                {sentence}
              </p>
            ))}
          </div>
        )}

        {/* Key terms display (Prominent 48px/large text) */}
        {step.keyTerms && step.keyTerms.length > 0 && (
          <div className="flex items-center gap-3 flex-wrap mb-8">
            {step.keyTerms.map((term, idx) => (
              <div
                key={idx}
                className="px-5 py-2.5 rounded-2xl bg-white shadow-sm border-2 border-slate-200 text-2xl md:text-3xl font-black text-slate-900"
              >
                {term}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Primary Interactive Visual Area */}
      <div className="my-auto py-4 flex items-center justify-center">
        {renderLessonVisual(step.componentKey, step, accentColor)}
      </div>

      {/* Sentence Frames if provided */}
      {step.sentenceFrames && (
        <div className="mt-6 p-6 rounded-3xl bg-amber-50/80 border-2 border-amber-200 max-w-4xl mx-auto w-full">
          <h4 className="text-xl font-black text-amber-950 mb-3">Sentence frames:</h4>
          <ul className="space-y-2">
            {step.sentenceFrames.map((frame, i) => (
              <li key={i} className="text-2xl font-bold text-amber-900">
                "{frame}"
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

// Practice visual renderer
function renderPracticeVisual(key: string) {
  switch (key) {
    case 'p_16_1_q1':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <BarChart
            data={[
              { label: 'Football', value: 8 },
              { label: 'Basketball', value: 6 },
              { label: 'Swimming', value: 4 },
              { label: 'Tennis', value: 2 },
            ]}
            title="Favourite Sport"
            xLabel="Sport"
            yLabel="Number of students"
            accentColor="#2563EB"
          />
        </div>
      );
    case 'p_16_1_q3':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <FrequencyDiagram
            initialClasses={[
              { min: 40, max: 50, frequency: 3, label: '40 < m ≤ 50' },
              { min: 50, max: 60, frequency: 8, label: '50 < m ≤ 60' },
              { min: 60, max: 70, frequency: 11, label: '60 < m ≤ 70' },
              { min: 70, max: 80, frequency: 6, label: '70 < m ≤ 80' },
              { min: 80, max: 90, frequency: 2, label: '80 < m ≤ 90' },
            ]}
            title="Masses of 30 students"
          />
        </div>
      );
    case 'p_16_2_q1':
    case 'p_16_2_q2':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <TimeSeriesGraph
            data={[
              { timeLabel: 'Mon', value: 24 },
              { timeLabel: 'Tue', value: 26 },
              { timeLabel: 'Wed', value: 25 },
              { timeLabel: 'Thu', value: 29 },
              { timeLabel: 'Fri', value: 31 },
              { timeLabel: 'Sat', value: 30 },
              { timeLabel: 'Sun', value: 27 },
            ]}
            title="Midday Temperature (°C)"
          />
        </div>
      );
    case 'p_16_2_q3':
    case 'p_16_2_q8':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <TimeSeriesGraph
            data={[
              { timeLabel: '2018', value: 40 },
              { timeLabel: '2019', value: 42 },
              { timeLabel: '2020', value: 45 },
              { timeLabel: '2021', value: 49 },
              { timeLabel: '2022', value: 54 },
            ]}
            title="Town Population (thousands)"
            yLabel="Population (thousands)"
            xLabel="Year"
            accentColor="#0D9488"
          />
        </div>
      );
    case 'p_16_2_q5':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <TimeSeriesGraph
            data={[
              { timeLabel: 'Jan', value: 120 },
              { timeLabel: 'Feb', value: 130 },
              { timeLabel: 'Mar', value: 160 },
              { timeLabel: 'Apr', value: 210 },
              { timeLabel: 'May', value: 280 },
              { timeLabel: 'Jun', value: 350 },
              { timeLabel: 'Jul', value: 400 },
              { timeLabel: 'Aug', value: 380 },
              { timeLabel: 'Sep', value: 290 },
              { timeLabel: 'Oct', value: 200 },
              { timeLabel: 'Nov', value: 140 },
              { timeLabel: 'Dec', value: 125 },
            ]}
            title="Ice Cream Sales"
            yLabel="Number Sold"
            xLabel="Month"
            accentColor="#0D9488"
          />
        </div>
      );
    case 'p_16_3_q1':
    case 'p_16_3_q2':
    case 'p_16_3_q3':
    case 'p_16_3_q9':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <StemAndLeaf
            initialData={[12, 15, 17, 20, 23, 23, 28, 31, 34]}
            keyExample={{ stem: 1, leaf: 2, valueStr: '12' }}
          />
        </div>
      );
    case 'p_16_3_q6':
      return (
        <div className="bg-rose-50 p-6 rounded-2xl border-2 border-rose-300">
          <div className="text-xl font-black text-rose-950 mb-2">Unordered Draft (No Key):</div>
          <div className="text-2xl font-black math-font text-slate-800">
            2 | 1 5 2<br />
            3 | 4 1 8 6
          </div>
        </div>
      );
    case 'p_16_4_q1':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <PieChart
            categories={[
              { label: 'Bus', count: 180, color: '#2563EB' },
              { label: 'Walk', count: 90, color: '#16A34A' },
              { label: 'Car', count: 90, color: '#EA580C' },
            ]}
            title="Travel to school (angles)"
            showTable={false}
            showProtractorOption={false}
          />
        </div>
      );
    case 'p_16_5_q3':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <VennDiagram />
        </div>
      );
    case 'p_16_5_q4':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <TwoWayTable missingValue={true} />
        </div>
      );
    case 'p_16_5_q5':
      return (
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <ScatterGraph
            initialPoints={[
              { x: 1, y: 18 },
              { x: 2, y: 15 },
              { x: 3, y: 13 },
              { x: 4, y: 10 },
              { x: 5, y: 8 },
              { x: 6, y: 6 },
            ]}
            title="Car Age vs Market Value"
            xLabel="Age (years)"
            yLabel="Value (£1000s)"
            correlationType="negative"
            xMax={7}
            yMin={0}
            yMax={22}
            allowDragPoint={false}
          />
        </div>
      );
    case 'p_16_6_q7':
      return (
        <div className="grid grid-cols-2 gap-4 text-center">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-200">
            <span className="text-xl font-black text-blue-900">Shop X:</span>
            <div className="text-2xl font-bold math-font mt-2">3, 4, 5, 6, 7</div>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-200">
            <span className="text-xl font-black text-orange-900">Shop Y:</span>
            <div className="text-2xl font-bold math-font mt-2">1, 3, 5, 7, 9</div>
          </div>
        </div>
      );
    default:
      return null;
  }
}

// Lesson visual renderer
const CorrelationInteractiveVisual: React.FC = () => {
  const [mode, setMode] = useState<'pos' | 'neg' | 'none'>('pos');

  return (
    <div className="flex flex-col gap-6 items-center w-full">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setMode('pos')}
          className={`min-h-[48px] px-6 rounded-2xl font-bold ${
            mode === 'pos'
              ? 'bg-blue-600 text-white shadow'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          Positive correlation
        </button>
        <button
          type="button"
          onClick={() => setMode('neg')}
          className={`min-h-[48px] px-6 rounded-2xl font-bold ${
            mode === 'neg'
              ? 'bg-rose-600 text-white shadow'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          Negative correlation
        </button>
        <button
          type="button"
          onClick={() => setMode('none')}
          className={`min-h-[48px] px-6 rounded-2xl font-bold ${
            mode === 'none'
              ? 'bg-purple-600 text-white shadow'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          No correlation
        </button>
      </div>
      {mode === 'neg' ? (
        <ScatterGraph
          initialPoints={[
            { x: 1, y: 18 },
            { x: 2, y: 15 },
            { x: 3, y: 13 },
            { x: 4, y: 10 },
            { x: 5, y: 8 },
            { x: 6, y: 6 },
          ]}
          title="Negative: Car Age vs Value"
          xLabel="Car Age (years)"
          yLabel="Value (£1000s)"
          correlationType="negative"
          yMin={0}
          yMax={22}
        />
      ) : mode === 'none' ? (
        <ScatterGraph
          initialPoints={[
            { x: 2, y: 70 },
            { x: 3, y: 45 },
            { x: 4, y: 82 },
            { x: 5, y: 55 },
            { x: 6, y: 75 },
            { x: 7, y: 40 },
          ]}
          title="No correlation: Shoe Size vs Test Score"
          xLabel="Shoe Size"
          yLabel="Score (%)"
          correlationType="none"
        />
      ) : (
        <ScatterGraph
          title="Positive: Study Hours vs Score"
          correlationType="positive"
        />
      )}
    </div>
  );
};

function renderLessonVisual(key: string, step: StepItem, accentColor: string) {
  switch (key) {
    // 16.1 visuals
    case 'objectives_16_1':
    case 'objectives_16_2':
    case 'objectives_16_3':
    case 'objectives_16_4':
    case 'objectives_16_5':
    case 'objectives_16_6':
      return (
        <div className="max-w-3xl w-full bg-white/95 rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center">
          <div className="w-20 h-20 bg-blue-100 text-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 stroke-[2.5]" />
          </div>
          <h3 className="text-3xl font-black text-slate-900 mb-4">{step.title}</h3>
          <div className="space-y-4 text-2xl font-bold text-slate-700 leading-relaxed">
            {step.sentences?.map((s, i) => (
              <p key={i}>{s}</p>
            ))}
          </div>
        </div>
      );

    case 'concept_frequency':
      return (
        <div className="bg-white/95 rounded-3xl p-10 border-2 border-slate-200 shadow-sm max-w-2xl text-center">
          <div className="text-4xl font-black text-blue-700 mb-4">Frequency</div>
          <div className="text-3xl font-extrabold text-slate-800">
            "How many times a value occurs"
          </div>
        </div>
      );

    case 'discrete_vs_continuous':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="bg-blue-50/90 rounded-3xl p-8 border-2 border-blue-200 text-center">
            <h4 className="text-3xl font-black text-blue-950 mb-3">Discrete Data</h4>
            <p className="text-2xl font-extrabold text-blue-800 mb-6">Counted</p>
            <ul className="text-xl font-bold text-blue-900 space-y-3">
              <li>• Number of siblings (0, 1, 2...)</li>
              <li>• Shoe size (5, 5.5, 6...)</li>
              <li>• Goals scored</li>
            </ul>
          </div>
          <div className="bg-emerald-50/90 rounded-3xl p-8 border-2 border-emerald-200 text-center">
            <h4 className="text-3xl font-black text-emerald-950 mb-3">Continuous Data</h4>
            <p className="text-2xl font-extrabold text-emerald-800 mb-6">Measured</p>
            <ul className="text-xl font-bold text-emerald-900 space-y-3">
              <li>• Mass of a person (kg)</li>
              <li>• Height of a student (cm)</li>
              <li>• Time to run 100 m (seconds)</li>
            </ul>
          </div>
        </div>
      );

    case 'discrete_bar_chart_builder':
      return (
        <BarChart
          data={step.data?.siblingsData}
          stepByStep={true}
          showRulesChecklist={true}
        />
      );

    case 'class_interval_number_line':
      return <IntervalNumberLine />;

    case 'histogram_builder':
      return (
        <FrequencyDiagram
          initialClasses={step.data?.massesData}
          stepByStep={true}
        />
      );

    case 'side_by_side_bar_vs_hist':
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl w-full">
          <div className="bg-white/95 rounded-3xl p-6 border-2 border-blue-300">
            <h4 className="text-2xl font-black text-blue-900 text-center mb-2">Discrete: Bar Chart</h4>
            <p className="text-lg font-bold text-slate-600 text-center mb-4">Gaps between bars</p>
            <BarChart
              data={[
                { label: '0', value: 4 },
                { label: '1', value: 9 },
                { label: '2', value: 7 },
              ]}
              title=""
              xLabel="Siblings"
              yLabel="Frequency"
            />
          </div>
          <div className="bg-white/95 rounded-3xl p-6 border-2 border-emerald-300">
            <h4 className="text-2xl font-black text-emerald-900 text-center mb-2">Continuous: Frequency Diagram</h4>
            <p className="text-lg font-bold text-slate-600 text-center mb-4">NO gaps between bars</p>
            <FrequencyDiagram
              initialClasses={[
                { min: 40, max: 50, frequency: 3, label: '40-50' },
                { min: 50, max: 60, frequency: 8, label: '50-60' },
                { min: 60, max: 70, frequency: 11, label: '60-70' },
              ]}
              title=""
              xLabel="Mass (kg)"
              yLabel="Frequency"
            />
          </div>
        </div>
      );

    case 'interactive_reading_histogram':
      return (
        <FrequencyDiagram
          isInteractive={true}
          highlightAbove={60}
        />
      );

    case 'mistakes_16_1':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="flex items-center gap-3 text-rose-700 text-2xl font-black mb-2">
              <AlertTriangle className="w-8 h-8" />
              <span>Mistake 1</span>
            </div>
            <p className="text-xl font-bold text-rose-950">
              Gaps left between bars in a continuous frequency diagram.
            </p>
          </div>
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="flex items-center gap-3 text-rose-700 text-2xl font-black mb-2">
              <AlertTriangle className="w-8 h-8" />
              <span>Mistake 2</span>
            </div>
            <p className="text-xl font-bold text-rose-950">
              Unequal class widths or uneven steps on the vertical scale.
            </p>
          </div>
        </div>
      );

    case 'vocabulary_16_1':
    case 'vocabulary_16_2':
    case 'vocabulary_16_3':
    case 'vocabulary_16_4':
    case 'vocabulary_16_5':
    case 'vocabulary_16_6':
      return (
        <div className="flex flex-wrap gap-4 justify-center max-w-4xl">
          {step.keyTerms?.map((term, i) => (
            <div
              key={i}
              className="px-6 py-4 rounded-2xl bg-white shadow-sm border-2 border-slate-200 text-2xl font-black text-slate-900"
            >
              {term}
            </div>
          ))}
        </div>
      );

    // 16.2 Time series visuals
    case 'concept_timeseries':
    case 'rules_timeseries':
    case 'worked_example_temp':
    case 'reading_timeseries':
      return (
        <TimeSeriesGraph
          data={[
            { timeLabel: 'Mon', value: 24 },
            { timeLabel: 'Tue', value: 26 },
            { timeLabel: 'Wed', value: 25 },
            { timeLabel: 'Thu', value: 29 },
            { timeLabel: 'Fri', value: 31 },
            { timeLabel: 'Sat', value: 30 },
            { timeLabel: 'Sun', value: 27 },
          ]}
        />
      );

    case 'trend_population':
      return (
        <TimeSeriesGraph
          data={[
            { timeLabel: '2018', value: 40 },
            { timeLabel: '2019', value: 42 },
            { timeLabel: '2020', value: 45 },
            { timeLabel: '2021', value: 49 },
            { timeLabel: '2022', value: 54 },
          ]}
          title="Town Population (thousands)"
          yLabel="Population (thousands)"
          xLabel="Year"
          showTrendArrow={true}
        />
      );

    case 'seasonal_icecream':
      return (
        <TimeSeriesGraph
          data={[
            { timeLabel: 'Jan', value: 120 },
            { timeLabel: 'Feb', value: 130 },
            { timeLabel: 'Mar', value: 160 },
            { timeLabel: 'Apr', value: 210 },
            { timeLabel: 'May', value: 280 },
            { timeLabel: 'Jun', value: 350 },
            { timeLabel: 'Jul', value: 400 },
            { timeLabel: 'Aug', value: 380 },
            { timeLabel: 'Sep', value: 290 },
            { timeLabel: 'Oct', value: 200 },
            { timeLabel: 'Nov', value: 140 },
            { timeLabel: 'Dec', value: 125 },
          ]}
          title="Ice Cream Sales"
          yLabel="Number Sold"
          xLabel="Month"
        />
      );

    case 'timeseries_vs_linegraph':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="bg-teal-50 p-8 rounded-3xl border-2 border-teal-200">
            <h4 className="text-3xl font-black text-teal-950 mb-3">Time Series Graph</h4>
            <p className="text-xl font-bold text-teal-900 leading-relaxed">
              Always has TIME along the horizontal axis (days, months, years).
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border-2 border-slate-300">
            <h4 className="text-3xl font-black text-slate-900 mb-3">General Line Graph</h4>
            <p className="text-xl font-bold text-slate-800 leading-relaxed">
              Can show ANY two continuous quantities (e.g. distance against speed, cost against volume).
            </p>
          </div>
        </div>
      );

    case 'mistakes_16_2':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 1</div>
            <p className="text-xl font-bold text-rose-950">
              Placing time on the vertical axis instead of the horizontal axis.
            </p>
          </div>
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 2</div>
            <p className="text-xl font-bold text-rose-950">
              Joining points out of order or using uneven time intervals.
            </p>
          </div>
        </div>
      );

    // 16.3 Stem-and-leaf visuals
    case 'concept_stem_leaf':
    case 'anatomy_stem_leaf':
    case 'stem_builder_step_by_step':
    case 'interactive_reading_stem':
      return <StemAndLeaf isInteractiveAddRemove={true} />;

    case 'stem_mode_demo':
      return <StemAndLeaf highlightMode={true} />;

    case 'stem_range_demo':
      return <StemAndLeaf highlightRange={true} />;

    case 'median_odd_demo':
      return (
        <StemAndLeaf
          initialData={[12, 15, 17, 20, 23, 23, 28, 31, 34]}
          keyExample={{ stem: 1, leaf: 2, valueStr: '12' }}
          highlightMedian={true}
        />
      );

    case 'median_even_demo':
      return (
        <StemAndLeaf
          highlightMedian={true}
        />
      );

    case 'decimal_3digit_keys':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="bg-amber-50 p-8 rounded-3xl border-2 border-amber-200 text-center">
            <h4 className="text-2xl font-black text-amber-950 mb-4">Decimal Key</h4>
            <div className="text-3xl font-black math-font text-amber-900 mb-2">
              Key: 2 | 4 means 2.4 seconds
            </div>
            <p className="text-lg font-bold text-amber-800">
              Stem = whole number (units), Leaf = tenths
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200 text-center">
            <h4 className="text-2xl font-black text-blue-950 mb-4">Three-Digit Key</h4>
            <div className="text-3xl font-black math-font text-blue-900 mb-2">
              Key: 10 | 9 means 109
            </div>
            <p className="text-lg font-bold text-blue-800">
              Stem = hundreds and tens, Leaf = units
            </p>
          </div>
        </div>
      );

    case 'mistakes_16_3':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 1</div>
            <p className="text-xl font-bold text-rose-950">
              Leaving leaves unordered from smallest to largest or omitting the key.
            </p>
          </div>
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 2</div>
            <p className="text-xl font-bold text-rose-950">
              Leaving out repeated numbers or drawing leaves with uneven spacing.
            </p>
          </div>
        </div>
      );

    // 16.4 Pie chart visuals
    case 'concept_pie_chart':
    case 'fractions_of_circle':
    case 'pie_table_angles':
    case 'protractor_interactive':
    case 'frequency_from_angle':
      return <PieChart />;

    case 'school_a_vs_school_b':
      return (
        <PieChart
          comparisonMode={true}
          comparisonData={step.data as any}
        />
      );

    case 'mistakes_16_4':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 1</div>
            <p className="text-xl font-bold text-rose-950">
              Angles do not sum to 360°.
            </p>
          </div>
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 2</div>
            <p className="text-xl font-bold text-rose-950">
              Assuming a larger sector always represents more people when totals differ.
            </p>
          </div>
        </div>
      );

    // 16.5 Representing data visuals
    case 'choosing_representation':
      return <QuickRevisionPanel />;

    case 'tally_chart_step':
      return <TallyChart />;

    case 'venn_diagram_step':
      return <VennDiagram />;

    case 'carroll_diagram_step':
      return <CarrollDiagram />;

    case 'twoway_table_step':
      return <TwoWayTable />;

    case 'dual_vs_compound_step':
      return (
        <div className="flex flex-col gap-8 w-full max-w-5xl">
          <DualBarChart />
          <CompoundBarChart />
        </div>
      );

    case 'quick_revision_step':
      return <QuickRevisionPanel />;

    case 'scatter_graph_step':
      return <ScatterGraph />;

    case 'correlation_interactive_step':
      return <CorrelationInteractiveVisual />;

    case 'sampling_simulation_step':
      return <SamplingSimulation />;

    case 'prediction_checking_step':
      return (
        <ScatterGraph
          initialPoints={[
            { x: 140, y: 138 },
            { x: 150, y: 148 },
            { x: 155, y: 156 },
            { x: 162, y: 160 },
            { x: 170, y: 172 },
            { x: 175, y: 174 },
          ]}
          title="Height vs Arm Span (cm)"
          xLabel="Height (cm)"
          yLabel="Arm Span (cm)"
          xMin={130}
          xMax={185}
          yMin={130}
          yMax={185}
          correlationType="positive"
        />
      );

    case 'sentence_frames_step':
      return (
        <div className="bg-white/95 rounded-3xl p-8 border-2 border-slate-200 max-w-3xl w-full shadow-sm text-center">
          <h4 className="text-3xl font-black text-slate-900 mb-6">Communicating Findings</h4>
          <p className="text-2xl font-bold text-slate-700 leading-relaxed">
            Link the trend and correlation directly to the practical question.
          </p>
        </div>
      );

    // 16.6 Using statistics visuals
    case 'concept_why_stats':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full">
          <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200 text-center">
            <h4 className="text-3xl font-black text-blue-950 mb-3">One Average</h4>
            <p className="text-xl font-bold text-blue-900">
              Summarises the central, typical value (Mean or Median).
            </p>
          </div>
          <div className="bg-purple-50 p-8 rounded-3xl border-2 border-purple-200 text-center">
            <h4 className="text-3xl font-black text-purple-950 mb-3">One Measure of Spread</h4>
            <p className="text-xl font-bold text-purple-900">
              Shows consistency and how spread out values are (Range).
            </p>
          </div>
        </div>
      );

    case 'mean_levelling_step':
      return <MeanLevellingVisual />;

    case 'median_step':
      return (
        <div className="bg-white/95 p-8 rounded-3xl border-2 border-slate-200 max-w-2xl text-center shadow-sm">
          <div className="text-2xl font-bold text-slate-700 mb-4">Values: 3, 4, 6, 8, 9, 12</div>
          <div className="text-xl font-bold text-slate-600 mb-4">Two middle values: 6 and 8</div>
          <div className="text-3xl font-black text-emerald-700 math-font">
            Median = (6 + 8) ÷ 2 = 7
          </div>
        </div>
      );

    case 'mode_cases_step':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-center">
          <div className="bg-amber-50 p-6 rounded-3xl border-2 border-amber-200">
            <h4 className="text-2xl font-black text-amber-950 mb-2">One Mode</h4>
            <div className="text-xl font-bold math-font text-slate-800 mb-2">3, 5, 5, 7, 10</div>
            <div className="text-2xl font-black text-amber-700">Mode = 5</div>
          </div>
          <div className="bg-purple-50 p-6 rounded-3xl border-2 border-purple-200">
            <h4 className="text-2xl font-black text-purple-950 mb-2">Two Modes</h4>
            <div className="text-xl font-bold math-font text-slate-800 mb-2">2, 3, 3, 5, 5, 8</div>
            <div className="text-2xl font-black text-purple-700">Modes = 3 and 5</div>
          </div>
          <div className="bg-slate-50 p-6 rounded-3xl border-2 border-slate-300">
            <h4 className="text-2xl font-black text-slate-900 mb-2">No Mode</h4>
            <div className="text-xl font-bold math-font text-slate-800 mb-2">1, 2, 3, 4</div>
            <div className="text-2xl font-black text-slate-600">No mode</div>
          </div>
        </div>
      );

    case 'range_spread_step':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full text-center">
          <div className="bg-emerald-50 p-8 rounded-3xl border-2 border-emerald-200">
            <h4 className="text-2xl font-black text-emerald-950 mb-2">Small Range</h4>
            <p className="text-2xl font-bold text-emerald-800 mb-4">Values closely grouped</p>
            <div className="text-xl font-bold text-emerald-900">More consistent</div>
          </div>
          <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-200">
            <h4 className="text-2xl font-black text-orange-950 mb-2">Large Range</h4>
            <p className="text-2xl font-bold text-orange-800 mb-4">Values widely spread</p>
            <div className="text-xl font-bold text-orange-900">Less consistent (more varied)</div>
          </div>
        </div>
      );

    case 'interactive_stats_strip_step':
      return <InteractiveDataStrip />;

    case 'outlier_effect_step':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl w-full text-center">
          <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200">
            <h4 className="text-2xl font-black text-blue-950 mb-2">Without Outlier</h4>
            <div className="text-xl font-bold math-font text-slate-800 mb-4">5, 6, 6, 7, 6</div>
            <div className="text-xl font-bold text-blue-900 space-y-1">
              <div>Mean = 6</div>
              <div>Median = 6</div>
              <div>Mode = 6</div>
            </div>
          </div>
          <div className="bg-rose-50 p-8 rounded-3xl border-2 border-rose-200">
            <h4 className="text-2xl font-black text-rose-950 mb-2">With Outlier (36)</h4>
            <div className="text-xl font-bold math-font text-slate-800 mb-4">5, 6, 6, 7, 6, 36</div>
            <div className="text-xl font-bold text-rose-900 space-y-1">
              <div className="text-2xl font-black text-rose-700">Mean = 11 (changed)</div>
              <div>Median = 6 (unchanged)</div>
              <div>Mode = 6 (unchanged)</div>
            </div>
          </div>
        </div>
      );

    case 'comparing_teams_step':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full text-center">
          <div className="bg-blue-50 p-8 rounded-3xl border-2 border-blue-200">
            <h4 className="text-3xl font-black text-blue-950 mb-3">Team A</h4>
            <div className="text-2xl font-bold math-font text-slate-800 mb-4">4, 6, 7, 7, 8, 10</div>
            <div className="text-xl font-bold text-blue-900 space-y-2">
              <div>Mean: 7  ·  Median: 7  ·  Mode: 7</div>
              <div className="text-2xl font-black text-blue-800">Range: 10 − 4 = 6</div>
              <div className="text-emerald-700 font-extrabold mt-2">More consistent</div>
            </div>
          </div>
          <div className="bg-orange-50 p-8 rounded-3xl border-2 border-orange-200">
            <h4 className="text-3xl font-black text-orange-950 mb-3">Team B</h4>
            <div className="text-2xl font-bold math-font text-slate-800 mb-4">1, 3, 7, 8, 9, 14</div>
            <div className="text-xl font-bold text-orange-900 space-y-2">
              <div>Mean: 7  ·  Median: 7.5  ·  Mode: None</div>
              <div className="text-2xl font-black text-orange-800">Range: 14 − 1 = 13</div>
              <div className="text-slate-600 font-extrabold mt-2">Less consistent</div>
            </div>
          </div>
        </div>
      );

    case 'choosing_average_step':
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full text-center">
          <div className="bg-white p-6 rounded-3xl border-2 border-blue-200 shadow-sm">
            <h4 className="text-2xl font-black text-blue-900 mb-2">Mean</h4>
            <p className="text-lg font-bold text-slate-700 leading-relaxed">
              Uses all data values. Best when data has no extreme outliers.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-sm">
            <h4 className="text-2xl font-black text-emerald-900 mb-2">Median</h4>
            <p className="text-lg font-bold text-slate-700 leading-relaxed">
              Resists extreme values and skewed data. Shows the middle value.
            </p>
          </div>
          <div className="bg-white p-6 rounded-3xl border-2 border-purple-200 shadow-sm">
            <h4 className="text-2xl font-black text-purple-900 mb-2">Mode</h4>
            <p className="text-lg font-bold text-slate-700 leading-relaxed">
              Best for categorical data or finding the most common choice.
            </p>
          </div>
        </div>
      );

    case 'mistakes_16_6':
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 1</div>
            <p className="text-xl font-bold text-rose-950">
              Finding the median without ordering the data from smallest to largest first.
            </p>
          </div>
          <div className="bg-rose-50 p-6 rounded-3xl border-2 border-rose-200">
            <div className="text-2xl font-black text-rose-800 mb-2">Mistake 2</div>
            <p className="text-xl font-bold text-rose-950">
              Writing the range as two numbers (e.g. "3 to 10") instead of calculating a single difference (7).
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
}
