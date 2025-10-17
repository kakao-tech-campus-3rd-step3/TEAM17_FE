export const formatNumberInput = (input: string): string => {
  const numeric = input.replace(/[^0-9]/g, '');

  const value = Number(numeric);

  if (isNaN(value) || value < 0) return '';

  return value.toLocaleString('ko-KR');
};

export const parseNumberInput = (formatted: string): number => {
  const value = Number(formatted.replace(/,/g, ''));
  return isNaN(value) ? 0 : value;
};
