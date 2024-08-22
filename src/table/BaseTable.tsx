import React, { forwardRef, useRef } from 'react';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import cx from 'classnames';

import { StyledProps } from '../common';
import useClassName from './hooks/useClassName';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useDefaultProps from '../hooks/useDefaultProps';
import defaultConfig from '../_common/js/global-config/mobile/locale/zh_CN';
import Loading from '../loading';
import { baseTableDefaultProps } from './defaultProps';

import type { TdBaseTableProps, BaseTableCol, TableRowData, BaseTableCellParams } from './type';

export type BaseTableProps = TdBaseTableProps & StyledProps;

export const BaseTable = forwardRef((props: BaseTableProps, ref: React.Ref<HTMLTableElement>) => {
  const {
    data,
    empty,
    height,
    loading,
    loadingProps,
    columns,
    bordered,
    maxHeight,
    tableLayout,
    showHeader,
    cellEmptyContent,
    className,
    style,
    onRowClick,
    onCellClick,
    onScroll,
  } = useDefaultProps<BaseTableProps>(props, baseTableDefaultProps);

  const { tableLayoutClasses, tableHeaderClasses, tableBaseClass, tdAlignClasses, tdEllipsisClass, classPrefix } =
    useClassName();

  const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props);

  const tableElmClasses = tableLayoutClasses[tableLayout || 'fixed'];

  const theadClasses = cx(tableHeaderClasses.header, {
    [tableHeaderClasses.fixed]: Boolean(maxHeight || height),
    [tableBaseClass.bordered]: bordered,
  });

  const ellipsisClasses = cx([`${classPrefix}-table__ellipsis`, `${classPrefix}-text-ellipsis`]);

  const defaultColWidth = tableLayout === 'fixed' ? '80px' : undefined;

  const tableContentRef = useRef();

  const tableElmRef = useRef();

  const theadRef = useRef();

  const colStyle = (colItem: BaseTableCol<TableRowData>) => ({
    width: `${formatCSSUnit(colItem.width || defaultColWidth)}`,
    minWidth: `${
      !formatCSSUnit(colItem.width || defaultColWidth) && !colItem.minWidth && tableLayout === 'fixed'
        ? '80px'
        : formatCSSUnit(colItem.minWidth)
    }`,
  });

  const thClassName = (thItem: BaseTableCol<TableRowData>) => {
    let className = '';
    if (thItem.colKey) {
      className = `${classPrefix}-table__th-${thItem.colKey}`;
    }
    if (thItem.ellipsisTitle || thItem.ellipsis) {
      className = `${className} ${tdEllipsisClass}`;
    }
    if (thItem.align && thItem.align !== 'left') {
      className = `${className} ${tdAlignClasses[`${thItem.align}`]}`;
    }
    return className;
  };

  const tdClassName = (tdItem: BaseTableCol<TableRowData>) => {
    let className = '';
    if (tdItem.ellipsis) {
      className = tdEllipsisClass;
    }
    if (tdItem.align && tdItem.align !== 'left') {
      className = `${className} ${tdAlignClasses[`${tdItem.align}`]}`;
    }
    return className;
  };

  const renderCell = (
    params: BaseTableCellParams<TableRowData>,
    cellEmptyContent?: TdBaseTableProps['cellEmptyContent'],
  ) => {
    const { col, row, rowIndex } = params;
    // support serial number column
    if (col.colKey === 'serial-number') {
      return rowIndex + 1;
    }

    if (isFunction(col.cell)) {
      return col.cell(params);
    }

    const r = get(row, col.colKey);
    // 0 和 false 属于正常可用值，不能使用兜底逻辑 cellEmptyContent
    if (![undefined, '', null].includes(r)) return r;

    // cellEmptyContent 作为空数据兜底显示，用户可自定义
    if (cellEmptyContent) {
      return isFunction(cellEmptyContent) ? cellEmptyContent(params) : cellEmptyContent;
    }
    return r;
  };

  const renderTitle = (thItem: BaseTableCol<TableRowData>, index: number) => {
    if (isFunction(thItem?.title)) {
      return thItem?.title({ col: thItem, colIndex: index });
    }
    return thItem?.title;
  };

  const handleRowClick = (row: TableRowData, rowIndex: number, e: React.MouseEvent) => {
    onRowClick?.({ row, index: rowIndex, e });
  };

  const handleCellClick = (row: TableRowData, col: any, rowIndex: number, colIndex: number, e: React.MouseEvent) => {
    if (col.stopPropagation) {
      e.stopPropagation();
    }
    onCellClick?.({ row, col, rowIndex, colIndex, e });
  };

  const renderTableBody = () => {
    const renderContentEmpty = empty || defaultConfig?.table?.empty;

    if (!data?.length && renderContentEmpty) {
      return (
        <tr className={tableBaseClass.emptyRow}>
          <td colSpan={columns?.length}>
            <div className={tableBaseClass.empty}>{renderContentEmpty}</div>
          </td>
        </tr>
      );
    }
    if (data?.length) {
      return data?.map((trItem, trIdx) => (
        <tr
          key={trIdx}
          onClick={(ev) => {
            handleRowClick(trItem, trIdx, ev);
          }}
        >
          {columns?.map((tdItem, tdIdx) => (
            <td
              key={tdIdx}
              className={tdClassName(tdItem)}
              onClick={($event) => {
                handleCellClick(trItem, tdItem, trIdx, tdIdx, $event);
              }}
            >
              <div className={tdItem.ellipsis && ellipsisClasses}>
                {renderCell({ row: trItem, col: tdItem, rowIndex: trIdx, colIndex: tdIdx }, cellEmptyContent)}
              </div>
            </td>
          ))}
        </tr>
      ));
    }
  };

  return (
    <div ref={ref} className={cx(tableClasses, className)} style={{ position: 'relative', ...style }}>
      <div
        ref={tableContentRef}
        className={tableBaseClass.content}
        style={tableContentStyles}
        onScroll={(e) => {
          onScroll?.({ e });
        }}
      >
        <table ref={tableElmRef} className={tableElmClasses} style={tableElementStyles}>
          <colgroup>{columns?.map((col) => <col key={col.colKey} style={colStyle(col)} />)}</colgroup>
          {showHeader && (
            <thead ref={theadRef} className={theadClasses}>
              <tr>
                {columns?.map((thItem, idx) => (
                  <th key={idx} className={thClassName(thItem)}>
                    <div className={(thItem.ellipsisTitle || thItem.ellipsis) && ellipsisClasses}>
                      {renderTitle(thItem, idx)}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className={tableBaseClass.body}>{renderTableBody()}</tbody>
        </table>
        {loading && (
          <div className={`${classPrefix}-table__loading--full`}>
            <Loading {...loadingProps} />
          </div>
        )}
      </div>
    </div>
  );
});
