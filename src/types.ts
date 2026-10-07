export type SubtopicId = '16.1' | '16.2' | '16.3' | '16.4' | '16.5' | '16.6';

export type StepType = 
  | 'objective' 
  | 'concept' 
  | 'worked-example' 
  | 'comparison' 
  | 'interactive' 
  | 'common-mistake' 
  | 'vocabulary' 
  | 'practice';

export type PracticeLevel = 'basic' | 'medium' | 'challenge';

export interface StepItem {
  id: string;
  subtopicId: SubtopicId;
  title: string;
  cambridgeCodes?: string[];
  type: StepType;
  practiceLevel?: PracticeLevel;
  questionNumber?: number; // 1-9
  // Primary student-facing sentences (maximum 2 short sentences as per specification)
  sentences?: string[];
  // Key terms or formula displayed prominently
  keyTerms?: string[];
  // Sentence frames for students
  sentenceFrames?: string[];
  // Custom content key for specialized interactive visual components
  componentKey: string;
  // Specific data for the step
  data?: Record<string, any>;
}

export interface SubtopicConfig {
  id: SubtopicId;
  title: string;
  shortTitle: string;
  accentColor: string; // hex
  accentTailwind: string;
  steps: StepItem[];
}

// Whiteboard Types
export type DrawingTool = 'pen' | 'highlighter' | 'eraser' | 'line' | 'rect' | 'circle' | 'ruler';

export interface Point {
  x: number;
  y: number;
  pressure?: number;
}

export interface Stroke {
  id: string;
  tool: DrawingTool;
  color: string;
  width: number;
  points: Point[];
  // For geometric helpers
  startPoint?: Point;
  endPoint?: Point;
}

export type GridType = 'blank' | 'dot' | 'square' | 'lined' | 'graph';

export type ToolbarDock = 'left' | 'right' | 'bottom';
