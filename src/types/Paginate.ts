export interface Paginate<T extends any> {
  items: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export const hasMoreData = <T extends any>(meta: Paginate<T>["meta"]) =>
  meta.totalPages > meta.currentPage;
