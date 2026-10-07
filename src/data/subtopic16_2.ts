import { StepItem, SubtopicConfig } from '../types';

export const steps16_2: StepItem[] = [
  // Step 1: Learning objectives
  {
    id: '16.2-step-1',
    subtopicId: '16.2',
    title: 'Learning Objectives',
    cambridgeCodes: ['8Ss.03'],
    type: 'objective',
    sentences: [
      'Interpret and draw time series graphs.',
      'Identify trends, patterns over time, and read values accurately.',
    ],
    keyTerms: ['Time Series Graph', 'Trend', 'Regular Intervals'],
    componentKey: 'objectives_16_2',
  },

  // Step 2: What is a time series graph?
  {
    id: '16.2-step-2',
    subtopicId: '16.2',
    title: 'Time Series Graph',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Points are plotted at regular intervals of time and joined by straight lines.',
      'A time series graph displays how data changes and shows the overall trend.',
    ],
    keyTerms: ['Time on Horizontal Axis', 'Straight Lines Connect Points'],
    componentKey: 'concept_timeseries',
  },

  // Step 3: Rules on a blank graph
  {
    id: '16.2-step-3',
    subtopicId: '16.2',
    title: 'Rules for Time Series Graphs',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Time is always placed on the horizontal axis.',
      'Join consecutive points in chronological order with straight lines.',
    ],
    keyTerms: ['Horizontal = Time', 'Chronological Order'],
    componentKey: 'rules_timeseries',
  },

  // Step 4: Worked example - Midday Temperature
  {
    id: '16.2-step-4',
    subtopicId: '16.2',
    title: 'Worked Example: Temperatures',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Midday temperatures from Monday to Sunday: 24, 26, 25, 29, 31, 30, 27 °C.',
      'Plot each point accurately above its day and join them with straight lines.',
    ],
    keyTerms: ['Midday Temperatures', 'Day vs Temperature (°C)'],
    componentKey: 'worked_example_temp',
    data: {
      points: [
        { timeLabel: 'Mon', value: 24 },
        { timeLabel: 'Tue', value: 26 },
        { timeLabel: 'Wed', value: 25 },
        { timeLabel: 'Thu', value: 29 },
        { timeLabel: 'Fri', value: 31 },
        { timeLabel: 'Sat', value: 30 },
        { timeLabel: 'Sun', value: 27 },
      ],
    },
  },

  // Step 5: Reading values from the graph
  {
    id: '16.2-step-5',
    subtopicId: '16.2',
    title: 'Reading Values with Guide Lines',
    cambridgeCodes: ['8Ss.03'],
    type: 'interactive',
    sentences: [
      'Draw a vertical guide line from the day to the plotted point.',
      'Draw a horizontal guide line from the point to the vertical axis to read the value.',
    ],
    keyTerms: ['Vertical Guide Line', 'Horizontal Guide Line'],
    componentKey: 'reading_timeseries',
  },

  // Step 6: Describing the trend (Town population)
  {
    id: '16.2-step-6',
    subtopicId: '16.2',
    title: 'Describing Trends',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'A trend describes the general direction of data: increasing, decreasing, or constant.',
      'The town population rose from 40 000 in 2018 to 54 000 in 2022, showing an upward trend.',
    ],
    keyTerms: ['Increasing Trend', 'General Direction'],
    componentKey: 'trend_population',
    data: {
      points: [
        { timeLabel: '2018', value: 40 },
        { timeLabel: '2019', value: 42 },
        { timeLabel: '2020', value: 45 },
        { timeLabel: '2021', value: 49 },
        { timeLabel: '2022', value: 54 },
      ],
    },
  },

  // Step 7: Seasonal pattern (Ice cream sales)
  {
    id: '16.2-step-7',
    subtopicId: '16.2',
    title: 'Seasonal Pattern',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'A seasonal pattern is a repeating cycle during regular periods such as months or seasons.',
      'Ice cream sales peak in the warmer summer months and drop in the colder winter months.',
    ],
    keyTerms: ['Seasonal Pattern', 'Repeating Cycle'],
    componentKey: 'seasonal_icecream',
    data: {
      points: [
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
      ],
    },
  },

  // Step 8: Time series vs Ordinary line graph
  {
    id: '16.2-step-8',
    subtopicId: '16.2',
    title: 'Time Series vs Line Graph',
    cambridgeCodes: ['8Ss.03'],
    type: 'comparison',
    sentences: [
      'A time series graph always has time on the horizontal axis.',
      'An ordinary line graph can show any two connected quantities, such as distance against time.',
    ],
    keyTerms: ['Time Series: Always Time', 'Line Graph: Any Two Quantities'],
    componentKey: 'timeseries_vs_linegraph',
  },

  // Step 9: Common mistakes
  {
    id: '16.2-step-9',
    subtopicId: '16.2',
    title: 'Common Mistakes',
    cambridgeCodes: ['8Ss.03'],
    type: 'common-mistake',
    sentences: [
      'Placing time on the vertical axis instead of the horizontal axis.',
      'Joining points out of order or using uneven time intervals along the axis.',
    ],
    keyTerms: ['Uneven Intervals', 'Wrong Axis Order'],
    componentKey: 'mistakes_16_2',
  },

  // Step 10: Vocabulary
  {
    id: '16.2-step-10',
    subtopicId: '16.2',
    title: 'Key Vocabulary',
    cambridgeCodes: ['8Ss.03'],
    type: 'vocabulary',
    sentences: [
      'A trend is the general direction over time.',
      'Time series graphs plot values chronologically across equal intervals.',
    ],
    keyTerms: [
      'Time series graph',
      'Trend',
      'Increasing',
      'Decreasing',
      'Constant',
      'Pattern',
      'Interval',
      'Estimate',
    ],
    componentKey: 'vocabulary_16_2',
  },

  // --- PRACTICE SCREENS ---
  // Q1
  {
    id: '16.2-p-1',
    subtopicId: '16.2',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 1,
    type: 'practice',
    sentences: [
      'Look at the midday temperature graph.',
      'What was the temperature on Thursday?',
    ],
    componentKey: 'p_16_2_q1',
  },
  // Q2
  {
    id: '16.2-p-2',
    subtopicId: '16.2',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 2,
    type: 'practice',
    sentences: [
      'On which day was it hottest?',
      'Write down the temperature on that day.',
    ],
    componentKey: 'p_16_2_q2',
  },
  // Q3
  {
    id: '16.2-p-3',
    subtopicId: '16.2',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 3,
    type: 'practice',
    sentences: [
      'Look at the town population graph from 2018 to 2022.',
      'Describe the trend in one full sentence.',
    ],
    componentKey: 'p_16_2_q3',
  },
  // Q4
  {
    id: '16.2-p-4',
    subtopicId: '16.2',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 4,
    type: 'practice',
    sentences: [
      'Museum visitors (hundreds) Jan to Jun: Jan 12, Feb 15, Mar 18, Apr 17, May 22, Jun 26.',
      'Draw a time series graph to display the data.',
    ],
    componentKey: 'p_16_2_q4',
  },
  // Q5
  {
    id: '16.2-p-5',
    subtopicId: '16.2',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 5,
    type: 'practice',
    sentences: [
      'Look at the ice cream sales graph.',
      'Describe the pattern during the year and give a reason for it.',
    ],
    componentKey: 'p_16_2_q5',
  },
  // Q6
  {
    id: '16.2-p-6',
    subtopicId: '16.2',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 6,
    type: 'practice',
    sentences: [
      'Using the museum visitors data (12, 15, 18, 17, 22, 26):',
      'Between which two consecutive months was the increase the greatest?',
    ],
    componentKey: 'p_16_2_q6',
  },
  // Q7
  {
    id: '16.2-p-7',
    subtopicId: '16.2',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 7,
    type: 'practice',
    sentences: [
      'Two time series graphs show the SAME data. One starts at 0 and the other starts at 100 with a stretched scale.',
      'Explain why they give different impressions.',
    ],
    componentKey: 'p_16_2_q7',
  },
  // Q8
  {
    id: '16.2-p-8',
    subtopicId: '16.2',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 8,
    type: 'practice',
    sentences: [
      'Use the town population trend (2018: 40k, 2019: 42k, 2020: 45k, 2021: 49k, 2022: 54k) to estimate the population in 2023.',
      'Explain why your answer is only an estimate.',
    ],
    componentKey: 'p_16_2_q8',
  },
  // Q9
  {
    id: '16.2-p-9',
    subtopicId: '16.2',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 9,
    type: 'practice',
    sentences: [
      'Give one example of data that is suitable for a time series graph and one example that is not.',
      'Explain each choice.',
    ],
    componentKey: 'p_16_2_q9',
  },
];

export const subtopic16_2: SubtopicConfig = {
  id: '16.2',
  title: '16.2 Time series graphs',
  shortTitle: '16.2 Time series graphs',
  accentColor: '#0D9488',
  accentTailwind: 'teal',
  steps: steps16_2,
};
