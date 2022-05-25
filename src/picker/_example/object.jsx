import React, { useState, useMemo } from 'react';
import { Picker, PickerItem, Cell, Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

const roles = [
  { label: '战士', value: 'warrior' },
  { label: '法师', value: 'mage' },
  { label: '射手', value: 'shooter' },
  { label: '刺客', value: 'ssassin' },
  { label: '坦克', value: 'tank' },
  { label: '辅助', value: 'auxiliary' },
];

const findRolesOption = (value) => (value && value[0] && roles.find((item) => item.value === value[0])) || undefined;

export default function Demo() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState([]);
  const selectedText = useMemo(() => findRolesOption(value)?.label || '', [value]);

  return (
    <TDemoBlock title="" summary="object选择器">
      <Cell arrow title="角色" note={selectedText || '选择角色'} onClick={() => setVisible(true)} />
      <Picker
        defaultValue={value}
        onConfirm={(value) => {
          setValue(value);
          setVisible(false);
          const option = findRolesOption(value);
          if (option) {
            Toast({ message: `[${option.label}(${option.value})]` });
          }
        }}
        visible={visible}
      >
        <PickerItem options={roles} />
      </Picker>
    </TDemoBlock>
  );
}
