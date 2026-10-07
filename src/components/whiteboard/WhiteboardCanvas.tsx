import React, { useRef, useState, useEffect, useCallback } from 'react';
import { DrawingTool, Stroke, Point } from '../../types';

interface WhiteboardCanvasProps {
  isDrawMode: boolean;
  activeTool: DrawingTool;
  activeColor: string;
  activeWidth: number;
  screenKey: string;
  onCanUndoChange?: (canUndo: boolean) => void;
  onCanRedoChange?: (canRedo: boolean) => void;
  clearTrigger?: number; // increments when clear is confirmed
  undoTrigger?: number; // increments when undo button is clicked
  redoTrigger?: number; // increments when redo button is clicked
}

export const WhiteboardCanvas: React.FC<WhiteboardCanvasProps> = ({
  isDrawMode,
  activeTool,
  activeColor,
  activeWidth,
  screenKey,
  onCanUndoChange,
  onCanRedoChange,
  clearTrigger = 0,
  undoTrigger = 0,
  redoTrigger = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const isDrawingRef = useRef(false);
  const currentStrokeRef = useRef<Stroke | null>(null);
  const activePointerIdRef = useRef<number | null>(null);
  const isPenDetectedRef = useRef(false);

  // Load strokes from localStorage for screenKey
  useEffect(() => {
    try {
      const stored = localStorage.getItem(`handling_data_strokes_${screenKey}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setStrokes(parsed);
          setRedoStack([]);
          return;
        }
      }
    } catch (e) {
      // storage blocked or error
    }
    setStrokes([]);
    setRedoStack([]);
  }, [screenKey]);

  // Persist strokes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`handling_data_strokes_${screenKey}`, JSON.stringify(strokes));
    } catch (e) {
      // ignore
    }
    if (onCanUndoChange) onCanUndoChange(strokes.length > 0);
    if (onCanRedoChange) onCanRedoChange(redoStack.length > 0);
  }, [strokes, redoStack, screenKey, onCanUndoChange, onCanRedoChange]);

  // Handle external triggers (undo, redo, clear)
  useEffect(() => {
    if (undoTrigger > 0 && strokes.length > 0) {
      const lastStroke = strokes[strokes.length - 1];
      setRedoStack((prev) => [...prev, lastStroke]);
      setStrokes((prev) => prev.slice(0, -1));
    }
  }, [undoTrigger]);

  useEffect(() => {
    if (redoTrigger > 0 && redoStack.length > 0) {
      const restored = redoStack[redoStack.length - 1];
      setStrokes((prev) => [...prev, restored]);
      setRedoStack((prev) => prev.slice(0, -1));
    }
  }, [redoTrigger]);

  useEffect(() => {
    if (clearTrigger > 0) {
      setStrokes([]);
      setRedoStack([]);
    }
  }, [clearTrigger]);

  // Redraw canvas whenever strokes change
  const redrawAll = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (const stroke of strokes) {
      drawSingleStroke(ctx, stroke);
    }

    // Draw active in-progress stroke
    if (currentStrokeRef.current) {
      drawSingleStroke(ctx, currentStrokeRef.current);
    }
  }, [strokes]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
      redrawAll();
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [redrawAll]);

  useEffect(() => {
    redrawAll();
  }, [redrawAll]);

  function drawSingleStroke(ctx: CanvasRenderingContext2D, stroke: Stroke) {
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (stroke.tool === 'highlighter') {
      ctx.globalAlpha = 0.35;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width * 2.5;
    } else {
      ctx.globalAlpha = 1.0;
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
    }

    if (stroke.tool === 'pen' || stroke.tool === 'highlighter') {
      if (stroke.points.length === 1) {
        ctx.fillStyle = stroke.color;
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (stroke.points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length - 1; i++) {
          const xc = (stroke.points[i].x + stroke.points[i + 1].x) / 2;
          const yc = (stroke.points[i].y + stroke.points[i + 1].y) / 2;
          ctx.quadraticCurveTo(stroke.points[i].x, stroke.points[i].y, xc, yc);
        }
        ctx.lineTo(
          stroke.points[stroke.points.length - 1].x,
          stroke.points[stroke.points.length - 1].y
        );
        ctx.stroke();
      }
    } else if (stroke.tool === 'line' || stroke.tool === 'ruler') {
      if (stroke.startPoint && stroke.endPoint) {
        ctx.beginPath();
        ctx.moveTo(stroke.startPoint.x, stroke.startPoint.y);
        ctx.lineTo(stroke.endPoint.x, stroke.endPoint.y);
        ctx.stroke();

        if (stroke.tool === 'ruler') {
          // Draw neat tick marks at both ends
          const dx = stroke.endPoint.x - stroke.startPoint.x;
          const dy = stroke.endPoint.y - stroke.startPoint.y;
          const len = Math.hypot(dx, dy);
          if (len > 20) {
            const nx = -dy / len;
            const ny = dx / len;
            ctx.beginPath();
            ctx.moveTo(stroke.startPoint.x - nx * 8, stroke.startPoint.y - ny * 8);
            ctx.lineTo(stroke.startPoint.x + nx * 8, stroke.startPoint.y + ny * 8);
            ctx.moveTo(stroke.endPoint.x - nx * 8, stroke.endPoint.y - ny * 8);
            ctx.lineTo(stroke.endPoint.x + nx * 8, stroke.endPoint.y + ny * 8);
            ctx.stroke();
          }
        }
      }
    } else if (stroke.tool === 'rect') {
      if (stroke.startPoint && stroke.endPoint) {
        const x = Math.min(stroke.startPoint.x, stroke.endPoint.x);
        const y = Math.min(stroke.startPoint.y, stroke.endPoint.y);
        const w = Math.abs(stroke.endPoint.x - stroke.startPoint.x);
        const h = Math.abs(stroke.endPoint.y - stroke.startPoint.y);
        ctx.strokeRect(x, y, w, h);
      }
    } else if (stroke.tool === 'circle') {
      if (stroke.startPoint && stroke.endPoint) {
        const cx = (stroke.startPoint.x + stroke.endPoint.x) / 2;
        const cy = (stroke.startPoint.y + stroke.endPoint.y) / 2;
        const rx = Math.abs(stroke.endPoint.x - stroke.startPoint.x) / 2;
        const ry = Math.abs(stroke.endPoint.y - stroke.startPoint.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Pointer event helpers
  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>): Point => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      pressure: e.pressure || 0.5,
    };
  };

  const snapAngle = (start: Point, end: Point): Point => {
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    const angle = Math.atan2(dy, dx);
    const deg = Math.abs((angle * 180) / Math.PI);

    // Snap to Horizontal (within 10 deg)
    if (deg < 10 || deg > 170) {
      return { x: end.x, y: start.y };
    }
    // Snap to Vertical (within 10 deg of 90)
    if (Math.abs(deg - 90) < 10) {
      return { x: start.x, y: end.y };
    }
    return end;
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode) return;

    // Palm rejection: if pen has been used, reject touches
    if (e.pointerType === 'pen') {
      isPenDetectedRef.current = true;
    } else if (e.pointerType === 'touch' && isPenDetectedRef.current) {
      return;
    }

    // Ignore secondary pointers if one is already drawing
    if (isDrawingRef.current) return;

    activePointerIdRef.current = e.pointerId;
    isDrawingRef.current = true;
    canvasRef.current?.setPointerCapture(e.pointerId);

    const pt = getCoordinates(e);

    if (activeTool === 'eraser') {
      eraseStrokesNear(pt);
      return;
    }

    const newStroke: Stroke = {
      id: `${Date.now()}_${Math.random()}`,
      tool: activeTool,
      color: activeColor,
      width: activeWidth,
      points: [pt],
      startPoint: pt,
      endPoint: pt,
    };

    currentStrokeRef.current = newStroke;
    redrawAll();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    const pt = getCoordinates(e);

    if (activeTool === 'eraser') {
      eraseStrokesNear(pt);
      return;
    }

    if (!currentStrokeRef.current) return;

    if (activeTool === 'pen' || activeTool === 'highlighter') {
      currentStrokeRef.current.points.push(pt);
    } else if (activeTool === 'line' || activeTool === 'ruler') {
      const snapped = snapAngle(currentStrokeRef.current.startPoint!, pt);
      currentStrokeRef.current.endPoint = snapped;
    } else {
      currentStrokeRef.current.endPoint = pt;
    }

    redrawAll();
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawMode || !isDrawingRef.current) return;
    if (activePointerIdRef.current !== e.pointerId) return;

    isDrawingRef.current = false;
    activePointerIdRef.current = null;

    if (activeTool !== 'eraser' && currentStrokeRef.current) {
      const finished = { ...currentStrokeRef.current };
      setStrokes((prev) => [...prev, finished]);
      setRedoStack([]);
      currentStrokeRef.current = null;
    }

    redrawAll();
  };

  const handlePointerCancel = () => {
    isDrawingRef.current = false;
    activePointerIdRef.current = null;
    currentStrokeRef.current = null;
    redrawAll();
  };

  const eraseStrokesNear = (pt: Point) => {
    const radius = 28;
    setStrokes((prev) =>
      prev.filter((stroke) => {
        if (stroke.startPoint && stroke.endPoint) {
          const d1 = Math.hypot(stroke.startPoint.x - pt.x, stroke.startPoint.y - pt.y);
          const d2 = Math.hypot(stroke.endPoint.x - pt.x, stroke.endPoint.y - pt.y);
          if (d1 < radius || d2 < radius) return false;
        }
        for (const p of stroke.points) {
          if (Math.hypot(p.x - pt.x, p.y - pt.y) < radius) {
            return false;
          }
        }
        return true;
      })
    );
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      style={{
        touchAction: 'none',
        pointerEvents: isDrawMode ? 'all' : 'none',
      }}
      className="absolute inset-0 w-full h-full z-30"
    />
  );
};
