import React, { useState } from 'react';
import { Button, Cell, Switch } from 'tdesign-mobile-react';
import TDemoHeader from '../../../site/mobile/components/DemoHeader';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';
import HorizontalForm from './horizontal';
import VerticalForm from './vertical';
import './style/index.less';

export type ArrangementTypes = 1 | 2;
export const ARRANGEMENT_TYPE: Record<'horizontal' | 'vertical', ArrangementTypes> = {
  horizontal: 1,
  vertical: 2,
};

export default function FormDemo() {
  const [arrangement, setArrangement] = useState<ArrangementTypes>(ARRANGEMENT_TYPE.horizontal);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const handleChangeArrangement = (arrangement: ArrangementTypes) => {
    setArrangement(arrangement);
  };
  const handleChangeSwitch = () => {
    setIsFormDisabled((v) => !v);
  };
  return (
    <div className="tdesign-mobile-demo">
      <TDemoHeader title="Form 表单" summary="用于开启一个闭环的操作任务，如“删除”对象、“购买”商品等。" />
      <TDemoBlock title="01 基础类型" summary="基础表单">
        <div className="options">
          <div className="button-group">
            <Button
              theme={arrangement === ARRANGEMENT_TYPE.horizontal ? 'light' : 'default'}
              shape="round"
              onClick={() => handleChangeArrangement(ARRANGEMENT_TYPE.horizontal)}
            >
              水平排布
            </Button>
            <Button
              theme={arrangement === ARRANGEMENT_TYPE.vertical ? 'light' : 'default'}
              shape="round"
              onClick={() => handleChangeArrangement(ARRANGEMENT_TYPE.vertical)}
            >
              竖直排布
            </Button>
          </div>
          <Cell title="禁用态">
            <Switch value={isFormDisabled} onChange={handleChangeSwitch} />
          </Cell>
        </div>
      </TDemoBlock>
      <TDemoBlock>
        {arrangement === ARRANGEMENT_TYPE.horizontal ? <HorizontalForm disabled={isFormDisabled} /> : null}
        {arrangement === ARRANGEMENT_TYPE.vertical ? <VerticalForm disabled={isFormDisabled} /> : null}
      </TDemoBlock>
    </div>
  );
}
