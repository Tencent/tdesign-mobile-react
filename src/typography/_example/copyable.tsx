import React from 'react';
import { SmileIcon } from 'tdesign-icons-react';
import { TypographyText } from 'tdesign-mobile-react';

import './style/index.less';

export default function CopyableDemo() {
  return (
    <div>
      <div className="tdesign-mobile-typography-demo tdesign-mobile-typography-demo--border">
        <TypographyText copyable>This is a copyable text.</TypographyText>
      </div>
      <div className="tdesign-mobile-typography-demo">
        <TypographyText
          copyable={{
            suffix: () => <SmileIcon style={{ color: '#0052D9' }} />,
            onCopy: () => {
              console.log('触发 copy 事件，已复制文本');
            },
          }}
        >
          This is a copyable text with custom icon.
        </TypographyText>
      </div>
    </div>
  );
}
