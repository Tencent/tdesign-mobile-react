import React from 'react';
import { describe, expect, it, render, waitFor } from '@test/utils';
import Divider from '../Divider';
import { TdDividerProps } from '../type';

describe('Divider', () => {
  describe('props', () => {
    it(':align', async () => {
      const testId = 'divider test align';
      const aligns: TdDividerProps['align'][] = ['left', 'right', 'center'];
      const { getByTestId } = render(
        <div data-testid={testId}>{aligns?.map((align, index) => <Divider key={index} align={align} />)}</div>,
      );

      const instance = await waitFor(() => getByTestId(testId));

      for (let index = 0; index < aligns.length; index++) {
        const align = aligns[index];
        expect(() => instance.querySelector(`.t-divider--${align}`)).toBeTruthy();
      }
    });

    it(':layout', async () => {
      const testId = 'divider test layout';
      const layouts: TdDividerProps['layout'][] = ['horizontal', 'vertical'];
      const { getByTestId } = render(
        <div data-testid={testId}>{layouts?.map((layout, index) => <Divider key={index} layout={layout} />)}</div>,
      );

      const instance = await waitFor(() => getByTestId(testId));

      for (let index = 0; index < layouts.length; index++) {
        const layout = layouts[index];
        expect(() => instance.querySelector(`.t-divider--${layout}`)).toBeTruthy();
      }
    });

    it(':dashed', async () => {
      const { container } = render(<Divider dashed />);
      const dividerElement = container.firstChild;
      expect(dividerElement).toHaveClass('t-divider--dashed');
    });

    it(':content', async () => {
      const content = 'DividerContent';
      const { getByText } = render(<Divider content={content}></Divider>);
      expect(getByText(content).textContent).toBeTruthy();
    });
  });

  describe('function', () => {
    it(':content', async () => {
      const content = () => 'DividerContent';
      const { getByText } = render(<Divider>{content}</Divider>);
      expect(getByText(content()).textContent).toBeTruthy();
    });
  });

  describe('slot', () => {
    it(':children', async () => {
      const content = 'DividerContent';
      const { getByText } = render(<Divider>{content}</Divider>);
      expect(getByText(content).textContent).toBeTruthy();
    });
  });
});
