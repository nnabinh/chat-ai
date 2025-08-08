/**
 * Formats numbers into a more readable format with k/M suffixes
 * @param num - The number to format
 * @returns Formatted string (e.g., 2000 -> "2k", 34200 -> "34.2k")
 */
export const formatNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  }

  if (num < 1000000) {
    // Format thousands
    const thousands = num / 1000;

    // If it's a whole number of thousands, show without decimal
    if (thousands % 1 === 0) {
      return `${thousands}k`;
    }

    // If it has decimal places, show one decimal place
    return `${thousands.toFixed(1)}k`;
  }

  if (num < 1000000000) {
    // Format millions
    const millions = num / 1000000;

    // If it's a whole number of millions, show without decimal
    if (millions % 1 === 0) {
      return `${millions}M`;
    }

    // If it has decimal places, show one decimal place
    return `${millions.toFixed(1)}M`;
  }

  // For very large numbers, format as billions
  const billions = num / 1000000000;
  if (billions % 1 === 0) {
    return `${billions}B`;
  }
  return `${billions.toFixed(1)}B`;
};
