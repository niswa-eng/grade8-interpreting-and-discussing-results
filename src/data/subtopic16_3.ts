import { StepItem, SubtopicConfig } from '../types';

export const steps16_3: StepItem[] = [
  // Step 1: Learning objectives
  {
    id: '16.3-step-1',
    subtopicId: '16.3',
    title: 'Learning Objectives',
    cambridgeCodes: ['8Ss.03'],
    type: 'objective',
    sentences: [
      'Construct and interpret ordered stem-and-leaf diagrams with keys.',
      'Find the mode, median, and range directly from stem-and-leaf diagrams.',
    ],
    keyTerms: ['Stem-and-Leaf Diagram', 'Key', 'Ordered Leaves'],
    componentKey: 'objectives_16_3',
  },

  // Step 2: What is a stem-and-leaf diagram?
  {
    id: '16.3-step-2',
    subtopicId: '16.3',
    title: 'Stem-and-Leaf Diagram',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'A stem-and-leaf diagram groups data while keeping every individual original value.',
      'The stem shows the leading digits (tens) and each leaf is the final digit (units).',
    ],
    keyTerms: ['Stem = Leading digit', 'Leaf = Final unit digit'],
    componentKey: 'concept_stem_leaf',
  },

  // Step 3: Anatomy
  {
    id: '16.3-step-3',
    subtopicId: '16.3',
    title: 'Anatomy of the Diagram',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'The vertical line separates the stem column from the leaves.',
      'Every diagram must include a key showing how to read the values.',
    ],
    keyTerms: ['Stem Column', 'Divider Line', 'Key: 1 | 9 means 19 °C'],
    componentKey: 'anatomy_stem_leaf',
  },

  // Step 4: Building step-by-step
  {
    id: '16.3-step-4',
    subtopicId: '16.3',
    title: 'Building from Raw Data',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Data (°C): 19, 23, 25, 21, 32, 28, 23, 30, 25, 23, 17, 34.',
      'First write the stems, draft unordered leaves, then order each row and add the key.',
    ],
    keyTerms: ['Step A: Stems', 'Step B: Draft', 'Step C: Order', 'Step D: Key'],
    componentKey: 'stem_builder_step_by_step',
  },

  // Step 5: Reading values & Interactive test
  {
    id: '16.3-step-5',
    subtopicId: '16.3',
    title: 'Reading Values',
    cambridgeCodes: ['8Ss.03'],
    type: 'interactive',
    sentences: [
      'Combine the stem and the leaf to read the complete original number.',
      'A leaf of 8 next to a stem of 2 represents 28 °C.',
    ],
    keyTerms: ['Stem 2 + Leaf 8 = 28'],
    componentKey: 'interactive_reading_stem',
  },

  // Step 6: Mode
  {
    id: '16.3-step-6',
    subtopicId: '16.3',
    title: 'Finding the Mode',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'The mode is the value that appears most often in the data.',
      'The leaf 3 appears three times next to stem 2, so the mode is 23 °C.',
    ],
    keyTerms: ['Mode = 23 °C', 'Frequency = 3 times'],
    componentKey: 'stem_mode_demo',
  },

  // Step 7: Range
  {
    id: '16.3-step-7',
    subtopicId: '16.3',
    title: 'Finding the Range',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Range = largest value − smallest value.',
      'Highest is 34 °C and lowest is 17 °C: 34 − 17 = 17 °C.',
    ],
    keyTerms: ['Range = 34 − 17 = 17 °C'],
    componentKey: 'stem_range_demo',
  },

  // Step 8: Median (Odd count)
  {
    id: '16.3-step-8',
    subtopicId: '16.3',
    title: 'Median: Odd Count',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'The median is the exact middle value when values are placed in order.',
      'For 9 values, cross off pairs from both ends until the single middle value remains.',
    ],
    keyTerms: ['Middle of 9 values = 5th value'],
    componentKey: 'median_odd_demo',
    data: {
      oddValues: [12, 15, 17, 20, 23, 23, 28, 31, 34],
    },
  },

  // Step 9: Median (Even count)
  {
    id: '16.3-step-9',
    subtopicId: '16.3',
    title: 'Median: Even Count',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'With 12 values, there are two middle numbers: the 6th (23) and 7th (25).',
      'The median is the mean of the two middle values: (23 + 25) ÷ 2 = 24 °C.',
    ],
    keyTerms: ['Median = (23 + 25) ÷ 2 = 24 °C'],
    componentKey: 'median_even_demo',
  },

  // Step 10: Decimal and three-digit keys
  {
    id: '16.3-step-10',
    subtopicId: '16.3',
    title: 'Decimal and Three-Digit Keys',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Keys define decimals: Key: 2 | 4 means 2.4 seconds.',
      'Keys define three-digit numbers: Key: 10 | 9 means 109.',
    ],
    keyTerms: ['Key: 2 | 4 = 2.4', 'Key: 10 | 9 = 109'],
    componentKey: 'decimal_3digit_keys',
  },

  // Step 11: Common mistakes
  {
    id: '16.3-step-11',
    subtopicId: '16.3',
    title: 'Common Mistakes',
    cambridgeCodes: ['8Ss.03'],
    type: 'common-mistake',
    sentences: [
      'Leaving leaves unordered or omitting the essential key.',
      'Leaving out repeated numbers or drawing leaves with uneven spacing.',
    ],
    keyTerms: ['Leaves must be ordered', 'Never omit repeated leaves'],
    componentKey: 'mistakes_16_3',
  },

  // Step 12: Vocabulary
  {
    id: '16.3-step-12',
    subtopicId: '16.3',
    title: 'Key Vocabulary',
    cambridgeCodes: ['8Ss.03'],
    type: 'vocabulary',
    sentences: [
      'The key defines the units and place value for the stem and leaves.',
      'Leaves must line up in neat vertical columns of equal width.',
    ],
    keyTerms: ['Stem', 'Leaf', 'Key', 'Ordered', 'Mode', 'Median', 'Range'],
    componentKey: 'vocabulary_16_3',
  },

  // --- PRACTICE SCREENS ---
  // Q1
  {
    id: '16.3-p-1',
    subtopicId: '16.3',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 1,
    type: 'practice',
    sentences: [
      'Look at the diagram with Key: 1 | 2 means 12. Rows: 1 | 2 5 7; 2 | 0 3 3 8; 3 | 1 4.',
      'How many values are in the diagram? Write down the mode.',
    ],
    componentKey: 'p_16_3_q1',
  },
  // Q2
  {
    id: '16.3-p-2',
    subtopicId: '16.3',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 2,
    type: 'practice',
    sentences: [
      'Using the same diagram (Key: 1 | 2 means 12):',
      'Write down the largest and smallest values and work out the range.',
    ],
    componentKey: 'p_16_3_q2',
  },
  // Q3
  {
    id: '16.3-p-3',
    subtopicId: '16.3',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 3,
    type: 'practice',
    sentences: [
      'Using the same diagram (Key: 1 | 2 means 12):',
      'Find the median value.',
    ],
    componentKey: 'p_16_3_q3',
  },
  // Q4
  {
    id: '16.3-p-4',
    subtopicId: '16.3',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 4,
    type: 'practice',
    sentences: [
      'Masses of 12 bags (kg): 41, 38, 45, 52, 38, 47, 55, 41, 38, 49, 53, 46.',
      'Draw an ordered stem-and-leaf diagram with a key.',
    ],
    componentKey: 'p_16_3_q4',
  },
  // Q5
  {
    id: '16.3-p-5',
    subtopicId: '16.3',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 5,
    type: 'practice',
    sentences: [
      'Use your diagram from Question 4 (masses of 12 bags):',
      'Find the mode, the median, and the range.',
    ],
    componentKey: 'p_16_3_q5',
  },
  // Q6
  {
    id: '16.3-p-6',
    subtopicId: '16.3',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 6,
    type: 'practice',
    sentences: [
      'Values: 21, 25, 22, 34, 31, 28, 36.',
      'The diagram was drawn with unordered leaves and no key. Write down the two mistakes and redraw it correctly.',
    ],
    componentKey: 'p_16_3_q6',
  },
  // Q7
  {
    id: '16.3-p-7',
    subtopicId: '16.3',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 7,
    type: 'practice',
    sentences: [
      'Times (seconds): 2.1, 2.4, 2.4, 2.7, 3.0, 3.3, 3.5, 3.5, 3.9, 4.2.',
      'Draw an ordered stem-and-leaf diagram with a key and find the median and the range.',
    ],
    componentKey: 'p_16_3_q7',
  },
  // Q8
  {
    id: '16.3-p-8',
    subtopicId: '16.3',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 8,
    type: 'practice',
    sentences: [
      'Data: 112, 125, 118, 131, 125, 140, 109, 128.',
      'Draw an ordered stem-and-leaf diagram with a key.',
    ],
    componentKey: 'p_16_3_q8',
  },
  // Q9
  {
    id: '16.3-p-9',
    subtopicId: '16.3',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 9,
    type: 'practice',
    sentences: [
      'Aisha looks at a stem-and-leaf diagram and says: "The mode is the stem with the most leaves."',
      'Use the diagram from Level 1 to explain why Aisha is wrong.',
    ],
    componentKey: 'p_16_3_q9',
  },
];

export const subtopic16_3: SubtopicConfig = {
  id: '16.3',
  title: '16.3 Stem-and-leaf diagrams',
  shortTitle: '16.3 Stem-and-leaf diagrams',
  accentColor: '#EA580C',
  accentTailwind: 'orange',
  steps: steps16_3,
};
