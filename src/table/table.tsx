import React, { CSSProperties, forwardRef, useMemo } from 'react';
import useDefaultProps from 'tdesign-mobile-react/hooks/useDefaultProps';
import Loading, { TdLoadingProps } from 'tdesign-mobile-react/loading';
import cls from 'classnames';
import useConfig from 'tdesign-mobile-react/_util/useConfig';
import isFunction from 'lodash/isFunction';
import get from 'lodash/get';
import { BaseTableCellParams, TableRowData, TdBaseTableProps } from './type';
import useClassName from './useClassNames';

export function formatCSSUnit(unit: string | number | undefined) {
  if (!unit) return unit;
  return isNaN(Number(unit)) ? unit : `${unit}px`;
}

const defaultProps: TdBaseTableProps = {
  columns: [],
  data: [],
  empty: '',
  loading: undefined,
  rowKey: 'id',
  showHeader: true,
  tableContentWidth: '',
  tableLayout: 'fixed',
  verticalAlign: 'middle',
};

const BaseTable = forwardRef<HTMLElement, TdBaseTableProps>((props, ref) => {
  const {
    loadingProps,
    bordered,
    maxHeight,
    tableLayout,
    stripe,
    loading,
    verticalAlign,
    height,
    tableContentWidth,
    cellEmptyContent,
    empty,
    columns,
    showHeader,
    data,
  } = useDefaultProps(props, defaultProps);
  const defaultLoadingContent = useMemo(() => <Loading {...(loadingProps as TdLoadingProps)} />, [loadingProps]);
  const { tableBaseClass, tableHeaderClasses, tableAlignClasses, tableLayoutClasses, tdEllipsisClass, tdAlignClasses } =
    useClassName();
  const { classPrefix } = useConfig();
  // const name = useMemo(() => `${classPrefix}-table`, [classPrefix]);

  const tableClasses = useMemo(
    () =>
      cls([
        tableBaseClass.table,
        tableAlignClasses[verticalAlign] || 'middle',
        {
          [tableBaseClass.bordered]: bordered,
          [tableBaseClass.striped]: stripe,
          [tableBaseClass.loading]: loading,
        },
      ]),
    [tableAlignClasses, tableBaseClass, bordered, stripe, loading, verticalAlign],
  );

  const tableContentStyles: CSSProperties = useMemo(
    () => ({
      height: formatCSSUnit(height),
      maxHeight: formatCSSUnit(maxHeight),
    }),
    [height, maxHeight],
  );

  const tableElementStyles: CSSProperties = useMemo(
    () => ({ width: formatCSSUnit(tableContentWidth) }),
    [tableContentWidth],
  );

  const defaultColWidth = tableLayout === 'fixed' ? '80px' : undefined;

  const theadClasses = useMemo(
    () =>
      cls([
        tableHeaderClasses.header,
        {
          // todo(zwkang): 这里的 boolean 判断
          [tableHeaderClasses.fixed]: Boolean(maxHeight || height),
          [tableBaseClass.bordered]: bordered,
        },
      ]),
    [height, maxHeight, bordered, tableHeaderClasses.header, tableHeaderClasses.fixed, tableBaseClass.bordered],
  );

  const tbodyClasses = useMemo(() => cls([tableBaseClass.body]), [tableBaseClass.body]);
  const ellipsisClasses = useMemo(
    () => cls([`${classPrefix}-table__ellipsis`, `${classPrefix}-text-ellipsis`]),
    [classPrefix],
  );

  const handleRowClick = (row: TableRowData, rowIndex: number, e: MouseEvent) => {
    props.onRowClick?.({ row, index: rowIndex, e });
  };

  const handleCellClick = (row: TableRowData, col: any, rowIndex: number, colIndex: number, e: MouseEvent) => {
    props.onCellClick?.({ row, col, rowIndex, colIndex, e });
  };

  const dynamicBaseTableClasses = useMemo(() => cls([tableClasses]), [tableClasses]);

  const tableElmClasses = useMemo(() => cls([tableLayoutClasses[tableLayout || 'fixed']]), []);
  // const internalInstance = getCurrentInstance();
  const renderContentEmpty = useMemo(() => empty ?? null, [empty]);
  // const renderCellEmptyContent = computed(() => renderTNode(internalInstance, 'cellEmptyContent'));
  const renderCellEmptyContent = useMemo(() => cellEmptyContent ?? null, [cellEmptyContent]);

  const renderCell = (
    params: BaseTableCellParams<TableRowData>,
    cellEmptyContent?: TdBaseTableProps['cellEmptyContent'],
  ) => {
    const { col, row, rowIndex } = params;
    if (col.colKey === 'serial-number') {
      return rowIndex + 1;
    }
    if (isFunction(col.cell)) {
      // return col.cell(h, params);
      return col.cell(params);
    }
    // todo 逻辑待补全
    // if (context.slots[col.colKey]) {
    // return context.slots[col.colKey](params);
    // }

    // if (isString(col.cell) && context.slots?.[col.cell]) {
    //   return context.slots[col.cell](params);
    // }
    const r = get(row, col.colKey);
    // 0 和 false 属于正常可用值，不能使用兜底逻辑 cellEmptyContent
    if (![undefined, '', null].includes(r)) return r;

    // cellEmptyContent 作为空数据兜底显示，用户可自定义
    if (cellEmptyContent) {
      return isFunction(cellEmptyContent) ? cellEmptyContent(params) : cellEmptyContent;
    }
    return r;
  };

  const loadingClasses = useMemo(() => cls([`${classPrefix}-table__loading--full`]), [classPrefix]);
  const loadingContent = useMemo(() => loading ?? defaultLoadingContent ?? null, [loading, defaultLoadingContent]);
  // todo(zwkang): fix event type
  const onInnerVirtualScroll = (e: any) => {
    props.onScroll?.({ e });
  };

  const cols = columns.map((colItem) => (
    <col
      key={colItem.colKey}
      style={{
        width: `${formatCSSUnit(colItem.width || defaultColWidth)}`,
        minWidth: `${
          !formatCSSUnit(colItem.width || defaultColWidth) && !colItem.minWidth && tableLayout === 'fixed'
            ? '80px'
            : formatCSSUnit(colItem.minWidth)
        }`,
      }}
    />
  ));

  const header = showHeader ? (
    <thead className={theadClasses}>
      <tr>
        {columns.map((itemTh, indexTh) => (
          <th
            key={indexTh}
            className={cls({
              [`${classPrefix}-table__th-${itemTh.colKey}`]: itemTh.colKey,
              [tdEllipsisClass]: itemTh.ellipsisTitle || itemTh.ellipsis,
              [tdAlignClasses[`${itemTh.align}`]]: itemTh.align && itemTh.align !== 'left',
            })}
          >
            <div className={(itemTh.ellipsisTitle || itemTh.ellipsis) && ellipsisClasses}>{itemTh.title}</div>
          </th>
        ))}
      </tr>
    </thead>
  ) : null;

  const secondBody = () =>
    data.map((row, rowIndex) => (
      <tr key={rowIndex} onClick={(e) => handleRowClick(row, rowIndex, e)}>
        {columns.map((col, colIndex) => (
          <td
            key={colIndex}
            className={cls({
              [tdEllipsisClass]: col.ellipsis,
              [tdAlignClasses[`${col.align}`]]: col.align && col.align !== 'left',
            })}
            onClick={(e) => handleCellClick(row, col, rowIndex, colIndex, e)}
          >
            {/* {renderCell({ col, row, rowIndex }, renderCellEmptyContent)} */}
            <div className={col.ellipsis && ellipsisClasses}>
              {renderCell({ col, row, rowIndex, colIndex }, renderCellEmptyContent)}
            </div>
          </td>
        ))}
      </tr>
    ));
  const firstBody = () => (
    <tr className={tableBaseClass.emptyRow}>
      <td colSpan={columns.length}>
        <div className={tableBaseClass.empty}>{renderContentEmpty}</div>
      </td>
    </tr>
  );

  const subBody = () => {
    if (!data.length && renderContentEmpty) return firstBody();
    if (data.length) return secondBody();
    return null;
  };

  const body = <tbody className={tbodyClasses}>{subBody()}</tbody>;

  return (
    <div className={dynamicBaseTableClasses} style={{ position: 'relative' }}>
      <div className={tableBaseClass.content} style={tableContentStyles} onWheel={onInnerVirtualScroll}>
        <table className={tableElmClasses} style={tableElementStyles} ref={ref}>
          <colgroup>{cols}</colgroup>

          {header}

          {body}
        </table>
        {loadingContent ? <div className={loadingClasses}>{loadingContent}</div> : null}
      </div>
    </div>
  );
});

BaseTable.displayName = 'BaseTable';

export default BaseTable;
