import React, { useCallback, useRef, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from 'tdesign-icons-react';
import useConfig from '../_util/useConfig';
import { TdBackTopProps } from './type';

export enum BackTopTheme {
  ROUND = 'round',
  HALF_ROUND = 'half-round',
  ROUND_DARK = 'round-dark',
  HALF_ROUND_DARK = 'half-round-dark',
}

const BackTop: React.FC<TdBackTopProps> = (prop) => {
  const {
    fixed = true,
    icon = 'backtop',
    target = () => Window || Document,
    text = '',
    theme = BackTopTheme.ROUND,
  } = prop;

  const ref = useRef<HTMLDivElement>(null);

  const { classPrefix } = useConfig();

  // useEffect(() => {
  //   ref.current = target;
  // }, []);

  // const getDefaultTarget = () => (ref.current && ref.current.ownerDocument ? ref.current.ownerDocument : window);

  const onClick = useCallback(() => {
    console.log('ref.current: ', ref.current);
    console.log('ref: ', ref);
    console.log('window', window);
    console.log('ref.current.offsetTop: ', ref.current.offsetTop);
    if (ref.current) {
      // event.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // target.scrollTo(0, ref.current.offsetTop || 0);
    }
  }, [ref, target]);

  const backTopIcon =
    typeof icon === 'string' ? <Icon className={`${classPrefix}-back-top__icon`} name={icon} /> : icon;

  return (
    <>
      <div
        ref={ref}
        className={classNames(`${classPrefix}-back-top`, `${classPrefix}-is-${theme}`, {
          [`${classPrefix}-is-fixed`]: fixed,
        })}
        onClick={onClick}
      >
        {backTopIcon}
        {text && <div className={classNames(`${classPrefix}-back-top__text`, `${classPrefix}-class-text`)}>{text}</div>}
      </div>
    </>
  );
};

export default BackTop;
