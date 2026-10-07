import { SubtopicConfig, SubtopicId } from '../types';
import { subtopic16_1 } from './subtopic16_1';
import { subtopic16_2 } from './subtopic16_2';
import { subtopic16_3 } from './subtopic16_3';
import { subtopic16_4 } from './subtopic16_4';
import { subtopic16_5 } from './subtopic16_5';
import { subtopic16_6 } from './subtopic16_6';

export const allSubtopics: Record<SubtopicId, SubtopicConfig> = {
  '16.1': subtopic16_1,
  '16.2': subtopic16_2,
  '16.3': subtopic16_3,
  '16.4': subtopic16_4,
  '16.5': subtopic16_5,
  '16.6': subtopic16_6,
};

export const subtopicList: SubtopicConfig[] = [
  subtopic16_1,
  subtopic16_2,
  subtopic16_3,
  subtopic16_4,
  subtopic16_5,
  subtopic16_6,
];
