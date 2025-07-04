import cx from 'classnames';
import useClassName from './useClassName';

import type { TdBaseTableProps } from '../type';

export function formatCSSUnit(unit: string | number | undefined) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

export default function useStyle(
  props: TdBaseTableProps,
  {
    isFixedHeader,
    isFixedColumn,
  }: {
    isFixedHeader?: boolean;
    isFixedColumn?: boolean;
  },
) {
  const { bordered, stripe, verticalAlign, height, maxHeight, tableContentWidth, loading } = props;

  const { tableBaseClass, tableAlignClasses } = useClassName();

  const tableClasses = cx([
    tableBaseClass.table,
    [tableAlignClasses[verticalAlign || 'middle']],
    {
      [tableBaseClass.bordered]: bordered,
      [tableBaseClass.striped]: stripe,
      [tableBaseClass.loading]: loading,
      [tableBaseClass.headerFixed]: isFixedHeader,
      [tableBaseClass.columnFixed]: isFixedColumn,
    },
  ]);

  const tableContentStyles: React.CSSProperties = {
    height: formatCSSUnit(height),
    maxHeight: formatCSSUnit(maxHeight),
  };

  const tableElementStyles: React.CSSProperties = {
    width: formatCSSUnit(tableContentWidth),
  };

  return {
    tableClasses,
    tableElementStyles,
    tableContentStyles,
  };
}
