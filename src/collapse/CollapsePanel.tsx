import React, { forwardRef, memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import cls from 'classnames';
import { ChevronDownIcon, ChevronUpIcon } from 'tdesign-icons-react';
import type { StyledProps } from '../common';
import type { TdCollapsePanelProps } from './type';
import { collapsePanelDefaultProps } from './defaultProps';
import { CollapseContext } from './CollapseContext';
import { Cell } from '../cell';
import useDefaultProps from '../hooks/useDefaultProps';
import { usePrefixClass } from '../hooks/useClass';
import parseTNode from '../_util/parseTNode';

export interface CollapsePanelProps extends TdCollapsePanelProps, StyledProps {}

const CollapsePanel = forwardRef<HTMLDivElement, CollapsePanelProps>((originProps, ref) => {
  const props = useDefaultProps(originProps, collapsePanelDefaultProps);
  const collapsePanelClass = usePrefixClass('collapse-panel');

  const {
    value,
    disabled,
    placement,
    expandIcon,
    children,
    headerLeftIcon,
    header,
    headerRightContent,
    className,
    style,
  } = props;

  const parent = useContext(CollapseContext);

  const isActive = useMemo(() => !!parent?.activeValue?.includes(value), [parent, value]);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      e?.stopPropagation();
      if (parent?.disabled || disabled) return;
      parent?.onPanelChange(value, { e });
    },
    [parent, value, disabled],
  );

  const bodyRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const [wrapperHeight, setWrapperHeight] = useState('');

  useEffect(() => {
    const updatePanelState = () => {
      if (!headRef.current || !bodyRef.current) {
        return;
      }
      const headHeight = headRef.current.getBoundingClientRect().height;
      if (!isActive) {
        setWrapperHeight(`${headHeight}px`);
        return;
      }
      const bodyHeight = bodyRef.current.getBoundingClientRect().height;
      const height = headHeight + bodyHeight;
      setWrapperHeight(`${height}px`);
    };

    updatePanelState();
  }, [isActive]);

  useEffect(() => {
    if (parent?.defaultExpandAll) {
      parent.onPanelChange(value, { e: null });
    }
  }, [parent, value]);

  const renderDefaultIcon = () => {
    if (placement === 'bottom') {
      return isActive ? <ChevronUpIcon /> : <ChevronDownIcon />;
    }
    return isActive ? <ChevronDownIcon /> : <ChevronUpIcon />;
  };

  const renderRightIcon = () => {
    const showIcon = expandIcon || parent?.expandIcon;
    const icon = showIcon === true ? renderDefaultIcon() : showIcon;
    return <div className={`${collapsePanelClass}__header-icon`}>{icon}</div>;
  };

  /** 面板内容区， */
  const PanelContent = () => {
    const panelContent = parseTNode(children);
    // 当前面板处理折叠状态时，是否销毁面板内容
    if (props.destroyOnCollapse && !isActive) return null;

    return (
      <div ref={bodyRef} className={`${collapsePanelClass}__content`}>
        {panelContent}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={cls({
        [`${collapsePanelClass}`]: true,
        [`${collapsePanelClass}--${placement}`]: true,
        [`${collapsePanelClass}--active`]: isActive,
        [`${collapsePanelClass}--disabled`]: parent?.disabled || disabled,
        [className]: className,
      })}
      style={{
        height: wrapperHeight,
        ...style,
      }}
    >
      <div ref={headRef} className={`${collapsePanelClass}__title`} onClick={handleClick}>
        <Cell
          className={cls(`${collapsePanelClass}__header`, `${collapsePanelClass}__header--${placement}`, {
            [`${collapsePanelClass}__header--expanded`]: isActive,
          })}
          leftIcon={headerLeftIcon}
          title={parseTNode(header)}
          note={parseTNode(headerRightContent)}
          rightIcon={renderRightIcon()}
        />
      </div>
      <PanelContent />
    </div>
  );
});

export default memo(CollapsePanel);
