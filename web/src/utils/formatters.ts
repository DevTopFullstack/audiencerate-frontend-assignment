export const formatNumber = (num: number | string): string => {
  if (num === null || num === undefined) return '0';

  const n = typeof num === 'string' ? parseFloat(num) : num;

  if (isNaN(n)) return '0';

  //  (M)
  if (n >= 1_000_000) {
    return (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  // (K)
  if (n >= 1_000) {
    return (n / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
  }

  return n.toLocaleString('en-US');
};

// percent
export const formatPercent = (num: number | string): string => {
  const n = typeof num === 'string' ? parseFloat(num) : num;
  if (isNaN(n)) return '0%';
  return n.toFixed(0) + '%';
};