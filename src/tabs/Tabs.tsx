import React, { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import classnames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdTabsProps } from './type';
import TabPanel from './TabPanel';
import TabContext from './context';

type TabsHTMLAttrs = Pick<HTMLAttributes<HTMLDivElement>, 'className' | 'style'>;
export interface TabsProps extends TdTabsProps, TabsHTMLAttrs {}

const Tabs: FC<TabsProps> = (props) => {
  const {
    className = '',
    style,
    children,
    content,
    value = '',
    defaultValue = '',
    list = [],
    animation,
    placement,
    showBottomLine = true,
    size,
    change,
  } = props;
  const [activeKey, setActiveKey] = useState<number | string>('');
  const [lineStyle, setLineStyle] = useState({});
  const [wrapWidth, setWrapWidth] = useState(0);

  const { classPrefix } = useConfig();
  const tabPrefix = classPrefix || 't';
  const horiRef = useRef(null);
  const wrapRef = useRef(null);
  const vetiRef = useRef(null);

  const onChange = (value) => {
    setActiveKey(value);
    change && change(value);
  };

  useEffect(() => {
    if (placement === 'left' || placement === 'right') {
      const vetiIndfo = vetiRef.current?.getBoundingClientRect();
      if (vetiIndfo) {
        const { height } = vetiIndfo || {};
        const offsetTop = vetiRef.current?.offsetTop;
        const sTop = wrapRef.current?.scrollTop;
        const linePosition = offsetTop + sTop;
        const lStyle = {
          width: '2px',
          height: `${height}px`,
          left: 0,
          top: `${linePosition}px`,
        };
        const rStyle = {
          width: '2px',
          height: `${height}px`,
          right: 0,
          top: `${linePosition}px`,
        };
        if (placement === 'left') {
          setLineStyle(lStyle);
        }
        if (placement === 'right') {
          setLineStyle(rStyle);
        }
      }
    } else {
      const eleInfo = horiRef.current?.getBoundingClientRect();
      if (eleInfo) {
        const sLeft = wrapRef.current?.scrollLeft;
        const { width, left } = eleInfo || {};
        const linePosition = left + sLeft;
        const warpEle = wrapRef?.current;
        warpEle.scrollLeft = linePosition - wrapWidth / 2;

        const tbStyle = {
          width: `${width}px`,
          left: `${linePosition}px`,
        };
        setLineStyle(tbStyle);
      }
    }
  }, [activeKey, wrapWidth, placement, defaultValue, tabPrefix]);

  useEffect(() => {
    const warapWidth = wrapRef.current?.getBoundingClientRect().width;
    setWrapWidth(warapWidth);
  }, []);

  useEffect(() => {
    if (activeKey) return;
    if (value || defaultValue) {
      onChange(value || defaultValue);
      return;
    }
    if (list.length > 0) {
      onChange(list[0]?.value);
      return;
    }
    if (!children) return;
    if (Array.isArray(children)) {
      onChange(children[0]?.props?.value);
    } else {
      onChange(children?.props.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabPrefix, value, defaultValue]);

  return (
    <div
      className={classnames(
        [`${tabPrefix}-tabs`, className],
        size === 'large' && `${tabPrefix}-size-l`,
        size === 'small' && `${tabPrefix}-size-s`,
        placement && `${tabPrefix}-is-${placement}`,
      )}
      style={style}
    >
      <div ref={wrapRef} className={classnames(`${tabPrefix}-tabs__nav `, `${tabPrefix}-is-scrollable `)}>
        <div className={classnames(`${tabPrefix}-tabs__nav-wrap`, `${tabPrefix}-tabs__nav-container`)}>
          <TabContext.Provider value={{ activeKey, vetiRef, horiRef, onChange }}>
            {children}
            {list &&
              list.length > 0 &&
              list.map((item) => (
                <TabPanel key={item.value} value={item.value} label={item.label} disabled={item.disabled}></TabPanel>
              ))}
          </TabContext.Provider>
          {showBottomLine && (
            <div
              style={{
                ...animation,
                ...lineStyle,
              }}
              className={`${tabPrefix}-tabs__nav-line`}
            ></div>
          )}
        </div>
      </div>
      {(children || content) && (
        <div
          className={classnames(
            `${tabPrefix}-tabs__content`,
            (placement === 'left' || placement === 'right') && `${tabPrefix}-tabs__panel`,
          )}
        >
          {children &&
            Array.isArray(children) &&
            children.map((item) => <>{activeKey === item?.props?.value && <>{item.props.children}</>}</>)}
          {children && typeof children === 'object' && <>{children?.props?.children}</>}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
