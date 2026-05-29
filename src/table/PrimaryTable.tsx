import React, { forwardRef, useImperativeHandle, useMemo, useRef } from 'react';
import classNames from 'classnames';
import { get } from 'lodash-es';
import { PrimaryTableProps, PrimaryTableRef } from './interface';
import {
  PageInfo,
  PaginationProps,
  PrimaryTableCol,
  TableRowData,
  TdBaseTableProps,
  TdPrimaryTableProps,
} from './type';
import useDefaultProps from '../hooks/useDefaultProps';
import useControlled from '../hooks/useControlled';
import useClassName from './hooks/useClassName';
import useRowSelect from './hooks/useRowSelect';
import useSorter from './hooks/useSorter';
import useFilter from './hooks/useFilter';
import useDragSort from './hooks/useDragSort';
import useRowExpand from './hooks/useRowExpand';
import useTableHeader, { renderTitle } from './hooks/useTableHeader';
import { primaryTableDefaultProps } from './defaultProps';
import { tablePaginationDefaultProps } from './tablePaginationDefaultProps';
import BaseTable from './BaseTable';

const PrimaryTable = forwardRef<PrimaryTableRef, PrimaryTableProps>((props, ref) => {
  const {
    className,
    columns,
    style,
    pagination: originPagination,
  } = useDefaultProps<PrimaryTableProps>(props, primaryTableDefaultProps);
  const pagination = useDefaultProps<PaginationProps>(originPagination, tablePaginationDefaultProps);
  const primaryTableRef = useRef(null);
  const innerPagination = useRef<PaginationProps>(pagination);
  const { classPrefix, tableDraggableClasses, tableBaseClass, tableSelectedClasses, tableSortClasses } = useClassName();
  const [tDisplayColumns] = useControlled(props, 'displayColumns', props.onDisplayColumnsChange);
  const {
    selectedRowClassNames,
    setCurrentPaginateData,
    formatToRowSelectColumn,
    setTSelectedRowKeys,
    onInnerSelectRowClick,
  } = useRowSelect(props, tableSelectedClasses);
  // 排序功能
  const { renderSortIcon } = useSorter(props);
  // 拖拽排序功能
  const { isRowHandlerDraggable, isRowDraggable, isColDraggable, setDragSortColumns } = useDragSort(props, {
    primaryTableRef,
    innerPagination,
  });
  // 过滤功能
  const { isTableOverflowHidden, renderFilterIcon } = useFilter(props, primaryTableRef);
  // 展开/收起行功能
  const {
    showExpandedRow,
    showExpandIconColumn,
    getExpandColumn,
    renderExpandedRow,
    onInnerExpandRowClick,
    getExpandedRowClass,
  } = useRowExpand(props);
  const { renderTitleWidthIcon } = useTableHeader({ columns: props.columns });

  // 如果想给 TR 添加类名，请在这里补充，不要透传更多额外 Props 到 BaseTable
  const tRowClassNames = (() => {
    const tClassNames = [props.rowClassName, selectedRowClassNames, getExpandedRowClass];
    return tClassNames.filter((v) => v);
  })();

  // 如果想给 TR 添加属性，请在这里补充，不要透传更多额外 Props 到 BaseTable
  const tRowAttributes = (() => {
    const tAttributes = [props.rowAttributes];
    if (isRowHandlerDraggable || isRowDraggable) {
      tAttributes.push(({ row }) => ({ 'data-id': get(row, props.rowKey || 'id') }));
    }
    return tAttributes.filter((v) => v);
  })();

  const primaryTableClasses = useMemo(
    () => ({
      [tableDraggableClasses.colDraggable]: isColDraggable,
      [tableDraggableClasses.rowHandlerDraggable]: isRowHandlerDraggable,
      [tableDraggableClasses.rowDraggable]: isRowDraggable,
      [tableBaseClass.overflowVisible]: isTableOverflowHidden === false,
    }),
    [
      isColDraggable,
      isRowDraggable,
      isRowHandlerDraggable,
      isTableOverflowHidden,
      tableBaseClass,
      tableDraggableClasses,
    ],
  );

  useImperativeHandle(ref, () => ({
    ...primaryTableRef.current,
  }));

  const getColumns = (columns: PrimaryTableCol<TableRowData>[]) => {
    const arr: PrimaryTableCol<TableRowData>[] = [];
    for (let i = 0, len = columns.length; i < len; i++) {
      let item = { ...columns[i] };
      // 自定义列显示控制
      const isDisplayColumn = item.children?.length || tDisplayColumns?.includes(item.colKey);
      if (!isDisplayColumn && tDisplayColumns) continue;
      item = formatToRowSelectColumn(item);
      const { sort } = props;
      if (item.sorter && props.showSortColumnBgColor) {
        const sorts = sort instanceof Array ? sort : [sort];
        const sortedColumn = sorts.find((sort) => sort && sort.sortBy === item.colKey && sort.descending !== undefined);
        if (sortedColumn) {
          item.className =
            item.className instanceof Array
              ? item.className.concat(tableSortClasses.sortColumn)
              : [item.className, tableSortClasses.sortColumn];
        }
      }
      // 添加排序图标和过滤图标
      if (item.sorter) {
        const titleContent = renderTitle(item, i);
        const { ellipsisTitle } = item;
        item.title = (p) => {
          const sortIcon = item.sorter ? renderSortIcon(p) : null;
          const filterIcon = item.filter ? renderFilterIcon(p) : null;
          const attach = primaryTableRef.current?.tableContentRef;
          return renderTitleWidthIcon([titleContent, sortIcon, filterIcon], p.col, p.colIndex, ellipsisTitle, attach, {
            classPrefix,
            ellipsisOverlayClassName: '',
          });
        };
        item.ellipsisTitle = false;
      }
      if (item.children?.length) {
        item.children = getColumns(item.children);
      }
      // 多级表头和自定义列配置特殊逻辑：要么子节点不存在，要么子节点长度大于 1，方便做自定义列配置
      if (!item.children || item.children?.length) {
        arr.push(item);
      }
    }
    return arr;
  };

  const tColumns = (() => {
    const cols = getColumns(columns);
    if (showExpandIconColumn) {
      cols.unshift(getExpandColumn());
    }
    return cols;
  })();

  const onInnerPageChange = (pageInfo: PageInfo, newData: Array<TableRowData>) => {
    innerPagination.current = { ...innerPagination, ...pageInfo };
    setCurrentPaginateData(newData);
    props.onPageChange?.(pageInfo, newData);
    const changeParams: Parameters<TdPrimaryTableProps['onChange']> = [
      { pagination: pageInfo },
      { trigger: 'pagination', currentData: newData },
    ];
    props.onChange?.(...changeParams);
    // 是否在分页时保留选中结果，如果不保留则需清空
    if (!props.reserveSelectedRowOnPaginate) {
      setTSelectedRowKeys([], {
        selectedRowData: [],
        type: 'uncheck',
        currentRowKey: 'CLEAR_ON_PAGINATE',
      });
    }
  };

  const onInnerRowClick: TdPrimaryTableProps['onRowClick'] = (params) => {
    if (props.expandOnRowClick) {
      onInnerExpandRowClick(params);
    }
    if (props.selectOnRowClick) {
      onInnerSelectRowClick(params);
    }
  };

  const onPrimaryTableScroll: TdBaseTableProps['onScroll'] = (params) => {
    props.onScroll?.(params);
  };

  const baseTableProps = {
    ...props,
    className: classNames(primaryTableClasses, className),
    columns: tColumns,
    rowClassName: tRowClassNames,
    rowAttributes: tRowAttributes,
    thDraggable: ['col', 'row-handler-col'].includes(props.dragSort),
    renderExpandedRow: showExpandedRow ? renderExpandedRow : undefined,
    onPageChange: onInnerPageChange,
    onScroll: onPrimaryTableScroll,
    onLeafColumnsChange: setDragSortColumns,
  };

  if (props.expandOnRowClick || props.selectOnRowClick) {
    baseTableProps.onRowClick = onInnerRowClick;
  }

  return <BaseTable {...baseTableProps} ref={primaryTableRef} style={style} />;
});

export default PrimaryTable;
