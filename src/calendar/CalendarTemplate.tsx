import React, { useEffect, useState, useContext, useMemo, forwardRef } from 'react';
import { CloseIcon } from 'tdesign-icons-react';
import Button from '../button';
import { TDateType, TCalendarValue } from './type';

import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';
import { calendarDefaultProps } from './defaultProps';
import { CalendarContext, CalendarProps } from './Calendar';

const CalendarTemplate = forwardRef<HTMLDivElement, CalendarProps>((_props, ref) => {
  const calendarClass = usePrefixClass('calendar');
  const context = useContext(CalendarContext);
  const props = useDefaultProps(context ? context.inject(_props) : _props, calendarDefaultProps);

  const [selectedDate, setSelectedDate] = useState<number | Date | TCalendarValue[]>(props.value);
  const [firstDayOfWeek] = useState(props.firstDayOfWeek || 0);

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
    // TODO: 国际化
    const raw = ['日', '一', '二', '三', '四', '五', '六'];
    const ans = [];
    let i = firstDayOfWeek % 7;
    while (ans.length < 7) {
      ans.push(raw[i]);
      i = (i + 1) % 7;
    }
    return ans;
  }, [firstDayOfWeek]);

  const confirmBtn = useMemo(() => {
    if (typeof props.confirmBtn === 'string') {
      return { content: props.confirmBtn || '确定' };
    }
    return props.confirmBtn;
  }, [props.confirmBtn]);

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

  // 选择日期
  const handleSelect = (year, month, date, dateItem) => {
    if (dateItem.type === 'disabled') return;
    const selected = new Date(year, month, date);
    if (props.type === 'range' && Array.isArray(selectedDate)) {
      if (selectedDate.length === 1) {
        if (selectedDate[0] > selected) {
          setSelectedDate([selected]);
        } else {
          setSelectedDate([selectedDate[0], selected]);
        }
      } else {
        setSelectedDate([selected]);
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
      setSelectedDate(newVal);
    } else {
      setSelectedDate(selected);
      if (!confirmBtn) {
        props.onChange?.(selected);
      }
    }
    props.onSelect?.(selectedDate[0]);
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
          if (startDate && endDate && curDate.getTime() > startDate.getTime() && curDate.getTime() < endDate.getTime())
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

  const handleConfirm = () => {
    props.onClose?.('confirm-btn');
    props.onConfirm?.(new Date(selectedDate[0]));
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
    if (confirmBtn && typeof confirmBtn !== 'object') {
      return confirmBtn;
    }
    if (confirmBtn && Array.isArray(confirmBtn)) {
      return confirmBtn;
    }
    if (confirmBtn && typeof confirmBtn === 'object') {
      return <Button block theme="primary" {...confirmBtn} onClick={handleConfirm} />;
    }
  };

  const className = useMemo(
    () => (props.usePopup ? `${calendarClass} ${calendarClass}--popup` : `${calendarClass}`),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <div ref={ref} className={`${className}`}>
      <div className={`${calendarClass}__title`}>{props.title || '请选择日期'}</div>
      {props.usePopup && <CloseIcon className={`${calendarClass}__close-btn`} size={24} onClick={handleClose} />}
      <div className={`${calendarClass}__days`}>
        {days.map((item, index) => (
          <div key={index} className={`${calendarClass}__days-item`}>
            {item}
          </div>
        ))}
      </div>

      <div className={`${calendarClass}__months`} style={{ overflow: 'auto' }}>
        {months.map((item, index) => (
          <>
            <div className={`${calendarClass}__month`} key={index}>
              {item.year} / {item.month}
            </div>
            <div className={`${calendarClass}__dates`} key={index}>
              {new Array((item.weekdayOfFirstDay - firstDayOfWeek + 7) % 7).fill(0).map((emptyItem, index) => (
                <div key={index} />
              ))}
              {item.months.map((dateItem, dateIndex) => (
                <>
                  <div
                    key={`${index}_${dateIndex}`}
                    className={getDateItemClass(dateItem)}
                    onClick={() => handleSelect(item.year, item.month, dateItem.day, dateItem)}
                  >
                    {renderCell(dateItem)}
                  </div>
                </>
              ))}
            </div>
          </>
        ))}
      </div>
      {props.usePopup && <div className={`${calendarClass}__footer`}>{renderConfirmBtn()}</div>}
    </div>
  );
});

export default CalendarTemplate;
