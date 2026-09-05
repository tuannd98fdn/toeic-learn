export const LEITNER_INTERVALS = {
  1: 1,      // Box 1: 1 day
  2: 3,      // Box 2: 3 days
  3: 7,      // Box 3: 7 days
  4: 14,     // Box 4: 14 days
  5: 30,     // Box 5: 30 days
};

export const MAX_BOX = 5;
export const MIN_BOX = 1;

/**
 * Calculates the next review date based on the current box level.
 * @param box The current Leitner box level (1-5)
 * @returns ISO string of the next review date
 */
export const calculateNextReviewDate = (box: number): string => {
  const daysToAdd = LEITNER_INTERVALS[box as keyof typeof LEITNER_INTERVALS] || 1;
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  // Reset time to start of day for consistency
  date.setHours(0, 0, 0, 0);
  return date.toISOString();
};

/**
 * Checks if a word is due for review today or in the past.
 * @param nextReviewDate ISO string of the next review date
 * @returns boolean indicating if the word is due
 */
export const isDueForReview = (nextReviewDate: string): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const reviewDate = new Date(nextReviewDate);
  return reviewDate <= today;
};
