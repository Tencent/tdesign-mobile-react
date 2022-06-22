import React from 'react';
import { Radio, RadioGroup } from 'tdesign-mobile-react/radio';
import { CheckIcon } from 'tdesign-icons-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const defaultVaule = 'idx1';
  return (
    <>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultVaule}>
            <Radio label="单选" value="idx1"></Radio>
            <Radio label="单选" value="idx2"></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabledvalue={defaultVaule}>
            <Radio label="单选" value="idx1" icon={[CheckIcon]}></Radio>
            <Radio label="单选" value="idx2" icon={[CheckIcon]}></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultVaule}>
            <Radio label="单选" value="idx1" align="right"></Radio>
            <Radio label="单选" value="idx2" align="right"></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
      <div style={{ marginTop: '10px' }}>
        <TDemoBlock>
          <RadioGroup disabled value={defaultVaule}>
            <Radio label="单选" value="idx1" icon={[CheckIcon]} align="right"></Radio>
            <Radio label="单选" value="idx2" icon={[CheckIcon]} align="right"></Radio>
          </RadioGroup>
        </TDemoBlock>
      </div>
    </>
  );
}
