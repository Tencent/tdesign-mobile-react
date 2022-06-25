
import React from 'react';
import { Button } from 'tdesign-mobile-react';

export default function ({ disabled }) {
  return (
    <>
      <div style={{ background: '#a6a6a6', padding: '8px 16px', marginBottom: '16px' }}>
          <Button size="large" shape="rectangle" variant="outline" ghost block disabled={disabled}>
            幽灵按钮
          </Button>
        </div>
        <div className='margin-button'>
          <Button size="large" shape="rectangle" theme="primary" variant="text" block disabled={disabled}>
            文字按钮
          </Button>
        </div>
        <div className="no-border-radius margin-button">
          <Button size="large" shape="rectangle" theme="primary" block disabled={disabled}>
            通栏按钮
          </Button>
        </div>
        <div className="no-border-radius no-border flex margin-button">
          <Button size="large" shape="rectangle" variant="outline" block disabled={disabled}>次按钮</Button>
          <Button size="large" shape="rectangle" theme="primary" block disabled={disabled}>主按钮</Button>
        </div>
    </>
  );
}
