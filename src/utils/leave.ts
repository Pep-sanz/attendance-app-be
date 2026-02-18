export const calculateLeaveDays = (start: Date, end: Date): number => {
  if (end < start) throw new Error("End date must be after start date");

  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor((end.getTime() - start.getTime()) / oneDay) + 1;
};
