// utils/formatDate.js
import { format } from 'date-fns';

/**
 * Formats a date to a readable string.
 * @param {Date | string} date - The date to format.
 * @param {string} [dateFormat='MMM d, yyyy'] - The format string.
 * @returns {string} - The formatted date string.
 */
export const formatDate = (date, dateFormat = 'MMM d, yyyy') => {
  if (!date) return '';
  
  // Parse the date if it's a string
  const parsedDate = typeof date === 'string' ? new Date(date) : date;

  // Format the date
  return format(parsedDate, dateFormat);
};
