import React, { useState } from 'react';
import { Collapse, CollapsePanel } from '..';

export default function () {
  const [values, setValues] = useState([1]);

  const handleChange = (value: number[]) => {
    setValues(value);
  };

  return (
    <Collapse value={values} onChange={handleChange}>
      <CollapsePanel value={0} header="折叠面板标题" headerRightContent={`${values.includes(0) ? '收起' : '展开'}`}>
        <div className="content">
          此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容
        </div>
      </CollapsePanel>
    </Collapse>
  );
}
