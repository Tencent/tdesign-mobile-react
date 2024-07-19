import React from 'react';
import { render, waitFor } from '@test/utils';
import getBackgroundColor from '../../_util/linearGradient';
import Progress from '../Progress';
import { ThemeEnum } from '../type';

describe('Progress', () => {
  describe('utils/getBackgroundColor', () => {
    it('color types', () => {
      expect(getBackgroundColor('red')).toEqual('red');

      expect(getBackgroundColor(['#000', '#fff'])).toEqual('linear-gradient( 90deg,#000,#fff )');

      expect(
        getBackgroundColor({
          '0%': '#f00',
          '100%': '#0ff',
        }),
      ).toEqual('linear-gradient(to right, #f00 0%,#0ff 100%)');
    });
  });

  describe('props', () => {
    test('render theme', async () => {
      const testId = 'progress test theme';
      const themes: ThemeEnum[] = ['line', 'plump', 'circle'];
      const { getByTestId } = render(
        <div data-testid={testId}>
          {themes?.map((theme, index) => (
            <Progress key={index} strokeWidth={120} theme={theme} />
          ))}
        </div>,
      );

      const instance = await waitFor(() => getByTestId(testId));

      for (let index = 0; index < themes.length; index++) {
        const theme = themes[index];
        expect(() => instance.querySelector(`.t-progress--${theme}`)).toBeTruthy();
      }
    });
  });
});
