import React from 'react';
import { Skeleton } from 'tdesign-mobile-react';
import './style/index.less';

export default function PicText() {
  const rowCols = [
    {
      height: '171px',
      borderRadius: '8px',
    },
    1,
    {
      width: '80%',
    },
    [
      {
        width: '60%',
      },
      {
        width: '20%',
      },
    ],
  ];
  return (
    <>
      <div className="pic-compose">
        {Array.from(Array(2), (i) => (
          <div className="item" key={i}>
            <Skeleton theme="text" rowCol={rowCols} />
          </div>
        ))}
      </div>
    </>
  );
}
