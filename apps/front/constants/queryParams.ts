export const sortOrderValues = ['ASC', 'DESC'] as const;
export type SortOrderType = (typeof sortOrderValues)[number];
