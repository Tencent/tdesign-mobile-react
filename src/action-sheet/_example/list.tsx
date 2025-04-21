import React, { useState } from 'react';
import { Button, ActionSheet } from 'tdesign-mobile-react';
import { AppIcon } from 'tdesign-icons-react';

export default function ListExample() {
  const [normalVisible, setNormalVisible] = useState(false);
  const [descVisible, setDescVisible] = useState(false);
  const [iconVisible, setIconVisible] = useState(false);
  const [badgeVisible, setBadgeVisible] = useState(false);

  const openByMethod = () => {
    ActionSheet.show({
      items: ['选项一', '选项二', '选项三', '选项四'],
      onClose() {
        ActionSheet.close();
      },
      onCancel() {
        ActionSheet.close();
      },
      onSelected() {
        ActionSheet.close();
      },
    });
  };

  return (
    <div className="action-sheet-demo">
      <div className="action-sheet-demo-btns">
        <Button block variant="outline" theme="primary" onClick={() => setNormalVisible(true)}>
          常规列表型
        </Button>
        <Button block variant="outline" theme="primary" onClick={() => openByMethod()}>
          函数调用
        </Button>
        <Button block variant="outline" theme="primary" onClick={() => setDescVisible(true)}>
          带描述列表型
        </Button>
        <Button block variant="outline" theme="primary" onClick={() => setIconVisible(true)}>
          带图标列表型
        </Button>
        <Button block variant="outline" theme="primary" onClick={() => setBadgeVisible(true)}>
          带徽标列表型
        </Button>
      </div>

      <ActionSheet
        visible={normalVisible}
        items={['选项一', '选项二', '选项三', '选项四']}
        onClose={() => {
          setNormalVisible(false);
        }}
        onCancel={() => {
          setNormalVisible(false);
        }}
      />
      <ActionSheet
        visible={descVisible}
        description="动作面板描述文字"
        items={['选项一', '选项二', '选项三', '选项四']}
        onClose={() => {
          setDescVisible(false);
        }}
        onCancel={() => {
          setDescVisible(false);
        }}
      />
      <ActionSheet
        visible={iconVisible}
        description="动作面板描述文字"
        items={[
          {
            label: '选项一',
            icon: <AppIcon size={24} />,
          },
          {
            label: '选项二',
            icon: <AppIcon size={24} />,
          },
          {
            label: '选项三',
            icon: <AppIcon size={24} />,
          },
          {
            label: '选项四',
            icon: <AppIcon size={24} />,
          },
        ]}
        onClose={() => {
          setIconVisible(false);
        }}
        onCancel={() => {
          setIconVisible(false);
        }}
      />
      <ActionSheet
        visible={badgeVisible}
        description="动作面板描述文字"
        items={[
          {
            label: '选项一',
            badge: { count: 1 },
          },
          {
            label: '选项二',
            badge: { dot: true },
          },
          {
            label: '选项三',
            badge: { dot: true },
          },
          {
            label: '选项四',
            badge: { dot: true },
          },
        ]}
        onClose={() => {
          setBadgeVisible(false);
        }}
        onCancel={() => {
          setBadgeVisible(false);
        }}
      />
    </div>
  );
}
