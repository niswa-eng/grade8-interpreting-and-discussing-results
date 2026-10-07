import { StepItem, SubtopicConfig } from '../types';

export const steps16_5: StepItem[] = [
  // Step 1: Learning objectives
  {
    id: '16.5-step-1',
    subtopicId: '16.5',
    title: 'Learning Objectives',
    cambridgeCodes: ['8Ss.03', '8Ss.05'],
    type: 'objective',
    sentences: [
      'Select and construct appropriate statistical representations for different data types.',
      'Investigate correlation, understand sampling variation, and evaluate predictions.',
    ],
    keyTerms: ['Data Displays', 'Correlation', 'Sampling Variation', 'Hypothesis Testing'],
    componentKey: 'objectives_16_5',
  },

  // Step 2: Choosing a representation
  {
    id: '16.5-step-2',
    subtopicId: '16.5',
    title: 'Choosing a Representation',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'The data type (discrete or continuous) and your purpose determine the best display.',
      'Use tables to organise raw counts, and graphs to reveal comparisons or trends.',
    ],
    keyTerms: ['Discrete vs Continuous', 'Purpose of Display'],
    componentKey: 'choosing_representation',
  },

  // Step 3: Tally chart and frequency table
  {
    id: '16.5-step-3',
    subtopicId: '16.5',
    title: 'Tally Charts & Frequency Tables',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'Tally marks are recorded in groups of five with a diagonal line through four uprights.',
      'Count the tallies into the frequency column and sum them to find the total.',
    ],
    keyTerms: ['Groups of 5', 'Frequency Column', 'Total Sum'],
    componentKey: 'tally_chart_step',
  },

  // Step 4: Venn diagram
  {
    id: '16.5-step-4',
    subtopicId: '16.5',
    title: 'Venn Diagram: Two Criteria',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      '30 students: 18 like football, 14 like basketball, 6 like both.',
      'Football only = 12, Basketball only = 8, Both = 6, Neither = 4 (Total = 30).',
    ],
    keyTerms: ['Overlap: Both (6)', 'Outside: Neither (4)', 'Total: 30'],
    componentKey: 'venn_diagram_step',
  },

  // Step 5: Carroll diagram
  {
    id: '16.5-step-5',
    subtopicId: '16.5',
    title: 'Carroll Diagram',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'A Carroll diagram sorts data into yes/no categories using a two-by-two grid.',
      'Numbers 1 to 12 sorted by Even / Odd and Multiple of 3 / Not Multiple of 3.',
    ],
    keyTerms: ['2 × 2 Grid', 'Mutually Exclusive Cells'],
    componentKey: 'carroll_diagram_step',
  },

  // Step 6: Two-way table
  {
    id: '16.5-step-6',
    subtopicId: '16.5',
    title: 'Two-Way Table',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'A two-way table shows frequencies for two categorical variables with row and column totals.',
      'Total left-handed = 7, total right-handed = 33, overall total = 40 students.',
    ],
    keyTerms: ['Row Totals', 'Column Totals', 'Grand Total = 40'],
    componentKey: 'twoway_table_step',
  },

  // Step 7: Dual and compound bar charts
  {
    id: '16.5-step-7',
    subtopicId: '16.5',
    title: 'Dual and Compound Bar Charts',
    cambridgeCodes: ['8Ss.03'],
    type: 'comparison',
    sentences: [
      'A dual bar chart places two series side-by-side to compare separate groups directly.',
      'A compound bar chart stacks parts into one bar to display the components and the total.',
    ],
    keyTerms: ['Dual: Side-by-side', 'Compound: Stacked total'],
    componentKey: 'dual_vs_compound_step',
  },

  // Step 8: Quick revision panel
  {
    id: '16.5-step-8',
    subtopicId: '16.5',
    title: 'Quick Revision of Displays',
    cambridgeCodes: ['8Ss.03'],
    type: 'concept',
    sentences: [
      'Review the key purpose of each statistical display.',
      'Match the data characteristics to the most informative visual representation.',
    ],
    keyTerms: ['Frequency Diagram', 'Time Series', 'Pie Chart', 'Stem-and-Leaf', 'Scatter Graph'],
    componentKey: 'quick_revision_step',
  },

  // Step 9: Scatter graph
  {
    id: '16.5-step-9',
    subtopicId: '16.5',
    title: 'Scatter Graphs',
    cambridgeCodes: ['8Ss.03'],
    type: 'worked-example',
    sentences: [
      'A scatter graph plots pairs of numerical values to check for a relationship.',
      'Each student is plotted as a single coordinate point (study hours, test score).',
    ],
    keyTerms: ['Paired Coordinates', 'Relationship Investigation'],
    componentKey: 'scatter_graph_step',
  },

  // Step 10: Correlation (positive, negative, none)
  {
    id: '16.5-step-10',
    subtopicId: '16.5',
    title: 'Correlation Types',
    cambridgeCodes: ['8Ss.03'],
    type: 'interactive',
    sentences: [
      'Positive: both values increase together (study time and score).',
      'Negative: one value increases while the other decreases (car age and price).',
    ],
    keyTerms: ['Positive Correlation', 'Negative Correlation', 'No Correlation'],
    componentKey: 'correlation_interactive_step',
  },

  // Step 11: Sampling and variation (8Ss.05)
  {
    id: '16.5-step-11',
    subtopicId: '16.5',
    title: 'Sampling and Variation',
    cambridgeCodes: ['8Ss.05'],
    type: 'interactive',
    sentences: [
      'A population is the entire group; a sample is a smaller part chosen to represent it.',
      'Different random samples produce different results because of natural sampling variation.',
    ],
    keyTerms: ['Population vs Sample', 'Sampling Variation', 'Fair Representation'],
    componentKey: 'sampling_simulation_step',
  },

  // Step 12: Checking predictions (8Ss.05)
  {
    id: '16.5-step-12',
    subtopicId: '16.5',
    title: 'Checking Predictions',
    cambridgeCodes: ['8Ss.05'],
    type: 'worked-example',
    sentences: [
      'Prediction: "Taller students have longer arm spans."',
      'The scatter graph reveals a strong positive correlation, supporting the prediction.',
    ],
    keyTerms: ['Prediction', 'Data Evidence', 'Conclusion'],
    componentKey: 'prediction_checking_step',
  },

  // Step 13: Sentence frames
  {
    id: '16.5-step-13',
    subtopicId: '16.5',
    title: 'Interpreting & Concluding',
    cambridgeCodes: ['8Ss.05'],
    type: 'concept',
    sentences: [
      'Use structured reasoning to explain conclusions with evidence.',
      'Always refer to the trend, correlation, and reliability of the sample.',
    ],
    sentenceFrames: [
      'The graph shows that as ... increases, the ... also increases.',
      'There is positive correlation between ... and ..., which supports the prediction.',
      'The sample may be biased because ..., so the conclusion is not reliable.',
    ],
    componentKey: 'sentence_frames_step',
  },

  // Step 14: Vocabulary
  {
    id: '16.5-step-14',
    subtopicId: '16.5',
    title: 'Key Vocabulary',
    cambridgeCodes: ['8Ss.03', '8Ss.05'],
    type: 'vocabulary',
    sentences: [
      'Statistical displays organise data to communicate patterns clearly.',
      'A fair sample must represent the entire population without bias.',
    ],
    keyTerms: [
      'Tally chart',
      'Venn diagram',
      'Carroll diagram',
      'Two-way table',
      'Dual bar chart',
      'Compound bar chart',
      'Scatter graph',
      'Correlation',
      'Population',
      'Sample',
      'Variation',
      'Prediction',
    ],
    componentKey: 'vocabulary_16_5',
  },

  // --- PRACTICE SCREENS ---
  // Q1
  {
    id: '16.5-p-1',
    subtopicId: '16.5',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 1,
    type: 'practice',
    sentences: [
      'Choose the best display for each scenario:',
      '(a) A town population changing over 10 years  (b) Proportion of votes for candidates  (c) Height versus arm span',
    ],
    componentKey: 'p_16_5_q1',
  },
  // Q2
  {
    id: '16.5-p-2',
    subtopicId: '16.5',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 2,
    type: 'practice',
    sentences: [
      'Complete the frequency table from these tallies: Red 9, Blue 8, Green 3.',
      'Work out the total number of items.',
    ],
    componentKey: 'p_16_5_q2',
  },
  // Q3
  {
    id: '16.5-p-3',
    subtopicId: '16.5',
    title: 'Practice: Level 1 Basic',
    practiceLevel: 'basic',
    questionNumber: 3,
    type: 'practice',
    sentences: [
      'Look at the Venn diagram of 30 students (Football 18, Basketball 14, Both 6).',
      'How many students like both sports? How many students like neither sport?',
    ],
    componentKey: 'p_16_5_q3',
  },
  // Q4
  {
    id: '16.5-p-4',
    subtopicId: '16.5',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 4,
    type: 'practice',
    sentences: [
      'Complete the two-way table for 40 students:',
      'Boys: 3 left-handed, 17 right-handed. Girls: 4 left-handed, right-handed unknown, total girls 20.',
    ],
    componentKey: 'p_16_5_q4',
  },
  // Q5
  {
    id: '16.5-p-5',
    subtopicId: '16.5',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 5,
    type: 'practice',
    sentences: [
      'A scatter graph of 8 points shows the age of a car against its market value.',
      'Describe the correlation and explain what it means in this context.',
    ],
    componentKey: 'p_16_5_q5',
  },
  // Q6
  {
    id: '16.5-p-6',
    subtopicId: '16.5',
    title: 'Practice: Level 2 Medium',
    practiceLevel: 'medium',
    questionNumber: 6,
    type: 'practice',
    sentences: [
      'A teacher wants to compare the number of boys and girls in Years 7, 8 and 9 and also show the total in each year.',
      'Which chart should she use? Explain your choice.',
    ],
    componentKey: 'p_16_5_q6',
  },
  // Q7
  {
    id: '16.5-p-7',
    subtopicId: '16.5',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 7,
    type: 'practice',
    sentences: [
      'Mia asks 10 students in the football club what their favourite sport is and says: "Most students in our school prefer football."',
      'Explain why this conclusion is not reliable and suggest a better way to collect data.',
    ],
    componentKey: 'p_16_5_q7',
  },
  // Q8
  {
    id: '16.5-p-8',
    subtopicId: '16.5',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 8,
    type: 'practice',
    sentences: [
      'Two random samples of 20 students from the same school give 8 and 12 students who walk to school.',
      'Explain why the two sample results are different.',
    ],
    componentKey: 'p_16_5_q8',
  },
  // Q9
  {
    id: '16.5-p-9',
    subtopicId: '16.5',
    title: 'Practice: Level 3 Challenge',
    practiceLevel: 'challenge',
    questionNumber: 9,
    type: 'practice',
    sentences: [
      'Dan predicts that students who sleep more get higher test scores.',
      'Describe how Dan could collect data to check his prediction and state which graph he should draw.',
    ],
    componentKey: 'p_16_5_q9',
  },
];

export const subtopic16_5: SubtopicConfig = {
  id: '16.5',
  title: '16.5 Representing data',
  shortTitle: '16.5 Representing data',
  accentColor: '#7C3AED',
  accentTailwind: 'purple',
  steps: steps16_5,
};
