import React from 'react';
import { CheckIcon } from 'tdesign-icons-react';
import { Radio, RadioGroup } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const defaultValue = 'idx2';
  const icon = <CheckIcon key="1" />;

  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <Radio label="单选" value="idx1"></Radio>
            <Radio label="单选" value="idx2"></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <Radio label="单选" value="idx1" icon={[icon]}></Radio>
            <Radio label="单选" value="idx2" icon={[icon]}></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <Radio label="单选" value="idx1" align="right"></Radio>
            <Radio label="单选" value="idx2" align="right"></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultValue}>
            <Radio label="单选" value="idx1" icon={[icon]} align="right"></Radio>
            <Radio label="单选" value="idx2" icon={[icon]} align="right"></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
    </>
  );
}
