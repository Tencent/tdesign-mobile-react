import React, { FC, useMemo, useRef } from 'react';
import classnames from 'classnames';
import withNativeProps, { NativeProps } from 'tdesign-mobile-react/_util/withNativeProps';
import { TdStepItemProps } from './type';
import useConfig from '../_util/useConfig';
import { stepItemDefaultProps } from './defaultProps';

export interface StepItemProps extends TdStepItemProps, NativeProps {
  index: number;
  readonly: boolean;
  current: number;
}

const StepItem: FC<StepItemProps> = (props) => {

  const { title, content, icon, status, index, readonly, current } = props;

  const currentRef = useRef(current);

  const { classPrefix } = useConfig();
  
  const name = `${classPrefix}-step`;

  const onClickIcon = (e) => {
    if (!readonly) {
      currentRef.current = index
      // stepsProvide.onClickItem(index, current, e);
    }
  }

  const innerClassName = useMemo(() => {
    if (typeof icon === 'boolean') {
      return `${name}__inner`;
    }
    return classnames(
      `${name}__inner`, 
      `${name}__inner__icon`
    )
  }, [name, icon])

  const iconContent = useMemo(() => {
    if (typeof icon === 'boolean') {
      return index + 1;
    }
    return icon;
  }, [icon, index])

  const currentStatus = useMemo(() => {
    if (+current === index) {
      return 'process';
    } if (+current > index) {
      return 'finish'
    }
    return status;
  }, [current, index, status])

  return (
    withNativeProps(
      props,
      <div className={classnames(
        `${name}`,
        { 
          [`${name}--default`]: !readonly,
          [`${name}--${currentStatus}`]: currentStatus 
        },
      )}>
        <div className={innerClassName}>
          <div className={`${name}-icon`}>
            <div 
              className={classnames(
                `${name}-icon__number`,
                { 
                  // [`${name}-icon__dot`]: dot.value 
                }
              )}
              onClick={onClickIcon}
            >
              {iconContent}
            </div>
            {/* <div></div> */}
          </div>
          <div className={`${name}-content`}>
            <div className={`${name}-title`}>{title}</div>
            {
              content && <div className={`${name}-description`}>{content}</div>
            }
          </div>
        </div>
      </div>
    )
  );
};

StepItem.displayName = 'StepItem';
StepItem.defaultProps = stepItemDefaultProps;

export default StepItem;
