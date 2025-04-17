import React, { useState } from 'react';
import { Button, ActionSheet } from 'tdesign-mobile-react';
import { AppIcon } from 'tdesign-icons-react';

export default function ListExample() {
  const [statusVisible, setStatusVisible] = useState(false);

  return (
    <div className="action-sheet-demo">
      <div className="action-sheet-demo-btns">
        <Button block variant="outline" theme="primary" onClick={() => setStatusVisible(true)}>
          列表型选项状态
        </Button>
      </div>
      <ActionSheet
        visible={statusVisible}
        description="列表型选项状态"
        items={[
          {
            label: '选项一',
            icon: <AppIcon size={24} />,
          },
          {
            label: '选项二',
            icon: <AppIcon size={24} />,
            color: '#0052D9',
          },
          {
            label: '选项三',
            icon: <AppIcon size={24} />,
            disabled: true,
          },
          {
            label: '选项四',
            icon: <AppIcon size={24} />,
            color: '#E34D59',
          },
        ]}
        onClose={() => {
          setStatusVisible(false);
        }}
        onCancel={() => {
          setStatusVisible(false);
        }}
      />
    </div>
  );
}
