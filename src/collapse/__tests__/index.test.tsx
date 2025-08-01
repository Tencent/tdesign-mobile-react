import React from 'react';
import { describe, expect, it, render } from '@test/utils';
import { Collapse, CollapsePanel } from '../index';

describe('Collapse', () => {
  describe('props', () => {
    it(': content', () => {
      const title = '折叠面板标题';
      const content =
        '此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容此处可自定义内容可自定义内容';
      const { container } = render(
        <Collapse>
          <CollapsePanel value="0" header={title}>
            {content}
          </CollapsePanel>
        </Collapse>,
      );
      expect(container.querySelector('.t-cell__title-text').innerHTML.trim()).toBe(title);
      expect(container.querySelector('.t-collapse-panel__content').innerHTML.trim()).toBe(content);
    });
  });
});
