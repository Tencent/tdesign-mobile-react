import React, { useCallback, useState } from 'react';
import Button, { ButtonProps } from 'tdesign-mobile-react/button';

export const DialogActionBtn = React.memo<ButtonProps>((props) => {
  const [loading, setLoading] = useState(false);

  const onClickHandle = useCallback(
    async (e) => {
      setLoading(true);
      try {
        const promise = props.onClick(e);
        await promise;
        setLoading(false);
      } catch (e) {
        setLoading(false);
        throw e;
      }
    },
    [props],
  );

  const defaultProps: ButtonProps = {
    block: true,
    variant: 'text',
    type: 'button',
  };

  return <Button loading={loading} {...defaultProps} {...props} onClick={onClickHandle} />;
});

export default DialogActionBtn;
