import React, { useState, useEffect, useCallback } from 'react';
import { SubtopicId, DrawingTool } from './types';
import { allSubtopics, subtopicList } from './data';
import { StepRenderer } from './components/StepRenderer';
import { WhiteboardCanvas } from './components/whiteboard/WhiteboardCanvas';
import { WhiteboardToolbar } from './components/whiteboard/WhiteboardToolbar';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  HelpCircle,
  X,
  Gauge,
  Sparkles,
  Pencil,
  Hand,
} from 'lucide-react';

export default function App() {
  const [activeSubtopicId, setActiveSubtopicId] = useState<SubtopicId>('16.1');
  // Remember last visited step per subtopic
  const [subtopicSteps, setSubtopicSteps] = useState<Record<SubtopicId, number>>({
    '16.1': 0,
    '16.2': 0,
    '16.3': 0,
    '16.4': 0,
    '16.5': 0,
    '16.6': 0,
  });

  // Whiteboard State
  const [isDrawMode, setIsDrawMode] = useState(false);
  const [activeTool, setActiveTool] = useState<DrawingTool>('pen');
  const [activeColor, setActiveColor] = useState('#0F172A');
  const [activeWidth, setActiveWidth] = useState(7);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [clearTrigger, setClearTrigger] = useState(0);
  const [undoTrigger, setUndoTrigger] = useState(0);
  const [redoTrigger, setRedoTrigger] = useState(0);

  // Interface State
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [motionSpeed, setMotionSpeed] = useState<'normal' | 'slow' | 'off'>('normal');

  const currentSubtopic = allSubtopics[activeSubtopicId];
  const currentStepIndex = subtopicSteps[activeSubtopicId] || 0;
  const currentStep = currentSubtopic.steps[currentStepIndex] || currentSubtopic.steps[0];
  const totalSteps = currentSubtopic.steps.length;

  const currentScreenKey = `${activeSubtopicId}_step_${currentStepIndex}`;

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  }, []);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Step Navigation
  const goToStep = (index: number) => {
    const clamped = Math.max(0, Math.min(totalSteps - 1, index));
    setSubtopicSteps((prev) => ({
      ...prev,
      [activeSubtopicId]: clamped,
    }));
  };

  const nextStep = () => {
    if (currentStepIndex < totalSteps - 1) {
      goToStep(currentStepIndex + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      goToStep(currentStepIndex - 1);
    }
  };

  // Keyboard navigation for teachers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        nextStep();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        prevStep();
      } else if (e.key === 'd' || e.key === 'D') {
        setIsDrawMode((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, totalSteps, nextStep, prevStep, toggleFullscreen]);

  return (
    <div
      className={`relative w-screen h-screen flex flex-col overflow-hidden bg-[#FAF7F2] text-[#0F172A] select-none ${
        motionSpeed === 'off' ? 'motion-reduce' : ''
      }`}
    >
      {/* ================= TOP NAVIGATION BAR ================= */}
      <header className="h-20 min-h-[80px] bg-white border-b-2 border-slate-200 px-6 flex items-center justify-between z-20 shadow-sm gap-4">
        {/* Left: App Title and Subtopic Selector Dropdown */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tight text-slate-900 hidden md:inline">
              Handling Data
            </span>
          </div>

          {/* Large Subtopic Dropdown (At least 64px height touch friendly) */}
          <div className="relative">
            <select
              value={activeSubtopicId}
              onChange={(e) => setActiveSubtopicId(e.target.value as SubtopicId)}
              aria-label="Select Unit 16 Subtopic"
              className="min-h-[58px] px-4 py-2 pr-10 rounded-2xl bg-slate-50 border-2 border-slate-300 font-extrabold text-xl text-slate-900 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/20 cursor-pointer appearance-none"
            >
              {subtopicList.map((sub) => (
                <option key={sub.id} value={sub.id} className="text-lg font-bold py-2">
                  {sub.title}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-700 font-black">
              ▼
            </div>
          </div>
        </div>

        {/* Center: Current Step Title */}
        <div className="hidden xl:flex items-center gap-3">
          <span
            className="w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: currentSubtopic.accentColor }}
          />
          <h1 className="text-2xl font-black text-slate-800 truncate max-w-md">
            {currentStep.title}
          </h1>
        </div>

        {/* Right Actions: Mode Indicator, Motion, Help, Fullscreen */}
        <div className="flex items-center gap-3">
          {/* Quick Draw / Interact Mode Indicator */}
          <button
            type="button"
            onClick={() => setIsDrawMode(!isDrawMode)}
            className={`min-h-[54px] px-4 rounded-2xl font-extrabold text-base flex items-center gap-2 transition-all ${
              isDrawMode
                ? 'bg-amber-400 text-slate-950 shadow-md ring-2 ring-amber-500'
                : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
            }`}
          >
            {isDrawMode ? (
              <>
                <Pencil className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">Draw Mode</span>
              </>
            ) : (
              <>
                <Hand className="w-5 h-5 stroke-[2.5]" />
                <span className="hidden sm:inline">Interact Mode</span>
              </>
            )}
          </button>

          {/* Motion Speed Toggle */}
          <button
            type="button"
            onClick={() => {
              const speeds: ('normal' | 'slow' | 'off')[] = ['normal', 'slow', 'off'];
              const next = speeds[(speeds.indexOf(motionSpeed) + 1) % speeds.length];
              setMotionSpeed(next);
            }}
            title={`Animation: ${motionSpeed}`}
            className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm"
          >
            <Gauge className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Help Button */}
          <button
            type="button"
            onClick={() => setShowHelp(true)}
            aria-label="Whiteboard Help"
            className="w-14 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <HelpCircle className="w-6 h-6 stroke-[2.2]" />
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label="Toggle Fullscreen"
            className="w-14 h-14 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors shadow-sm"
          >
            {isFullscreen ? (
              <Minimize2 className="w-6 h-6 stroke-[2.2]" />
            ) : (
              <Maximize2 className="w-6 h-6 stroke-[2.2]" />
            )}
          </button>
        </div>
      </header>

      {/* ================= MAIN LESSON & WHITEBOARD STAGE ================= */}
      <main className="relative flex-1 w-full h-[calc(100vh-160px)] overflow-hidden">
        {/* Underneath: Lesson Content and Interactive SVG Visuals */}
        <div className="absolute inset-0 w-full h-full z-10">
          <StepRenderer step={currentStep} accentColor={currentSubtopic.accentColor} />
        </div>

        {/* Above: Full-Stage Whiteboard Ink Layer */}
        <WhiteboardCanvas
          isDrawMode={isDrawMode}
          activeTool={activeTool}
          activeColor={activeColor}
          activeWidth={activeWidth}
          screenKey={currentScreenKey}
          onCanUndoChange={setCanUndo}
          onCanRedoChange={setCanRedo}
          clearTrigger={clearTrigger}
          undoTrigger={undoTrigger}
          redoTrigger={redoTrigger}
        />

        {/* Floating Whiteboard Toolbar */}
        <WhiteboardToolbar
          isDrawMode={isDrawMode}
          onToggleDrawMode={() => setIsDrawMode(!isDrawMode)}
          activeTool={activeTool}
          onSelectTool={setActiveTool}
          activeColor={activeColor}
          onSelectColor={setActiveColor}
          activeWidth={activeWidth}
          onSelectWidth={setActiveWidth}
          canUndo={canUndo}
          canRedo={canRedo}
          onUndo={() => setUndoTrigger((c) => c + 1)}
          onRedo={() => setRedoTrigger((c) => c + 1)}
          onClear={() => setClearTrigger((c) => c + 1)}
        />
      </main>

      {/* ================= BOTTOM BAR (PROGRESS & NAVIGATION) ================= */}
      <footer className="h-20 min-h-[80px] bg-white border-t-2 border-slate-200 px-6 flex items-center justify-between z-20 shadow-sm gap-4">
        {/* Big Back Button (At least 64px touch target) */}
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStepIndex === 0}
          aria-label="Previous step"
          className="min-h-[64px] min-w-[130px] px-6 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-30 disabled:pointer-events-none active:scale-95"
        >
          <ChevronLeft className="w-7 h-7 stroke-[3]" />
          <span>Back</span>
        </button>

        {/* Center: Tappable Progress Strip & Step Counter */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl mx-auto justify-center">
          {/* Step Counter */}
          <div className="text-xl font-black text-slate-900 math-font whitespace-nowrap min-w-[70px] text-center">
            {currentStepIndex + 1} / {totalSteps}
          </div>

          {/* Tappable Step Indicators */}
          <div className="flex items-center gap-1.5 flex-1 overflow-x-auto py-2">
            {currentSubtopic.steps.map((st, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPractice = st.type === 'practice';

              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => goToStep(idx)}
                  title={`${idx + 1}. ${st.title}`}
                  className={`h-4.5 rounded-full transition-all flex-1 min-w-[12px] ${
                    isCurrent
                      ? 'scale-y-125 shadow-sm'
                      : 'hover:opacity-100 opacity-60'
                  }`}
                  style={{
                    backgroundColor: isCurrent
                      ? currentSubtopic.accentColor
                      : isPractice
                      ? '#CBD5E1'
                      : '#94A3B8',
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Big Next Button (At least 64px touch target) */}
        <button
          type="button"
          onClick={nextStep}
          disabled={currentStepIndex === totalSteps - 1}
          aria-label="Next step"
          className="min-h-[64px] min-w-[130px] px-7 rounded-2xl font-black text-xl flex items-center justify-center gap-2 transition-all text-white shadow-md hover:brightness-105 active:scale-95 disabled:opacity-30 disabled:pointer-events-none"
          style={{ backgroundColor: currentSubtopic.accentColor }}
        >
          <span>Next</span>
          <ChevronRight className="w-7 h-7 stroke-[3]" />
        </button>
      </footer>

      {/* ================= HELP MODAL (ONLY PLACE USAGE INSTRUCTIONS APPEAR) ================= */}
      {showHelp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                <HelpCircle className="w-7 h-7 text-blue-600" />
                <span>Whiteboard Controls</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-5 text-slate-700 text-lg font-medium leading-relaxed">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                  <Hand className="w-6 h-6" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-extrabold">Interact Mode</strong>
                  Canvas passes taps through to interactive diagrams, buttons, and sliders.
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0">
                  <Pencil className="w-6 h-6" />
                </div>
                <div>
                  <strong className="block text-slate-900 font-extrabold">Draw Mode</strong>
                  Handwrite or sketch anywhere on the slide. Palm rejection ignores stray touches.
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-base">
                <div className="font-bold text-slate-900 mb-1">Keyboard Shortcuts:</div>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div><kbd className="px-2 py-1 bg-white rounded border">D</kbd> Toggle Draw/Interact</div>
                  <div><kbd className="px-2 py-1 bg-white rounded border">→</kbd> Next Step</div>
                  <div><kbd className="px-2 py-1 bg-white rounded border">←</kbd> Previous Step</div>
                  <div><kbd className="px-2 py-1 bg-white rounded border">F</kbd> Fullscreen</div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowHelp(false)}
              className="mt-6 w-full min-h-[52px] rounded-2xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
