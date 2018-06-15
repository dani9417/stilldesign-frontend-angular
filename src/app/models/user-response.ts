import { User } from "./user";

export interface UserResponse {
  data: User[];
  meta: {
    pagination: Pagination;
  };
}

export interface Pagination {
  count: number;
  currentPage: number;
  links: {
    previous?: string;
    next?: string;
  };
  perPage: number;
  total: number;
  totalPages: number;
}
