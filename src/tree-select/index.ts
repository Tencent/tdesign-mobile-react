import _TreeSelect from './tree-select';
import { TdTreeSelectProps } from './type';

import './style';

export * from './type';
export type TreeSelectProps = TdTreeSelectProps;
const TreeSelect = _TreeSelect;
// export const TreeSelect: WithInstallType<typeof _TreeSelect> = withInstall(_TreeSelect);
export default TreeSelect;
