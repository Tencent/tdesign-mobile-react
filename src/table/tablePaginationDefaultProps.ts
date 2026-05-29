import { PaginationProps } from 'tdesign-mobile-react/table/type';

export const tablePaginationDefaultProps: PaginationProps = {
  defaultCurrent: 1,
  foldedMaxPageBtn: 5,
  maxPageBtn: 10,
  pageEllipsisMode: 'mid',
  defaultPageSize: 10,
  pageSizeOptions: [5, 10, 20, 50],
  showFirstAndLastPageBtn: false,
  showJumper: false,
  showPageNumber: true,
  showPageSize: true,
  showPreviousAndNextBtn: true,
  size: 'medium',
  theme: 'default',
  total: 0,
  totalContent: true,
};
