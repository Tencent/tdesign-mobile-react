import React from 'react';
import { Button } from 'tdesign-mobile-react';
import { ArrowUpIcon } from 'tdesign-icons-react';

import './style/my-popover.less';

export default function MyPopover({ current, total, handleSkip, handleBack, handleNext, handleFinish }) {
  return (
    <div className="my-popover">
      <ArrowUpIcon className="pop-icon" />
      <p className="popover-desc">自定义的图形或说明文案，用来解释或指导该功能使用。</p>
      <div className="popover-action">
        {current + 1 !== total && (
          <Button theme="light" size="extra-small" onClick={handleSkip}>
            {' '}
            跳过{' '}
          </Button>
        )}
        {current + 1 === total && (
          <Button theme="light" size="extra-small" onClick={handleBack}>
            {' '}
            返回{' '}
          </Button>
        )}
        {current + 1 < total && (
          <Button theme="primary" size="extra-small" onClick={handleNext}>
            {' '}
            下一步{' '}
          </Button>
        )}
        {current + 1 === total && (
          <Button theme="primary" size="extra-small" onClick={handleFinish}>
            {' '}
            完成{' '}
          </Button>
        )}
      </div>
    </div>
  );
}
