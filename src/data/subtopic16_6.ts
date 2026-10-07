import { StepItem, SubtopicConfig } from '../types';

export const steps16_6: StepItem[] = [
  // Step 1: Learning objectives
  {
    id: '16.6-step-1',
    subtopicId: '16.6',
    title: 'Learning Objectives',
    cambridgeCodes: ['8Ss.03', '8Ss.05'],
    type: 'objective',
    sentences: [
      'Calculate and choose between the mean, median, mode, and range.',
      'Compare two data sets using one average and one measure of spread.',
    ],
    keyTerms: ['Mean', 'Median', 'Mode', 'Range', 'Consistent vs Varied'],
    componentKey: 'objectives_16_6',
  },

  // Step 2: Why use statistics?
  {
    id: '16.6-step-2',
    subtopicId: '16.6',
    title: 'Why Use Statistics?',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Statistics summarise large sets of data into single representative numbers.',
      'To compare two groups, use one average (centre) and one measure of spread (range).',
    ],
    keyTerms: ['Average = Typical value', 'Spread = Consistency'],
    componentKey: 'concept_why_stats',
  },

  // Step 3: Mean & Levelling out
  {
    id: '16.6-step-3',
    subtopicId: '16.6',
    title: 'The Mean: Levelling Out',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Mean = Total of all values ÷ Number of values.',
      'Values 3, 5, 5, 7, 10 give total 30 ÷ 5 = 6 (the height if levelled equally).',
    ],
    keyTerms: ['Mean = 30 ÷ 5 = 6', 'Levelling out concept'],
    componentKey: 'mean_levelling_step',
  },

  // Step 4: Median (Odd & Even)
  {
    id: '16.6-step-4',
    subtopicId: '16.6',
    title: 'The Median: Middle Value',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Always order values from smallest to largest first.',
      'For an even count (3, 4, 6, 8, 9, 12), the median is (6 + 8) ÷ 2 = 7.',
    ],
    keyTerms: ['Median of 3, 4, 6, 8, 9, 12 = 7'],
    componentKey: 'median_step',
  },

  // Step 5: Mode (One, Two, None)
  {
    id: '16.6-step-5',
    subtopicId: '16.6',
    title: 'The Mode: Most Common',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'The mode is the value that occurs most frequently in the data set.',
      'A data set can have one mode, two modes (bimodal), or no mode if all counts are equal.',
    ],
    keyTerms: ['One mode', 'Two modes: 3 and 5', 'No mode: 1, 2, 3, 4'],
    componentKey: 'mode_cases_step',
  },

  // Step 6: Range measures spread
  {
    id: '16.6-step-6',
    subtopicId: '16.6',
    title: 'The Range: Measure of Spread',
    cambridgeCodes: ['8Ss.03'],
    type: 'comparison',
    sentences: [
      'Range = largest value − smallest value.',
      'A smaller range means the data is more consistent; a larger range means more varied.',
    ],
    keyTerms: ['Smaller range = More consistent', 'Larger range = More varied'],
    componentKey: 'range_spread_step',
  },

  // Step 7: Interactive data strip
  {
    id: '16.6-step-7',
    subtopicId: '16.6',
    title: 'Interactive Data Strip',
    cambridgeCodes: ['8Ss.03'],
    type: 'interactive',
    sentences: [
      'Modify, add, or remove values to observe immediate changes in the statistics.',
      'Compare where the mean, median, mode, and range align along the number line.',
    ],
    keyTerms: ['Dynamic Statistics', 'Live Number Line'],
    componentKey: 'interactive_stats_strip_step',
  },

  // Step 8: Effect of an extreme value (outlier)
  {
    id: '16.6-step-8',
    subtopicId: '16.6',
    title: 'Effect of an Extreme Value',
    cambridgeCodes: ['8Ss.05'],
    type: 'worked-example',
    sentences: [
      'Data 5, 6, 6, 7, 6 has mean 6, median 6, and mode 6.',
      'Adding an outlier (36) pulls the mean up to 11, while the median remains 6.',
    ],
    keyTerms: ['Mean changes from 6 to 11', 'Median stays 6'],
    componentKey: 'outlier_effect_step',
  },

  // Step 9: Comparing two groups (Team A vs Team B)
  {
    id: '16.6-step-9',
    subtopicId: '16.6',
    title: 'Comparing Two Groups',
    cambridgeCodes: ['8Ss.05'],
    type: 'comparison',
    sentences: [
      'Team A: 4, 6, 7, 7, 8, 10 (mean 7, range 6).  Team B: 1, 3, 7, 8, 9, 14 (mean 7, range 13).',
      'Both have the same average score, but Team A is much more consistent.',
    ],
    sentenceFrames: [
      'On average, Team A and Team B are the same because both have a mean of 7.',
      'Team A is more consistent because its range is smaller (6 compared with 13).',
    ],
    componentKey: 'comparing_teams_step',
  },

  // Step 10: Choosing the best average
  {
    id: '16.6-step-10',
    subtopicId: '16.6',
    title: 'Choosing the Best Average',
    cambridgeCodes: ['8Ss.05'],
    type: 'concept',
    sentences: [
      'Mean uses all data values, but is heavily distorted by extreme values.',
      'Median resists extreme outliers; mode identifies the most frequent category.',
    ],
    keyTerms: ['Mean: Uses all data', 'Median: Resists outliers', 'Mode: Categorical'],
    componentKey: 'choosing_average_step',
  },

  // Step 11: Common mistakes
  {
    id: '16.6-step-11',
    subtopicId: '16.6',
    title: 'Common Mistakes',
    cambridgeCodes: ['8Ss.03'],
    type: 'common-mistake',
    sentences: [
      'Finding the median without ordering the numbers from smallest to largest first.',
      'Writing the range as two values (e.g. "4 to 12") instead of a single difference (8).',
    ],
    keyTerms: ['Order before finding median', 'Range is a single number'],
    componentKey: 'mistakes_16_6',
  },

  // Step 12: Vocabulary
  {
    id: '16.6-step-12',
    subtopicId: '16.6',
    title: 'Key Vocabulary',
    cambridgeCodes: ['8Ss.03', '8Ss.05'],
    type: 'vocabulary',
    sentences: [
      'An average describes the centre of a data distribution.',
      'Spread describes how widely values are dispersed around the centre.',
    ],
    keyTerms: [
      'Average',
      'Mean',
      'Median',
      'Mode',
      'Range',
      'Spread',
      'Consistent',
      'Varied',
      'Extreme value (outlier)',
    ],
    componentKey: 'vocabulary_16_6',
  },

  // --- PRACTICE SCREENS ---
  // Q1
  {
    id: '16.6-p-1',
    subtopicId: '16.6',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 1,
    type: 'practice',
    sentences: [
      'Given the numbers: 3, 5, 5, 7, 10.',
      'Find the mean, the median, the mode, and the range.',
    ],
    componentKey: 'p_16_6_q1',
  },
  // Q2
  {
    id: '16.6-p-2',
    subtopicId: '16.6',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 2,
    type: 'practice',
    sentences: [
      'Given the numbers: 12, 8, 15, 9, 11.',
      'Find the median.',
    ],
    componentKey: 'p_16_6_q2',
  },
  // Q3
  {
    id: '16.6-p-3',
    subtopicId: '16.6',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 3,
    type: 'practice',
    sentences: [
      'Given the numbers: 4, 9, 7, 8.',
      'Find the mean.',
    ],
    componentKey: 'p_16_6_q3',
  },
  // Q4
  {
    id: '16.6-p-4',
    subtopicId: '16.6',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 4,
    type: 'practice',
    sentences: [
      'Times (seconds): Group A: 12, 14, 15, 15, 19. Group B: 10, 13, 15, 17, 20.',
      'Compare the two groups using the mean and the range.',
    ],
    componentKey: 'p_16_6_q4',
  },
  // Q5
  {
    id: '16.6-p-5',
    subtopicId: '16.6',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 5,
    type: 'practice',
    sentences: [
      'Given the numbers: 6, 9, 3, 12, 8, 4.',
      'Find the median and the range.',
    ],
    componentKey: 'p_16_6_q5',
  },
  // Q6
  {
    id: '16.6-p-6',
    subtopicId: '16.6',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 6,
    type: 'practice',
    sentences: [
      'The mean of five numbers is 8.',
      'Four of the numbers are 6, 7, 9, and 10. Find the fifth number.',
    ],
    componentKey: 'p_16_6_q6',
  },
  // Q7
  {
    id: '16.6-p-7',
    subtopicId: '16.6',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 7,
    type: 'practice',
    sentences: [
      'Prices ($): Shop X: 3, 4, 5, 6, 7. Shop Y: 1, 3, 5, 7, 9.',
      'Which shop has more consistent prices? Use the range and the mean in a full sentence.',
    ],
    componentKey: 'p_16_6_q7',
  },
  // Q8
  {
    id: '16.6-p-8',
    subtopicId: '16.6',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 8,
    type: 'practice',
    sentences: [
      'Data: 5, 6, 6, 7, 6, 36.',
      'Which average (mean, median, or mode) best represents the data? Explain your choice.',
    ],
    componentKey: 'p_16_6_q8',
  },
  // Q9
  {
    id: '16.6-p-9',
    subtopicId: '16.6',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 9,
    type: 'practice',
    sentences: [
      'The mean of 4 numbers is 10. The mean of another 6 numbers is 15.',
      'Work out the mean of all 10 numbers.',
    ],
    componentKey: 'p_16_6_q9',
  },
];

export const subtopic16_6: SubtopicConfig = {
  id: '16.6',
  title: '16.6 Using statistics',
  shortTitle: '16.6 Using statistics',
  accentColor: '#C026D3',
  accentTailwind: 'magenta',
  steps: steps16_6,
};
