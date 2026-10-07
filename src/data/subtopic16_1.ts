import { StepItem, SubtopicConfig } from '../types';

export const steps16_1: StepItem[] = [
  // Step 1: Learning objectives
  {
    id: '16.1-step-1',
    subtopicId: '16.1',
    title: 'Learning Objectives',
    cambridgeCodes: ['8Ss.03'],
    type: 'objective',
    sentences: [
      'Interpret and draw frequency diagrams for continuous data.',
      'Understand class intervals and compare continuous data with discrete data.',
    ],
    keyTerms: ['Frequency Diagram', 'Continuous Data', 'Class Interval'],
    componentKey: 'objectives_16_1',
  },

  // Step 2: What is a frequency diagram?
  {
    id: '16.1-step-2',
    subtopicId: '16.1',
    title: 'Frequency',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Frequency is how many times a value or group of values occurs.',
      'A frequency diagram displays grouped frequencies using bars.',
    ],
    keyTerms: ['Frequency = How many times'],
    componentKey: 'concept_frequency',
  },

  // Step 3: Discrete data vs Continuous data
  {
    id: '16.1-step-3',
    subtopicId: '16.1',
    title: 'Discrete and Continuous Data',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Discrete data takes separate, exact values that are counted.',
      'Continuous data can take any value within a range and is measured.',
    ],
    keyTerms: ['Discrete: Counted', 'Continuous: Measured'],
    componentKey: 'discrete_vs_continuous',
  },

  // Step 4: Discrete bar chart, built step by step
  {
    id: '16.1-step-4',
    subtopicId: '16.1',
    title: 'Discrete Bar Chart',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Discrete data is shown with equal gaps between the bars.',
      'Every bar has equal width and sits above a distinct category label.',
    ],
    keyTerms: ['Equal Bar Width', 'Equal Gaps'],
    componentKey: 'discrete_bar_chart_builder',
    data: {
      siblingsData: [
        { label: '0', value: 4 },
        { label: '1', value: 9 },
        { label: '2', value: 7 },
        { label: '3', value: 3 },
        { label: '4', value: 1 },
      ],
    },
  },

  // Step 5: Continuous data and class intervals (60 < m <= 70)
  {
    id: '16.1-step-5',
    subtopicId: '16.1',
    title: 'Class Intervals',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      '60 < m ≤ 70 means a mass more than 60 kg and up to and including 70 kg.',
      'The open circle excludes 60. The solid circle includes 70.',
    ],
    keyTerms: ['60 < m ≤ 70', 'Open circle: Excluded', 'Solid circle: Included'],
    componentKey: 'class_interval_number_line',
  },

  // Step 6: Frequency table to frequency diagram
  {
    id: '16.1-step-6',
    subtopicId: '16.1',
    title: 'Drawing a Frequency Diagram',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'For continuous data, there are NO gaps between bars.',
      'The horizontal axis is a continuous number line with labels at the bar edges.',
    ],
    keyTerms: ['Equal Class Widths', 'No Gaps', 'Numbers at Bar Edges'],
    componentKey: 'histogram_builder',
    data: {
      massesData: [
        { min: 40, max: 50, frequency: 3, label: '40 < m ≤ 50' },
        { min: 50, max: 60, frequency: 8, label: '50 < m ≤ 60' },
        { min: 60, max: 70, frequency: 11, label: '60 < m ≤ 70' },
        { min: 70, max: 80, frequency: 6, label: '70 < m ≤ 80' },
        { min: 80, max: 90, frequency: 2, label: '80 < m ≤ 90' },
      ],
    },
  },

  // Step 7: Side-by-side comparison
  {
    id: '16.1-step-7',
    subtopicId: '16.1',
    title: 'Comparing the Two Displays',
    cambridgeCodes: ['8Ss.03'],
    type: 'comparison',
    sentences: [
      'Bar charts have gaps because discrete categories are separate.',
      'Frequency diagrams have no gaps because continuous measurements flow without breaks.',
    ],
    keyTerms: ['Discrete = Gaps', 'Continuous = No Gaps'],
    componentKey: 'side_by_side_bar_vs_hist',
  },

  // Step 8: Reading a frequency diagram
  {
    id: '16.1-step-8',
    subtopicId: '16.1',
    title: 'Reading a Frequency Diagram',
    cambridgeCodes: ['8Ss.03'],
    type: 'interactive',
    sentences: [
      'The modal class is the interval with the highest bar.',
      'To find totals or subsets, add the heights of the corresponding bars.',
    ],
    keyTerms: ['Modal Class', 'Total Frequency'],
    componentKey: 'interactive_reading_histogram',
  },

  // Step 9: Common mistakes
  {
    id: '16.1-step-9',
    subtopicId: '16.1',
    title: 'Common Mistakes',
    cambridgeCodes: ['8Ss.03'],
    type: 'common-mistake',
    sentences: [
      'Leaving gaps between bars in a continuous frequency diagram.',
      'Using unequal class widths or an inconsistent vertical scale.',
    ],
    keyTerms: ['No Gaps for Continuous Data', 'Equal Class Widths'],
    componentKey: 'mistakes_16_1',
  },

  // Step 10: Vocabulary
  {
    id: '16.1-step-10',
    subtopicId: '16.1',
    title: 'Key Vocabulary',
    cambridgeCodes: ['8Ss.03'],
    type: 'vocabulary',
    sentences: [
      'Continuous data is grouped into equal class intervals.',
      'Frequency diagrams display frequencies with adjacent bars.',
    ],
    keyTerms: [
      'Frequency',
      'Class interval',
      'Discrete data',
      'Continuous data',
      'Modal class',
      'Equal class width',
    ],
    componentKey: 'vocabulary_16_1',
  },

  // --- PRACTICE SCREENS (9 Questions, 3 per level) ---

  // Practice Level 1 - Question 1
  {
    id: '16.1-p-1',
    subtopicId: '16.1',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 1,
    type: 'practice',
    sentences: [
      'Which sport is most popular?',
      'How many students were asked altogether?',
    ],
    componentKey: 'p_16_1_q1',
  },

  // Practice Level 1 - Question 2
  {
    id: '16.1-p-2',
    subtopicId: '16.1',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 2,
    type: 'practice',
    sentences: [
      'State whether each data set is discrete or continuous:',
      '(a) Number of books in a bag  (b) Time to run 100 m  (c) Mass of a bag  (d) Shoe size',
    ],
    componentKey: 'p_16_1_q2',
  },

  // Practice Level 1 - Question 3
  {
    id: '16.1-p-3',
    subtopicId: '16.1',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 3,
    type: 'practice',
    sentences: [
      'Use the masses frequency diagram (30 students).',
      'How many students have a mass more than 60 kg?',
    ],
    componentKey: 'p_16_1_q3',
  },

  // Practice Level 2 - Question 4
  {
    id: '16.1-p-4',
    subtopicId: '16.1',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 4,
    type: 'practice',
    sentences: [
      'Draw a frequency diagram for these times (seconds) of 25 students:',
      '10 < t ≤ 15: 2  |  15 < t ≤ 20: 7  |  20 < t ≤ 25: 9  |  25 < t ≤ 30: 5  |  30 < t ≤ 35: 2',
    ],
    componentKey: 'p_16_1_q4',
  },

  // Practice Level 2 - Question 5
  {
    id: '16.1-p-5',
    subtopicId: '16.1',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 5,
    type: 'practice',
    sentences: [
      'Total students = 40. Heights h (cm):',
      '140 < h ≤ 150: 4  |  150 < h ≤ 160: 12  |  160 < h ≤ 170: missing  |  170 < h ≤ 180: 9  |  180 < h ≤ 190: 3. Find the missing frequency.',
    ],
    componentKey: 'p_16_1_q5',
  },

  // Practice Level 2 - Question 6
  {
    id: '16.1-p-6',
    subtopicId: '16.1',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 6,
    type: 'practice',
    sentences: [
      'A frequency diagram of journey times is drawn with gaps between the bars and no label on the vertical axis.',
      'Write down two mistakes.',
    ],
    componentKey: 'p_16_1_q6',
  },

  // Practice Level 3 - Question 7
  {
    id: '16.1-p-7',
    subtopicId: '16.1',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 7,
    type: 'practice',
    sentences: [
      'Lengths of 20 leaves (cm): 4.2, 5.8, 6.1, 7.4, 5.5, 6.9, 8.3, 4.9, 7.7, 6.4, 5.1, 7.0, 8.8, 6.6, 5.9, 7.2, 4.5, 6.0, 7.9, 5.3.',
      'Use class intervals 4 < l ≤ 5, 5 < l ≤ 6, 6 < l ≤ 7, 7 < l ≤ 8, 8 < l ≤ 9 to complete a frequency table and draw a frequency diagram.',
    ],
    componentKey: 'p_16_1_q7',
  },

  // Practice Level 3 - Question 8
  {
    id: '16.1-p-8',
    subtopicId: '16.1',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 8,
    type: 'practice',
    sentences: [
      'Journey times to school range from 3 minutes to 47 minutes.',
      'Suggest suitable equal class intervals and explain your choice.',
    ],
    componentKey: 'p_16_1_q8',
  },

  // Practice Level 3 - Question 9
  {
    id: '16.1-p-9',
    subtopicId: '16.1',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 9,
    type: 'practice',
    sentences: [
      'In a frequency diagram, the bar for 20 < t ≤ 30 has height 12.',
      'Zara says: "12 students took exactly 25 seconds." Explain why Zara cannot know this.',
    ],
    componentKey: 'p_16_1_q9',
  },
];

export const subtopic16_1: SubtopicConfig = {
  id: '16.1',
  title: '16.1 Interpreting and drawing frequency diagrams',
  shortTitle: '16.1 Frequency diagrams',
  accentColor: '#2563EB',
  accentTailwind: 'blue',
  steps: steps16_1,
};
