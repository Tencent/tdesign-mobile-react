import React, { useState } from 'react';
import { TagCheck } from 'tdesign-mobile-react';

const ClickableUse = React.memo(() => {
  const [checked, setChecked] = useState(false);

  const handleOnChange = (v) => {
    console.log('on checked', v);
  };
  const handleChange = (v) => {
    console.log('to checked', v);
    setChecked(v);
  };
  return (
    <div className="t-tag__demo-block t-tag__demo-common">
      <TagCheck defaultChecked onChange={handleOnChange}>
        已点击
      </TagCheck>
      <TagCheck onChange={handleChange} checked={checked}>
        未点击
      </TagCheck>
      <TagCheck disabled> 不可点击</TagCheck>
    </div>
  );
});

export default ClickableUse;
