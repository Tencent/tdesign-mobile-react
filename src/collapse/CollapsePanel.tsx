import React, { useContext, useState, useRef, useEffect } from 'react';
import { Icon } from 'tdesign-icons-react';
import classNames from 'classnames';
import useConfig from '../_util/useConfig';
import { TdCollapsePanelProps } from './type';
import { StyledProps } from '../common';
import { CollapseContext } from './Collapse';

export interface CollapsePanelProps extends TdCollapsePanelProps, StyledProps {
  children?: React.ReactNode;
}

const CollapsePanel = function(_props: CollapsePanelProps) {
  const context = useContext(CollapseContext);
  const props = context ? context.inject(_props) : _props;
  const {
    className,
    style,
    children,
    content,
    destroyOnCollapse,
    disabled,
    expandIcon,
    header,
    headerRightContent,
    expanded: injectedExpanded,
    value,
    onChange,
    isControlled,
  } = props;

  const { classPrefix } = useConfig();

  const [expanded, setExpanded] = useState(injectedExpanded);
  const [showPanelBody, setShowPanelBody] = useState(injectedExpanded);
  const [panelStyle, setPanelStyle] = useState({});

  const panelRef = useRef(null);
  const headerRef = useRef(null);
  const bodyRef = useRef(null);
  
  const panelClassNames = classNames(
    className, 
    `${classPrefix}-collapse-panel`, 
    {[`${classPrefix}-collapse-panel--active`]: expanded},
    {[`${classPrefix}-collapse-panel--disabled`]: disabled},
  );

  useEffect(() => {
    if (expanded) {
      setShowPanelBody(true);
    }
    setTimeout(() => {
      const headerHeight = headerRef.current.getBoundingClientRect().height;
      const bodyHeight = (bodyRef && bodyRef.current) ? bodyRef.current.getBoundingClientRect().height : 0;
      setPanelStyle({
        height: `${expanded ? (headerHeight + bodyHeight) : headerHeight}px`
      });
    });
  }, [expanded]);

  useEffect(() => {
    if (!disabled) {
      setExpanded(injectedExpanded);
    }
  }, [injectedExpanded, disabled]);

  const handleHeaderClick = () => {
    if (disabled) {
      return;
    }
    if (!isControlled) {
      setExpanded(!expanded);
      onChange(value);
    }
  };

  const renderIcon = () => {
    if (expandIcon === 'undefined' || expandIcon === false) {
      return <></>;
    }
    if (expandIcon === true) {
      return (
        <Icon 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size="1em"
          className={`${classPrefix}-collapse-panel__header-icon`}
        />
      );
    } 
    return expandIcon;
  };

  const onTransitionEnd = () => {
    const { height: panelHeight } = panelRef.current.getBoundingClientRect();
    if (destroyOnCollapse && panelHeight <= 48) {
      setShowPanelBody(false);
    }
  }

  return (
    <div className={panelClassNames} style={{...style, ...panelStyle}} ref={panelRef} onTransitionEnd={onTransitionEnd}>
      <div className={`${classPrefix}-collapse-panel__header`} onClick={handleHeaderClick} ref={headerRef}>
        <div className={`${classPrefix}-collapse-panel__title`}>{header}</div>
        <div className={`${classPrefix}-collapse-panel__header-right`}>
          <div className={`${classPrefix}-collapse-panel__header-right-content`}>
            {headerRightContent}
          </div>
          {renderIcon()}
        </div>
      </div>
      {(!destroyOnCollapse || destroyOnCollapse && showPanelBody) 
        && <div className={`${classPrefix}-collapse-panel__body`} ref={bodyRef}>
        <div className={`${classPrefix}-collapse-panel__content`}>
          {children || content}
        </div>
      </div>}
    </div>
  );
};

export default CollapsePanel;
