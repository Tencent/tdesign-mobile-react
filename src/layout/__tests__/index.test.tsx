import React from 'react';
import { describe, it, expect, render } from '@test/utils';
import Row from '../Row';
import Col from '../Col';

const prefix = 't';
const rowName = `${prefix}-row`;
const colName = `${prefix}-col`;

const TEXT = 'tdesign-mobile-vue';

describe('row', () => {
  describe('props', () => {
    it(':gutter', async () => {
      const { container } = render(
        <Row gutter={100}>
          <Col />
        </Row>,
      );
      expect(container.firstChild).toHaveStyle('margin-right: -50px; margin-left: -50px;');

      expect(container.firstChild).toHaveClass(rowName);
    });
  });
});

describe('col', () => {
  describe('props', () => {
    it(':offset', async () => {
      const { container } = render(
        <Row gutter={100}>
          <Col span={2} />
        </Row>,
      );
      const col = container.querySelector(`.${colName}--2`);
      expect(col).not.toBeNull();
      expect(container.firstChild).toHaveClass(rowName);
    });

    it(':span', async () => {
      const { container } = render(
        <Row gutter={100}>
          <Col span={2}>{TEXT}</Col>
        </Row>,
      );

      const col = container.querySelector(`.${colName}--2`);
      expect(col).not.toBeNull();
      expect(container.querySelector(`.${colName}--2`).textContent).toBe(TEXT);
    });
  });
});
