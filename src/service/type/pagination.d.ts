export type Pagination<T> = {
  data: T[];
  next: number | null;
};
