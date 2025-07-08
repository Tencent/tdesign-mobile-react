import React, { forwardRef, useRef, useImperativeHandle } from 'react';
import { get, isFunction } from 'lodash-es';
import cx from 'classnames';

import parseTNode from '../_util/parseTNode';
import { ClassName } from '../common';
import useClassName from './hooks/useClassName';
import useStyle, { formatCSSUnit } from './hooks/useStyle';
import useFixed, { getRowFixedStyles, getColumnFixedStyles } from './hooks/useFixed';
import useDefaultProps from '../hooks/useDefaultProps';
import defaultConfig from '../_common/js/global-config/mobile/locale/zh_CN';
import Loading from '../loading';
import { baseTableDefaultProps } from './defaultProps';
import { BaseTableRef, BaseTableProps } from './interface';
import { formatClassNames, formatRowAttributes, formatRowClassNames } from './utils';

import type { TdBaseTableProps, BaseTableCol, TableRowData, BaseTableCellParams } from './type';

const BaseTable = forwardRef<BaseTableRef, BaseTableProps>((props, ref) => {
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

  const {
    tableLayoutClasses,
    tableHeaderClasses,
    tableBaseClass,
    tdAlignClasses,
    tdEllipsisClass,
    classPrefix,
    tableRowFixedClasses,
    tableColFixedClasses,
  } = useClassName();

  // 固定表头和固定列逻辑
  const {
    tableContentRef,
    rowAndColFixedPosition,
    isFixedColumn,
    isFixedHeader,
    showColumnShadow,
    refreshTable,
    updateColumnFixedShadow,
  } = useFixed(props);

  const { tableClasses, tableContentStyles, tableElementStyles } = useStyle(props, {
    isFixedColumn,
    isFixedHeader,
    showColumnShadow,
  });

  const tableRef = useRef<HTMLDivElement>(null);

  const tableElmClasses = tableLayoutClasses[tableLayout || 'fixed'];

  const theadClasses = cx(tableHeaderClasses.header, {
    [tableHeaderClasses.fixed]: Boolean(maxHeight || height),
    [tableBaseClass.bordered]: bordered,
  });

  const ellipsisClasses = cx([`${classPrefix}-table__ellipsis`, `${classPrefix}-text-ellipsis`]);

  const defaultColWidth = tableLayout === 'fixed' ? '80px' : undefined;

  const tableElmRef = useRef(null);

  const theadRef = useRef(null);

  const colStyle = (colItem: BaseTableCol<TableRowData>) => ({
    width: `${formatCSSUnit(colItem.width || defaultColWidth)}`,
    minWidth: `${
      !formatCSSUnit(colItem.width || defaultColWidth) && !colItem.minWidth && tableLayout === 'fixed'
        ? '80px'
        : formatCSSUnit(colItem.minWidth)
    }`,
  });

  const thClassName = (thItem: BaseTableCol<TableRowData>, extra: Array<ClassName>) => {
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
    return cx([className, ...extra]);
  };

  const tdClassName = (tdItem: BaseTableCol<TableRowData>, extra?: Array<ClassName>) => {
    let className = '';
    if (tdItem.ellipsis) {
      className = tdEllipsisClass;
    }
    if (tdItem.align && tdItem.align !== 'left') {
      className = `${className} ${tdAlignClasses[`${tdItem.align}`]}`;
    }
    return cx([className, ...extra]);
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

  const handleRowClick = (row: TableRowData, rowIndex: number, e: React.MouseEvent<HTMLTableRowElement>) => {
    onRowClick?.({ row, index: rowIndex, e });
  };

  const handleCellClick = (
    row: TableRowData,
    col: any,
    rowIndex: number,
    colIndex: number,
    e: React.MouseEvent<HTMLTableCellElement>,
  ) => {
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
            <div className={tableBaseClass.empty}>{parseTNode(renderContentEmpty)}</div>
          </td>
        </tr>
      );
    }
    if (data?.length) {
      return data?.map((trItem, trIdx) => {
        const trStyles = getRowFixedStyles(
          get(trItem, props.rowKey || 'id'),
          trIdx,
          props.data?.length || 0,
          props.fixedRows,
          rowAndColFixedPosition,
          tableRowFixedClasses,
        );

        const customClasses = formatRowClassNames(
          props.rowClassName,
          { row: trItem, rowKey: props.rowKey, rowIndex: trIdx, type: 'body' },
          props.rowKey || 'id',
        );

        const trAttributes =
          formatRowAttributes(props.rowAttributes, { row: trItem, rowIndex: trIdx, type: 'body' }) || {};

        return (
          <tr
            {...trAttributes}
            key={trIdx}
            style={trStyles.style}
            className={cx([trStyles.classes, customClasses, trAttributes.class])}
            onClick={(ev) => {
              handleRowClick(trItem, trIdx, ev);
            }}
          >
            {columns?.map((tdItem, tdIdx) => {
              const tdStyles = getColumnFixedStyles(tdItem, tdIdx, rowAndColFixedPosition, tableColFixedClasses);
              const customClasses = formatClassNames(tdItem.className, {
                col: tdItem,
                colIndex: tdIdx,
                row: tdItem,
                rowIndex: tdIdx,
                type: 'td',
              });
              return (
                <td
                  key={tdIdx}
                  style={tdStyles.style}
                  className={tdClassName(tdItem, [tdStyles.classes, customClasses])}
                  onClick={($event) => {
                    handleCellClick(trItem, tdItem, trIdx, tdIdx, $event);
                  }}
                >
                  <div className={tdItem.ellipsis && ellipsisClasses}>
                    {renderCell({ row: trItem, col: tdItem, rowIndex: trIdx, colIndex: tdIdx }, cellEmptyContent)}
                  </div>
                </td>
              );
            })}
          </tr>
        );
      });
    }
  };

  const onInnerVirtualScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    updateColumnFixedShadow(target);

    onScroll?.({ e });
  };

  useImperativeHandle(ref, () => ({
    tableElement: tableRef.current,
    tableHtmlElement: tableElmRef.current,
    tableContentElement: tableContentRef.current,
    refreshTable,
  }));

  return (
    <div ref={tableRef} className={cx(tableClasses, className)} style={{ position: 'relative', ...style }}>
      <div
        ref={tableContentRef}
        className={tableBaseClass.content}
        style={tableContentStyles}
        onScroll={onInnerVirtualScroll}
      >
        <table ref={tableElmRef} className={tableElmClasses} style={tableElementStyles}>
          <colgroup>
            {columns?.map((col) => (
              <col key={col.colKey} style={colStyle(col)} />
            ))}
          </colgroup>
          {showHeader && (
            <thead ref={theadRef} className={theadClasses}>
              <tr>
                {columns?.map((thItem, idx) => {
                  const thStyles = getColumnFixedStyles(thItem, idx, rowAndColFixedPosition, tableColFixedClasses);
                  const customClasses = formatClassNames(thItem.className, {
                    col: thItem,
                    colIndex: idx,
                    row: {},
                    rowIndex: -1,
                    type: 'th',
                  });
                  return (
                    <th
                      key={idx}
                      className={thClassName(thItem, [thStyles.classes, customClasses])}
                      style={thStyles.style}
                    >
                      <div className={(thItem.ellipsisTitle || thItem.ellipsis) && ellipsisClasses}>
                        {renderTitle(thItem, idx)}
                      </div>
                    </th>
                  );
                })}
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

BaseTable.displayName = 'BaseTable';

export default BaseTable;
