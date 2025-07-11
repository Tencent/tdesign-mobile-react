import React, { useEffect, useState, useContext, useMemo, forwardRef } from 'react';
import {
  CloseIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronLeftDoubleIcon,
  ChevronRightDoubleIcon,
} from 'tdesign-icons-react';
import classNames from 'classnames';

import parseTNode from '../_util/parseTNode';
import { Button, ButtonProps } from '../button';
import { TDateType, TCalendarValue } from './type';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { calendarDefaultProps } from './defaultProps';
import { CalendarContext, CalendarProps } from './Calendar';
import { useLocaleReceiver } from '../locale/LocalReceiver';
import { getPrevMonth, getPrevYear, getNextMonth, getNextYear } from './utils';

const getCurrentYearAndMonth = (v: Date) => {
  const date = new Date(v);
  return { year: date.getFullYear(), month: date.getMonth() };
};

const CalendarTemplate = forwardRef<HTMLDivElement, CalendarProps>((_props, ref) => {
  const calendarClass = usePrefixClass('calendar');
  const [local, t] = useLocaleReceiver('calendar');
  const context = useContext(CalendarContext);
  const props = useDefaultProps(context ? context.inject(_props) : _props, calendarDefaultProps);

  const [selectedDate, setSelectedDate] = useState<number | Date | TCalendarValue[]>();
  const [currentMonth, setCurrentMonth] = useState<
    Array<{
      year: number;
      month: number;
      months: TDateType[];
      weekdayOfFirstDay: number;
    }>
  >([]);
  const [headerButtons, setHeaderButtons] = useState({
    preYearBtnDisable: false,
    prevMonthBtnDisable: false,
    nextYearBtnDisable: false,
    nextMonthBtnDisable: false,
  });
  const firstDayOfWeek = props.firstDayOfWeek || 0;

  useEffect(() => {
    if (Array.isArray(props.value)) {
      setSelectedDate(props.value?.map((item) => new Date(item)));
    } else if (props.value) {
      setSelectedDate(new Date(props.value));
    } else {
      setSelectedDate(props.type === 'multiple' ? [new Date()] : new Date());
    }
  }, [props.type, props.value]);

  const getYearMonthDay = (date: Date) => ({
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  });

  const today = new Date();
  const minDate = props.minDate ? new Date(props.minDate) : today;
  const maxDate = props.maxDate
    ? new Date(props.maxDate)
    : new Date(today.getFullYear(), today.getMonth() + 6, today.getDate());

  const days = useMemo(() => {
    const raw = local.weekdays;
    const ans = [];
    let i = firstDayOfWeek % 7;
    while (ans.length < 7) {
      ans.push(raw[i]);
      i = (i + 1) % 7;
    }
    return ans;
  }, [firstDayOfWeek, local.weekdays]);

  const confirmBtn = useMemo(() => {
    if (typeof props.confirmBtn === 'string') {
      return { content: props.confirmBtn || local.confirm };
    }
    return props.confirmBtn;
  }, [local.confirm, props.confirmBtn]);

  const getDate = (year: number, month: number, day: number) => new Date(year, month, day);

  const isSameDate = (date1, date2) => {
    const getYearMonthDay = (date) => ({
      year: date.getFullYear(),
      month: date.getMonth(),
      date: date.getDate(),
    });
    let [tDate1, tDate2] = [date1, date2];
    if (date1 instanceof Date) tDate1 = getYearMonthDay(date1);
    if (date2 instanceof Date) tDate2 = getYearMonthDay(date2);
    const keys = ['year', 'month', 'date'];
    if (!tDate1 || !tDate2) {
      return;
    }
    return keys.every((key) => tDate1[key] === tDate2[key]);
  };

  const getDateItemClass = (dateItem) => {
    let className = `${calendarClass}__dates-item`;
    if (dateItem.type) {
      className = `${className} ${calendarClass}__dates-item--${dateItem.type}`;
    }
    if (dateItem.className) {
      className = `${className} ${dateItem.className}`;
    }
    return className;
  };

  const getCurrentDate = () => {
    let time = Array.isArray(selectedDate) ? selectedDate[0] : selectedDate;

    if (currentMonth?.length > 0) {
      const year = currentMonth[0]?.year;
      const month = currentMonth[0]?.month;
      time = new Date(year, month, 1).getTime();
    }

    return time;
  };

  // 计算月份
  const getMonthDates = (date) => {
    const { year, month } = getYearMonthDay(date);
    const firstDay = getDate(year, month, 1);
    const weekdayOfFirstDay = firstDay.getDay();
    const lastDate = new Date(+getDate(year, month + 1, 1) - 24 * 3600 * 1000).getDate();
    return {
      year,
      month,
      weekdayOfFirstDay,
      lastDate,
    };
  };

  const months = useMemo(() => {
    const ans = [];
    let { year: minYear, month: minMonth } = getYearMonthDay(minDate);
    const { year: maxYear, month: maxMonth } = getYearMonthDay(maxDate);
    const calcType = (year: number, month: number, date: number): TDateType => {
      const curDate = new Date(year, month, date, 23, 59, 59);

      if (props.type === 'single') {
        if (isSameDate({ year, month, date }, selectedDate)) return 'selected';
      }
      if (props.type === 'multiple') {
        const hit = (Array.isArray(selectedDate) ? selectedDate : [selectedDate]).some((item: Date) =>
          isSameDate({ year, month, date }, item),
        );
        if (hit) {
          return 'selected';
        }
      }
      if (props.type === 'range') {
        if (Array.isArray(selectedDate)) {
          const [startDate, endDate] = selectedDate;

          if (startDate && isSameDate({ year, month, date }, startDate)) return 'start';
          if (endDate && isSameDate({ year, month, date }, endDate)) return 'end';
          if (
            startDate &&
            endDate &&
            curDate.getTime() > new Date(startDate).getTime() &&
            curDate.getTime() < new Date(endDate).getTime()
          )
            return 'centre';
        }
      }

      const minCurDate = new Date(year, month, date, 0, 0, 0);
      if (curDate.getTime() < minDate.getTime() || minCurDate.getTime() > maxDate.getTime()) {
        return 'disabled';
      }
      return '';
    };

    while (minYear < maxYear || (minYear === maxYear && minMonth <= maxMonth)) {
      const target = getMonthDates(getDate(minYear, minMonth, 1));
      const monthDates = [];
      for (let i = 1; i <= target.lastDate; i++) {
        const dateObj = {
          date: getDate(minYear, minMonth, i),
          day: i,
          type: calcType(minYear, minMonth, i),
        };
        monthDates.push(props.format ? props.format(dateObj) : dateObj);
      }
      ans.push({
        year: minYear,
        month: minMonth,
        months: monthDates,
        weekdayOfFirstDay: target.weekdayOfFirstDay,
      });
      const curDate = getYearMonthDay(getDate(minYear, minMonth + 1, 1));
      minYear = curDate.year;
      minMonth = curDate.month;
    }
    return ans;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDate]);

  const updateActionButton = (value: Date) => {
    const min = getCurrentYearAndMonth(minDate);
    const max = getCurrentYearAndMonth(maxDate);

    const minTimestamp = new Date(min.year, min.month, 1).getTime();
    const maxTimestamp = new Date(max.year, max.month, 1).getTime();

    const prevYearTimestamp = getPrevYear(value).getTime();
    const prevMonthTimestamp = getPrevMonth(value).getTime();
    const nextMonthTimestamp = getNextMonth(value).getTime();
    const nextYearTimestamp = getNextYear(value).getTime();

    const preYearBtnDisable = prevYearTimestamp < minTimestamp || prevMonthTimestamp < minTimestamp;
    const prevMonthBtnDisable = prevMonthTimestamp < minTimestamp;
    const nextYearBtnDisable = nextMonthTimestamp > maxTimestamp || nextYearTimestamp > maxTimestamp;
    const nextMonthBtnDisable = nextMonthTimestamp > maxTimestamp;

    setHeaderButtons({
      preYearBtnDisable,
      prevMonthBtnDisable,
      nextYearBtnDisable,
      nextMonthBtnDisable,
    });
  };

  const calcCurrentMonth = (newValue?: any) => {
    const date = newValue || getCurrentDate();
    const { year, month } = getCurrentYearAndMonth(date);
    setCurrentMonth(months.filter((item) => item.year === year && item.month === month));
    updateActionButton(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  // 选择日期
  const handleSelect = (year, month, date, dateItem) => {
    if (dateItem.type === 'disabled' || props.readonly) return;
    const selected = new Date(year, month, date);
    let newSelected: TCalendarValue | TCalendarValue[];
    if (props.type === 'range' && Array.isArray(selectedDate)) {
      if (selectedDate.length === 1) {
        if (selectedDate[0] > selected) {
          newSelected = [selected];
        } else {
          newSelected = [selectedDate[0], selected];
        }
      } else {
        newSelected = [selected];
        if (!confirmBtn && selectedDate.length === 2) {
          props.onChange?.(new Date(selectedDate[0]));
        }
      }
    } else if (props.type === 'multiple') {
      const newVal = [...(Array.isArray(selectedDate) ? selectedDate : [selectedDate])];
      const index = newVal.findIndex((item) => isSameDate(item, selected));
      if (index > -1) {
        newVal.splice(index, 1);
      } else {
        newVal.push(selected);
      }
      newSelected = newVal;
    } else {
      newSelected = selected;
      if (!confirmBtn) {
        props.onChange?.(selected);
      }
    }
    setSelectedDate(newSelected);

    if (props.switchMode !== 'none') {
      const date = getCurrentDate();
      calcCurrentMonth(date);
    }

    props.onSelect?.(newSelected as any);
  };

  const handleConfirm = () => {
    props.onClose?.('confirm-btn');
    props.onConfirm?.(new Date(Array.isArray(selectedDate) ? selectedDate[0] : selectedDate));
  };

  const handleClose = () => {
    props.onClose?.('close-btn');
  };

  // 渲染日期
  const renderCell = (dateItem) => {
    let className = `${calendarClass}__dates-item-suffix`;
    if (dateItem.type) {
      className = `${className} ${calendarClass}__dates-item-suffix--${dateItem.type}`;
    }

    return (
      <>
        {dateItem.prefix && <div className={`${calendarClass}__dates-item-prefix`}>{dateItem.prefix}</div>}
        {dateItem.day}
        {dateItem.suffix && <div className={`${className}`}>{dateItem.suffix}</div>}
      </>
    );
  };

  const renderConfirmBtn = () => {
    if (!confirmBtn) return;

    if (typeof confirmBtn === 'object') {
      return <Button block theme="primary" {...(confirmBtn as ButtonProps)} onClick={handleConfirm} />;
    }
    return parseTNode(confirmBtn);
  };

  const className = useMemo(
    () => (props.usePopup ? `${calendarClass} ${calendarClass}--popup` : `${calendarClass}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (props.switchMode !== 'none') {
      calcCurrentMonth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.switchMode, selectedDate]);

  const handleSwitchModeChange = (type: 'pre-year' | 'pre-month' | 'next-month' | 'next-year', disabled?: boolean) => {
    if (disabled) return;
    const date = getCurrentDate();

    const funcMap = {
      'pre-year': () => getPrevYear(date),
      'pre-month': () => getPrevMonth(date),
      'next-month': () => getNextMonth(date),
      'next-year': () => getNextYear(date),
    };
    const newValue = funcMap[type]();
    if (!newValue) return;

    const { year, month } = getCurrentYearAndMonth(newValue);

    props.onPanelChange?.({ year, month: month + 1 });

    calcCurrentMonth(newValue);
  };

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    props.onScroll?.({ e });
  };

  return (
    <div ref={ref} className={`${className}`}>
      <div className={`${calendarClass}__title`}>{parseTNode(props.title, null, local.title)}</div>
      {props.usePopup && <CloseIcon className={`${calendarClass}__close-btn`} size={24} onClick={handleClose} />}
      {props.switchMode !== 'none' && (
        <div className={`${calendarClass}-header`}>
          <div className={`${calendarClass}-header__action`}>
            {props.switchMode === 'year-month' && (
              <div
                className={classNames([
                  `${calendarClass}-header__icon`,
                  { [`${calendarClass}-header__icon--disabled`]: headerButtons.preYearBtnDisable },
                ])}
                onClick={() => handleSwitchModeChange('pre-year', headerButtons.preYearBtnDisable)}
              >
                <ChevronLeftDoubleIcon />
              </div>
            )}

            <div
              className={classNames([
                `${calendarClass}-header__icon`,
                { [`${calendarClass}-header__icon--disabled`]: headerButtons.prevMonthBtnDisable },
              ])}
              onClick={() => handleSwitchModeChange('pre-month', headerButtons.prevMonthBtnDisable)}
            >
              <ChevronLeftIcon />
            </div>
          </div>
          <div className={`${calendarClass}-header__title`}>
            {t(local.monthTitle, { year: currentMonth[0]?.year, month: local.months[currentMonth[0]?.month] })}
          </div>
          <div className={`${calendarClass}-header__action`}>
            <div
              className={classNames([
                `${calendarClass}-header__icon`,
                { [`${calendarClass}-header__icon--disabled`]: headerButtons.nextMonthBtnDisable },
              ])}
              onClick={() => handleSwitchModeChange('next-month', headerButtons.nextMonthBtnDisable)}
            >
              <ChevronRightIcon />
            </div>

            {props.switchMode === 'year-month' && (
              <div
                className={classNames([
                  `${calendarClass}-header__icon`,
                  { [`${calendarClass}-header__icon--disabled`]: headerButtons.nextYearBtnDisable },
                ])}
                onClick={() => handleSwitchModeChange('next-year', headerButtons.nextYearBtnDisable)}
              >
                <ChevronRightDoubleIcon />
              </div>
            )}
          </div>
        </div>
      )}
      <div className={`${calendarClass}__days`}>
        {days.map((item, index) => (
          <div key={index} className={`${calendarClass}__days-item`}>
            {item}
          </div>
        ))}
      </div>

      <div className={`${calendarClass}__months`} style={{ overflow: 'auto' }} onScroll={onScroll}>
        {(props.switchMode === 'none' ? months : currentMonth).map((item, index) => (
          <React.Fragment key={`month-${item.year}-${item.month}-${index}`}>
            {props.switchMode === 'none' && (
              <div className={`${calendarClass}__month`}>
                {t(local.monthTitle, { year: item.year, month: local.months[item.month] })}
              </div>
            )}
            <div className={`${calendarClass}__dates`}>
              {new Array((item.weekdayOfFirstDay - firstDayOfWeek + 7) % 7).fill(0).map((_, emptyIndex) => (
                <div key={`empty-${item.year}-${item.month}-${emptyIndex}`} /> // 为空 div 添加唯一 key
              ))}
              {item.months.map((dateItem, dateIndex) => (
                <div
                  key={`date-${item.year}-${item.month}-${dateIndex}`} // 确保 key 唯一
                  className={getDateItemClass(dateItem)}
                  onClick={() => handleSelect(item.year, item.month, dateItem.day, dateItem)}
                >
                  {renderCell(dateItem)}
                </div>
              ))}
            </div>
          </React.Fragment>
        ))}
      </div>
      {props.usePopup && <div className={`${calendarClass}__footer`}>{renderConfirmBtn()}</div>}
    </div>
  );
});

export default CalendarTemplate;
