export const paginationNumbers = (
  currentPage: number,
  totalPages: number,
  range: number = 2
) => {
  let startingPosition = Math.max(currentPage - range, 1);
  return Array.from({ length: range * 2 + 1 }, (_, i) => {
    return i + startingPosition;
  }).filter((num) => num <= totalPages);
};
