export class Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

//T permite paginar qualquer coisa evento/palestrante...
export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
