/**
 * 该文件为脚本自动生成文件，请勿随意修改。如需修改请联系 PMC
 * */

import { TdBaseTableProps, TdPrimaryTableProps } from './type';

export const baseTableDefaultProps: TdBaseTableProps = {
  bordered: false,
  columns: [],
  data: [],
  empty: '',
  loading: undefined,
  rowKey: 'id',
  showHeader: true,
  stripe: false,
  tableLayout: 'fixed',
  verticalAlign: 'middle',
};

export const primaryTableDefaultProps: Pick<
  TdPrimaryTableProps,
  | 'columns'
  | 'expandIcon'
  | 'defaultExpandedRowKeys'
  | 'loadingMode'
  | 'multipleSort'
  | 'reserveSelectedRowOnPaginate'
  | 'defaultSelectedRowKeys'
  | 'showSortColumnBgColor'
> = {
  columns: [],
  expandIcon: true,
  defaultExpandedRowKeys: [],
  loadingMode: 'pull-refresh',
  multipleSort: false,
  reserveSelectedRowOnPaginate: true,
  defaultSelectedRowKeys: [],
  showSortColumnBgColor: false,
};
