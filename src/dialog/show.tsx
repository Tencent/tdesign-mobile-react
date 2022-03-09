import React, { createRef, forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { renderToBody } from '../_util/renderToBody';
import Dialog, { DialogProps } from './Dialog';
import { DialogInstance } from './type';

export type DialogShowProps = Omit<DialogProps, 'visible'>;

export function show(props: DialogShowProps): DialogInstance {
  const Wrapper = forwardRef<DialogInstance>((_, ref) => {
    const [visible, setVisible] = useState(false);
    const [options, setOptions] = useState<DialogShowProps>(props);

    useEffect(() => {
      setVisible(true);
    }, []);

    const closeHandle = useCallback(
      (context) => {
        options.onClose?.(context);
        setVisible(false);
      },
      [options],
    );

    useImperativeHandle(ref, () => ({
      hide: () => {
        setVisible(false);
      },
      show: () => {
        setVisible(true);
      },
      update: (opts) => {
        setOptions(opts);
      },
    }));

    return <Dialog {...options} visible={visible} onClose={closeHandle} />;
  });
  const ref = createRef<DialogInstance>();
  const destroy = renderToBody(<Wrapper ref={ref} />);

  return {
    hide: ref.current?.hide,
    show: ref.current?.show,
    update: ref.current?.update,
    destroy,
  };
}

export default show;
