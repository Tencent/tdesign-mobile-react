import React, { useEffect, useRef, FC, useState } from 'react';
import TPopup from '../popup';
import CalendarTemplate from './CalendarTemplate';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { calendarDefaultProps } from './defaultProps';
import { TdCalendarProps } from './type';
import { StyledProps } from '../common';

export interface CalendarProps extends TdCalendarProps, StyledProps {}

export interface CalendarContextValue {
  inject: (props: CalendarProps) => CalendarProps;
}

export const CalendarContext = React.createContext<CalendarContextValue>(null);

const Calendar: FC<CalendarProps> = (_props) => {
  const calendarTemplateRef = useRef(null);
  const calendarClass = usePrefixClass('calendar');

  const props = useDefaultProps(_props, calendarDefaultProps);
  const { title, type, onClose, confirmBtn, usePopup, visible, className, style } = props;

  const [currentVisible, setCurrentVisible] = useState(visible);
  const contextValue: CalendarContextValue = {
    inject(calendarProps) {
      if (calendarProps.type) {
        return calendarProps;
      }
      return {
        ...props,
        onClose: (trigger) => {
          props.onClose?.(trigger);
          setCurrentVisible(false);
        },
      };
    },
  };

  const selectedValueIntoView = () => {
    const selectType = type === 'range' ? 'start' : 'selected';
    const { templateRef } = calendarTemplateRef.current;
    const scrollContainer = templateRef.querySelector(`.${calendarClass}__months`);
    const selectedDate = templateRef.querySelector(`.${calendarClass}__dates-item--${selectType}`)?.parentNode
      ?.previousElementSibling;
    if (selectedDate) {
      scrollContainer.scrollTop = selectedDate.offsetTop - scrollContainer.offsetTop;
    }
  };

  const onPopupVisibleChange = (v) => {
    if (!v) {
      onClose?.('overlay');
    } else {
      selectedValueIntoView();
    }
    setCurrentVisible(v);
  };

  useEffect(() => {
    setCurrentVisible(visible);
  }, [visible]);

  return (
    <CalendarContext.Provider value={contextValue}>
      <div className={className} style={style}>
        {!usePopup ? (
          <CalendarTemplate ref={calendarTemplateRef} title={title} confirmBtn={confirmBtn} />
        ) : (
          <TPopup visible={currentVisible} placement="bottom" onVisibleChange={onPopupVisibleChange}>
            <CalendarTemplate ref={calendarTemplateRef} title={title} confirmBtn={confirmBtn} />
          </TPopup>
        )}
      </div>
    </CalendarContext.Provider>
  );
};

export default Calendar;
