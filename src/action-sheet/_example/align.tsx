import React, { useState } from 'react';
import { Button, ActionSheet } from 'tdesign-mobile-react';

export default function ListExample() {
  const [alignCenterVisible, setAlignCenterVisible] = useState(false);
  const [alignLeftVisible, setAlignLeftVisible] = useState(false);

  return (
    <div className="action-sheet-demo">
      <div className="action-sheet-demo-btns">
        <Button block variant="outline" theme="primary" onClick={() => setAlignCenterVisible(true)}>
          居中列表型
        </Button>
        <Button block variant="outline" theme="primary" onClick={() => setAlignLeftVisible(true)}>
          左对齐列表型
        </Button>
      </div>
      <ActionSheet
        align="center"
        visible={alignCenterVisible}
        description="动作面板描述文字"
        items={['选项一', '选项二', '选项三', '选项四']}
        onClose={() => {
          setAlignCenterVisible(false);
        }}
        onCancel={() => {
          setAlignCenterVisible(false);
        }}
      />
      <ActionSheet
        align="left"
        visible={alignLeftVisible}
        description="动作面板描述文字"
        items={['选项一', '选项二', '选项三', '选项四']}
        onClose={() => {
          setAlignLeftVisible(false);
        }}
        onCancel={() => {
          setAlignLeftVisible(false);
        }}
      />
    </div>
  );
}
