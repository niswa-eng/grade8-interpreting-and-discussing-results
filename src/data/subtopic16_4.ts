import { StepItem, SubtopicConfig } from '../types';

export const steps16_4: StepItem[] = [
  // Step 1: Learning objectives
  {
    id: '16.4-step-1',
    subtopicId: '16.4',
    title: 'Learning Objectives',
    cambridgeCodes: ['8Ss.03'],
    type: 'objective',
    sentences: [
      'Construct and interpret pie charts using angles that sum to 360°.',
      'Distinguish between proportion and actual quantity when comparing charts.',
    ],
    keyTerms: ['Pie Chart', 'Sectors', 'Full Turn = 360°', 'Proportion'],
    componentKey: 'objectives_16_4',
  },

  // Step 2: What is a pie chart?
  {
    id: '16.4-step-2',
    subtopicId: '16.4',
    title: 'What is a Pie Chart?',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'A pie chart is a circle split into sectors representing categories of a whole.',
      'A full turn equals 360°, and a larger sector indicates a larger proportion.',
    ],
    keyTerms: ['Circle = 360°', 'Sector = Category Share'],
    componentKey: 'concept_pie_chart',
  },

  // Step 3: Common fractions and angles
  {
    id: '16.4-step-3',
    subtopicId: '16.4',
    title: 'Fractions of 360°',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Half = 180°  ·  Quarter = 90°  ·  Third = 120°  ·  Tenth = 36°.',
      'To find an angle, multiply the fraction by 360°.',
    ],
    keyTerms: ['1/2 = 180°', '1/4 = 90°', '1/3 = 120°', '1/10 = 36°'],
    componentKey: 'fractions_of_circle',
  },

  // Step 4: Drawing a pie chart step by step
  {
    id: '16.4-step-4',
    subtopicId: '16.4',
    title: 'Calculating Sector Angles',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Angle = (frequency ÷ total) × 360°.',
      'For 36 students: Apple 120°, Banana 90°, Orange 60°, Grapes 90° (Total = 360°).',
    ],
    keyTerms: ['Angle = (Frequency ÷ Total) × 360°'],
    componentKey: 'pie_table_angles',
    data: {
      categories: [
        { label: 'Apple', count: 12, color: '#DC2626' },
        { label: 'Banana', count: 9, color: '#EAB308' },
        { label: 'Orange', count: 6, color: '#EA580C' },
        { label: 'Grapes', count: 9, color: '#9333EA' },
      ],
    },
  },

  // Step 5: Protractor overlay
  {
    id: '16.4-step-5',
    subtopicId: '16.4',
    title: 'Using a Protractor',
    cambridgeCodes: ['8Ss.03'],
    type: 'interactive',
    sentences: [
      'Place the center of the protractor at the center of the circle.',
      'Measure each angle from the previous radius line and label every sector.',
    ],
    keyTerms: ['Protractor Alignment', 'Measure from Radius'],
    componentKey: 'protractor_interactive',
  },

  // Step 6: Finding frequency from angle
  {
    id: '16.4-step-6',
    subtopicId: '16.4',
    title: 'Finding Frequency from Angle',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Frequency = (sector angle ÷ 360°) × total.',
      'A 72° sector in a survey of 200 people represents (72 ÷ 360) × 200 = 40 people.',
    ],
    keyTerms: ['Frequency = (Angle ÷ 360°) × Total', '40 people'],
    componentKey: 'frequency_from_angle',
  },

  // Step 7: Proportion vs quantity (School A vs School B)
  {
    id: '16.4-step-7',
    subtopicId: '16.4',
    title: 'Proportion vs Actual Quantity',
    cambridgeCodes: ['8Ss.03'],
    type: 'comparison',
    sentences: [
      'Pie charts show proportions, not raw counts.',
      'School A (40% of 500 = 200) has a bigger sector but fewer walkers than School B (30% of 1000 = 300).',
    ],
    keyTerms: ['Proportion ≠ Quantity', 'Bigger Sector Can Mean Fewer People'],
    componentKey: 'school_a_vs_school_b',
    data: {
      schoolAName: 'School A (500 students)',
      schoolATotal: 500,
      schoolAWalk: 200,
      schoolBName: 'School B (1000 students)',
      schoolBTotal: 1000,
      schoolBWalk: 300,
    },
  },

  // Step 8: Common mistakes
  {
    id: '16.4-step-8',
    subtopicId: '16.4',
    title: 'Common Mistakes',
    cambridgeCodes: ['8Ss.03'],
    type: 'common-mistake',
    sentences: [
      'Sector angles failing to sum to exactly 360°.',
      'Comparing sector sizes across two pie charts without checking their total populations.',
    ],
    keyTerms: ['Check sum equals 360°', 'Check totals when comparing'],
    componentKey: 'mistakes_16_4',
  },

  // Step 9: Vocabulary
  {
    id: '16.4-step-9',
    subtopicId: '16.4',
    title: 'Key Vocabulary',
    cambridgeCodes: ['8Ss.03'],
    type: 'vocabulary',
    sentences: [
      'A sector represents a fraction or percentage of the complete 360° circle.',
      'Proportion compares parts to the whole rather than raw numbers.',
    ],
    keyTerms: [
      'Pie chart',
      'Sector',
      'Angle',
      'Proportion',
      'Fraction',
      'Percentage',
      'Total',
      'Protractor',
    ],
    componentKey: 'vocabulary_16_4',
  },

  // --- PRACTICE SCREENS ---
  // Q1
  {
    id: '16.4-p-1',
    subtopicId: '16.4',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 1,
    type: 'practice',
    sentences: [
      'Travel to school: Walk 90°, Bus 180°, Car 90°.',
      'Which mode of travel is most popular? What fraction of students use the bus?',
    ],
    componentKey: 'p_16_4_q1',
  },
  // Q2
  {
    id: '16.4-p-2',
    subtopicId: '16.4',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 2,
    type: 'practice',
    sentences: [
      '24 students were asked their favourite sport. 8 students chose cycling.',
      'Work out the angle for cycling on a pie chart.',
    ],
    componentKey: 'p_16_4_q2',
  },
  // Q3
  {
    id: '16.4-p-3',
    subtopicId: '16.4',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 3,
    type: 'practice',
    sentences: [
      'In a pie chart of 50 people, the sector for tea has an angle of 144°.',
      'How many people chose tea?',
    ],
    componentKey: 'p_16_4_q3',
  },
  // Q4
  {
    id: '16.4-p-4',
    subtopicId: '16.4',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 4,
    type: 'practice',
    sentences: [
      'Pets of 40 students: Dog 15, Cat 10, Fish 5, Rabbit 10.',
      'Calculate the angle for each pet and draw a pie chart.',
    ],
    componentKey: 'p_16_4_q4',
  },
  // Q5
  {
    id: '16.4-p-5',
    subtopicId: '16.4',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 5,
    type: 'practice',
    sentences: [
      'Class A has 20 students; 50% like football. Class B has 60 students; 25% like football.',
      'Ali says: "More students in Class A like football." Is Ali correct? Explain your answer.',
    ],
    componentKey: 'p_16_4_q5',
  },
  // Q6
  {
    id: '16.4-p-6',
    subtopicId: '16.4',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 6,
    type: 'practice',
    sentences: [
      'A pie chart of 120 people has sectors: Red 90°, Blue 150°, Green (unknown).',
      'Work out the angle for green and the number of people who chose green.',
    ],
    componentKey: 'p_16_4_q6',
  },
  // Q7
  {
    id: '16.4-p-7',
    subtopicId: '16.4',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 7,
    type: 'practice',
    sentences: [
      'Transport to school (60 students): Walk 18, Bus 27, Car 9, Cycle 6.',
      'Calculate the angles and draw a pie chart with all sectors labelled.',
    ],
    componentKey: 'p_16_4_q7',
  },
  // Q8
  {
    id: '16.4-p-8',
    subtopicId: '16.4',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 8,
    type: 'practice',
    sentences: [
      'A survey of 240 people shows the train sector has an angle of 105°.',
      'Work out how many people chose the train.',
    ],
    componentKey: 'p_16_4_q8',
  },
  // Q9
  {
    id: '16.4-p-9',
    subtopicId: '16.4',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 9,
    type: 'practice',
    sentences: [
      'A pie chart has four sectors with angles x, 2x, 3x, and 4x.',
      'Work out the value of x and find the angle of each sector.',
    ],
    componentKey: 'p_16_4_q9',
  },
];

export const subtopic16_4: SubtopicConfig = {
  id: '16.4',
  title: '16.4 Pie charts',
  shortTitle: '16.4 Pie charts',
  accentColor: '#16A34A',
  accentTailwind: 'green',
  steps: steps16_4,
};
