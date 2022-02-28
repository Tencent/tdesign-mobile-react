import { Switch } from 'tdesign-mobile-react';
import TDemoBlock from '../../../docs/mobile/components/DemoBlock';

export default function () {
  return (
    <TDemoBlock title="带描述开关">
      <Switch label={['开', '关']} />
      <Switch defaultValue={true} label={({ value }) => (value ? '开' : '关')} />
    </TDemoBlock>
  );
}
