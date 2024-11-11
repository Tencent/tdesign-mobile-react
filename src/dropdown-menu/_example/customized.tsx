import cloneDeep from 'lodash/cloneDeep';
import noop from 'lodash/noop';
import React, { useRef, useState } from 'react';
import { Button, Checkbox, DropdownItem, DropdownMenu } from 'tdesign-mobile-react';
import CheckboxGroup from 'tdesign-mobile-react/checkbox/CheckboxGroup';
import './style/customized.less';

const chineseNumber = '一二三四五六七八九十'.split('');

const options1 = new Array(8).fill(null).map((_, i) => ({
  label: `类型${chineseNumber[i]}`,
  value: `type_${i + 1}`,
  disabled: false,
}));

const options2 = new Array(8).fill(null).map((_, i) => ({
  label: `角色${chineseNumber[i]}`,
  value: `role_${i + 1}`,
  disabled: false,
}));

const groups = [
  {
    label: '类型',
    options: [
      ...options1,
      {
        label: '禁用选项',
        value: 'disabled',
        disabled: true,
      },
    ],
  },
  {
    label: '角色',
    options: [
      ...options2,
      {
        label: '禁用选项',
        value: 'disabled',
        disabled: true,
      },
    ],
  },
];

export const CustomizedDemo = () => {
  const [checkSelectGroup, setCheckSelectGroup] = useState<string[][]>([['type_1', 'type_2'], ['role_2']]);

  const ref = useRef({ collapseMenu: noop });
  return (
    <DropdownMenu ref={ref}>
      <DropdownItem
        footer={
          <div className="demo-dropdown-item_footer">
            <Button
              size="large"
              theme="light"
              onClick={() => {
                setCheckSelectGroup([[], []]);
              }}
            >
              重置
            </Button>
            <Button
              size="large"
              theme="primary"
              onClick={() => {
                ref.current.collapseMenu();
              }}
            >
              确定
            </Button>
          </div>
        }
        label="三列多选"
        multiple
        options-columns="1"
      >
        {groups.map((group, index) => (
          <>
            <div className="demo-dropdown-item_label" key={index}>
              {group.label}
            </div>
            {/* TODO checkbox 组件未升级 */}
            <CheckboxGroup
              style={{
                gridTemplateColumns: 'repeat(3, 1fr)',
              }}
              value={checkSelectGroup[index] || []}
              onChange={(value: string[]) => {
                const newValue = cloneDeep(checkSelectGroup);
                newValue[index] = value;
                setCheckSelectGroup(newValue);
              }}
            >
              {group.options.map((item, index) => (
                <Checkbox key={index} label={item.label} value={item.value} disabled={item.disabled} />
              ))}
            </CheckboxGroup>
          </>
        ))}
      </DropdownItem>
    </DropdownMenu>
  );
};
