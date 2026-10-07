import React, { useState, useEffect } from 'react';
import {
  Pencil,
  Hand,
  Highlighter,
  Eraser,
  Minus,
  Square,
  Circle as CircleIcon,
  Ruler,
  Undo2,
  Redo2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Move,
} from 'lucide-react';
import { DrawingTool, ToolbarDock } from '../../types';

interface WhiteboardToolbarProps {
  isDrawMode: boolean;
  onToggleDrawMode: () => void;
  activeTool: DrawingTool;
  onSelectTool: (tool: DrawingTool) => void;
  activeColor: string;
  onSelectColor: (color: string) => void;
  activeWidth: number;
  onSelectWidth: (width: number) => void;
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onClear: () => void;
}

const COLORS = [
  { hex: '#0F172A', label: 'Navy' },
  { hex: '#2563EB', label: 'Blue' },
  { hex: '#DC2626', label: 'Red' },
  { hex: '#16A34A', label: 'Green' },
  { hex: '#EA580C', label: 'Orange' },
  { hex: '#9333EA', label: 'Purple' },
];

const STROKE_WIDTHS = [
  { width: 3, label: 'Fine' },
  { width: 7, label: 'Medium' },
  { width: 14, label: 'Bold' },
];

export const WhiteboardToolbar: React.FC<WhiteboardToolbarProps> = ({
  isDrawMode,
  onToggleDrawMode,
  activeTool,
  onSelectTool,
  activeColor,
  onSelectColor,
  activeWidth,
  onSelectWidth,
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onClear,
}) => {
  const [dock, setDock] = useState<ToolbarDock>('left');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  useEffect(() => {
    try {
      const savedDock = localStorage.getItem('handling_data_toolbar_dock');
      if (savedDock === 'left' || savedDock === 'right' || savedDock === 'bottom') {
        setDock(savedDock);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const changeDock = (newDock: ToolbarDock) => {
    setDock(newDock);
    try {
      localStorage.setItem('handling_data_toolbar_dock', newDock);
    } catch (e) {
      // ignore
    }
  };

  const getPositionClasses = () => {
    if (dock === 'left') {
      return 'left-4 top-1/2 -translate-y-1/2 flex-col';
    }
    if (dock === 'right') {
      return 'right-4 top-1/2 -translate-y-1/2 flex-col';
    }
    return 'bottom-20 left-1/2 -translate-x-1/2 flex-row';
  };

  return (
    <>
      {/* Floating Toolbar Container */}
      <div
        className={`fixed z-40 flex items-center transition-all duration-200 select-none ${getPositionClasses()}`}
        style={{ pointerEvents: 'auto' }}
      >
        {/* Collapsed State Toggle Button */}
        {isCollapsed ? (
          <button
            type="button"
            onClick={() => setIsCollapsed(false)}
            aria-label="Expand Whiteboard Toolbar"
            className="w-16 h-16 rounded-2xl bg-slate-900 text-white shadow-xl flex items-center justify-center border-2 border-white/20 active:scale-95 transition-transform"
          >
            {isDrawMode ? <Pencil className="w-8 h-8 text-amber-300" /> : <Hand className="w-8 h-8 text-white" />}
          </button>
        ) : (
          <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border-2 border-slate-200 p-3 flex gap-2.5 items-center flex-wrap max-w-[90vw]">
            {/* Primary Mode Toggle: Draw vs Interact (At least 64px touch target) */}
            <button
              type="button"
              onClick={onToggleDrawMode}
              aria-label={isDrawMode ? 'Switch to Interact Mode' : 'Switch to Draw Mode'}
              className={`min-w-[72px] min-h-[64px] px-4 py-2.5 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-sm ${
                isDrawMode
                  ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-300/60'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isDrawMode ? (
                <>
                  <Pencil className="w-6 h-6 stroke-[2.5]" />
                  <span className="text-base font-extrabold uppercase tracking-wider">Draw</span>
                </>
              ) : (
                <>
                  <Hand className="w-6 h-6 stroke-[2.5]" />
                  <span className="text-base font-extrabold uppercase tracking-wider">Interact</span>
                </>
              )}
            </button>

            {/* In Draw Mode: Full Toolset */}
            {isDrawMode && (
              <>
                <div className="w-[1.5px] h-10 bg-slate-200 my-auto hidden sm:block" />

                {/* Drawing Tools */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {[
                    { tool: 'pen' as DrawingTool, icon: Pencil, label: 'Pen' },
                    { tool: 'highlighter' as DrawingTool, icon: Highlighter, label: 'Highlighter' },
                    { tool: 'ruler' as DrawingTool, icon: Ruler, label: 'Ruler Line' },
                    { tool: 'line' as DrawingTool, icon: Minus, label: 'Line' },
                    { tool: 'rect' as DrawingTool, icon: Square, label: 'Rectangle' },
                    { tool: 'circle' as DrawingTool, icon: CircleIcon, label: 'Circle' },
                    { tool: 'eraser' as DrawingTool, icon: Eraser, label: 'Eraser' },
                  ].map((item) => {
                    const IconComponent = item.icon;
                    const isActive = activeTool === item.tool;
                    return (
                      <button
                        key={item.tool}
                        type="button"
                        onClick={() => onSelectTool(item.tool)}
                        title={item.label}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                          isActive
                            ? 'bg-slate-900 text-white shadow-md scale-105'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                        }`}
                      >
                        <IconComponent className="w-6 h-6 stroke-[2.2]" />
                      </button>
                    );
                  })}
                </div>

                <div className="w-[1.5px] h-10 bg-slate-200 my-auto hidden sm:block" />

                {/* Color Palette (6 Cambridge Accessible Colours) */}
                <div className="flex items-center gap-1.5">
                  {COLORS.map((col) => {
                    const isSelected = activeColor === col.hex;
                    return (
                      <button
                        key={col.hex}
                        type="button"
                        onClick={() => onSelectColor(col.hex)}
                        title={col.label}
                        className={`w-11 h-11 rounded-full transition-transform flex items-center justify-center ${
                          isSelected ? 'scale-115 ring-3 ring-slate-900 ring-offset-2' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: col.hex }}
                      />
                    );
                  })}
                </div>

                <div className="w-[1.5px] h-10 bg-slate-200 my-auto hidden sm:block" />

                {/* Thickness */}
                <div className="flex items-center gap-1.5">
                  {STROKE_WIDTHS.map((sw) => {
                    const isSelected = activeWidth === sw.width;
                    return (
                      <button
                        key={sw.width}
                        type="button"
                        onClick={() => onSelectWidth(sw.width)}
                        title={`${sw.label} stroke`}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                          isSelected ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        <div
                          className="rounded-full bg-current"
                          style={{ width: sw.width + 3, height: sw.width + 3 }}
                        />
                      </button>
                    );
                  })}
                </div>

                <div className="w-[1.5px] h-10 bg-slate-200 my-auto hidden sm:block" />

                {/* History Actions: Undo, Redo, Clear */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={onUndo}
                    disabled={!canUndo}
                    title="Undo"
                    className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <Undo2 className="w-5 h-5 stroke-[2.2]" />
                  </button>
                  <button
                    type="button"
                    onClick={onRedo}
                    disabled={!canRedo}
                    title="Redo"
                    className="w-12 h-12 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center justify-center disabled:opacity-30 disabled:pointer-events-none transition-all"
                  >
                    <Redo2 className="w-5 h-5 stroke-[2.2]" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowClearConfirm(true)}
                    title="Clear Board"
                    className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-all"
                  >
                    <Trash2 className="w-5 h-5 stroke-[2.2]" />
                  </button>
                </div>
              </>
            )}

            {/* Dock Position & Collapse Control */}
            <div className="flex items-center gap-1 ml-auto">
              <button
                type="button"
                onClick={() => {
                  const nextDock: Record<ToolbarDock, ToolbarDock> = {
                    left: 'bottom',
                    bottom: 'right',
                    right: 'left',
                  };
                  changeDock(nextDock[dock]);
                }}
                title="Dock position"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                <Move className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsCollapsed(true)}
                title="Minimize toolbar"
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center"
              >
                {dock === 'left' ? <ChevronLeft className="w-5 h-5" /> : dock === 'right' ? <ChevronRight className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Clear Confirmation Modal (Large touch buttons) */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-8 h-8 stroke-[2.5]" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">Clear drawings?</h3>
            <p className="text-slate-600 text-base mb-6">
              This will erase all whiteboard ink on this screen.
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="flex-1 min-h-[56px] rounded-2xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onClear();
                  setShowClearConfirm(false);
                }}
                className="flex-1 min-h-[56px] rounded-2xl font-bold text-white bg-rose-600 hover:bg-rose-700 transition-colors shadow-lg shadow-rose-600/30"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
