export function truncateText(str: string, max: number): string {
  if (typeof str === 'string' && str.length > max) {
    const truncateString = str.substring(0, max - 3) + '...';
    return truncateString;
  } else {
    return str;
  }
}

export function getFullYear(str: string): number | null {
  const fullYear = new Date(str).getFullYear();

  const checkNaN = isNaN(fullYear) ? null : fullYear;

  return checkNaN;
}
