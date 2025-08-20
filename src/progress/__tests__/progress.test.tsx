import React from 'react';
import { describe, expect, it, render, waitFor } from '@test/utils';
import getBackgroundColor from '../../_util/linearGradient';
import { getCircleStokeWidth } from '../../_common/js/progress/utils';
import Progress from '../index';
import { ProgressTheme } from '../type';

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

  describe(':props status', () => {
    const statuses: ('success' | 'error' | 'warning' | 'active')[] = ['success', 'error', 'warning', 'active'];

    describe.each(statuses)('status: %s', (status) => {
      it(`${status}`, async () => {
        const testId = `progress test status ${status}`;
        const { getByTestId } = render(
          <div data-testid={testId}>
            <Progress percentage={80} status={status} />
          </div>,
        );

        const instance = await waitFor(() => getByTestId(testId));
        expect(instance.querySelector(`.t-progress--status-${status}`)).toBeTruthy();
      });
    });
  });

  describe(':props theme', () => {
    const themes: ProgressTheme[] = ['line', 'plump', 'circle'];

    describe.each(themes)('theme: %s', (theme) => {
      it(`${theme}`, async () => {
        const testId = `progress test theme ${theme}`;
        const { getByTestId } = render(
          <div data-testid={testId}>
            <Progress strokeWidth={120} theme={theme} percentage={80} />
          </div>,
        );

        const instance = await waitFor(() => getByTestId(testId));
        expect(() => instance.querySelector(`.t-progress--${theme}`)).toBeTruthy();
      });
    });
  });

  describe(':props size', () => {
    const sizes = [
      { name: 'default', size: 112 },
      { name: 'micro', size: 24 },
      { name: 240, size: 240 },
    ];

    describe.each(sizes)('size: %s', (sizeObj) => {
      it(`${sizeObj.name}`, async () => {
        const testId = `progress test size ${sizeObj.name}`;
        const { getByTestId } = render(
          <div data-testid={testId}>
            <Progress strokeWidth={'120px'} theme="circle" size={sizeObj.name} percentage={80} />
          </div>,
        );

        const instance = await waitFor(() => getByTestId(testId));
        expect(instance.querySelector('.t-progress--circle')).toHaveStyle(`width: ${sizeObj.size}px`);
      });
    });
  });

  describe(':props color', () => {
    describe('color: string', async () => {
      const colors = ['#ED7B2F', 'pink', 'rgb(255, 192, 203)'];

      colors?.forEach((color) => {
        it(`color: ${color}`, async () => {
          const testId = `progress test color: ${color}`;
          const { getByTestId } = render(
            <div data-testid={testId}>
              <Progress strokeWidth={120} theme="line" percentage={80} color={color} />
            </div>,
          );
          const instance = await waitFor(() => getByTestId(testId));
          expect(instance.querySelector(`.t-progress__inner`)).toHaveStyle(`background: ${color};`);
        });
      });
    });

    describe('color: object', async () => {
      const colors = [{ from: '#000', to: '#000' }, { '0%': '#f00', '100%': '#0ff' }, ['#000', '#fff']];

      colors?.forEach((color) => {
        it(`color: ${color}`, async () => {
          const testId = `progress test color: ${color}`;
          const { getByTestId } = render(
            <div data-testid={testId}>
              <Progress strokeWidth={120} theme="line" percentage={80} color={color} />
            </div>,
          );
          const instance = await waitFor(() => getByTestId(testId));
          expect(instance.querySelector(`.t-progress__inner`)).toHaveStyle(`background: ${getBackgroundColor(color)};`);
        });
      });
    });
  });

  describe(':props trackColor', () => {
    describe('line or plump: trackColor', async () => {
      it('trackColor', async () => {
        const testId = `progress test line: trackColor`;
        const trackColor = '#ED7B2F';
        const { getByTestId } = render(
          <div data-testid={testId}>
            <Progress theme="line" trackColor={trackColor} />
          </div>,
        );
        const instance = await waitFor(() => getByTestId(testId));
        expect(instance.querySelector(`.t-progress__bar`)).toHaveStyle(`background-color: ${trackColor};`);
      });
    });

    describe('circle: trackColor', async () => {
      it('trackColor', async () => {
        const testId = `progress test circle: trackColor`;
        const trackColor = '#ED7B2F';
        const { getByTestId } = render(
          <div data-testid={testId}>
            <Progress theme="circle" trackColor={trackColor} />
          </div>,
        );
        const instance = await waitFor(() => getByTestId(testId));
        expect(instance.querySelector(`.t-progress__circle-outer`).getAttribute('stroke')).toEqual(trackColor);
      });
    });
  });

  describe(':props other', () => {
    it('strokeWidth && theme && status && label', async () => {
      // 场景设置
      const progressList: any[] = [
        {
          key: 0,
          label: 'label test',
          strokeWidth: 120,
          theme: 'line',
          targetClass: 't-progress__bar',
          status: 'active',
          percentage: 100,
        },
        {
          key: 1,
          label: () => 'label test',
          strokeWidth: 120,
          theme: 'line',
          targetClass: 't-progress__bar',
          status: 'success',
          percentage: 80,
        },
        {
          key: 2,
          label: false,
          strokeWidth: 120,
          theme: 'line',
          targetClass: 't-progress__bar',
          status: 'warning',
          percentage: 80,
        },
        {
          key: 3,
          label: true,
          strokeWidth: 120,
          theme: 'line',
          targetClass: 't-progress__bar',
          status: 'error',
          percentage: 80,
        },
        {
          key: 4,
          label: true,
          strokeWidth: '120px',
          theme: 'plump',
          targetClass: 't-progress__bar',
          status: 'success',
          percentage: 10,
        },
        {
          key: 5,
          label: true,
          strokeWidth: 120,
          theme: 'plump',
          targetClass: 't-progress__bar',
          status: 'error',
          percentage: 80,
        },
        {
          key: 6,
          label: true,
          strokeWidth: 120,
          theme: 'circle',
          targetClass: 't-progress__circle-inner',
          status: 'success',
          percentage: 80,
        },
      ];

      const createProgressTest = async (progress: any) => {
        const testId = `progress test scene ${progress.key}`;
        const { getByTestId, container } = render(
          <div data-testid={testId}>
            <Progress
              label={progress.label}
              strokeWidth={progress.strokeWidth}
              theme={progress.theme}
              status={progress.status}
              percentage={progress.percentage}
            />
          </div>,
        );
        const instance = await waitFor(() => getByTestId(testId));

        // label props
        if (progress.label) {
          if (typeof progress.label === 'string') {
            expect(instance.querySelector(`.t-progress__info`)).toHaveTextContent(progress.label);
          } else if (typeof progress.label === 'function') {
            expect(instance.querySelector(`.t-progress__info`)).toHaveTextContent(progress.label());
          } else {
            if (progress.status && progress.theme !== 'plump') {
              // line、 circle 会根据 statue 使用默认图标
              const icon = container.querySelector('.t-progress__info svg');
              expect(icon).toBeInTheDocument();
              return;
            }

            expect(instance.querySelector(`.t-progress__info`)).toHaveTextContent(`${progress.percentage}%`);
          }
        } else {
          // label = false
          expect(instance.querySelector(`.t-progress__info`)).toBeFalsy();
        }

        // strokeWidth, color and percentage props
        if (progress.theme !== 'circle') {
          const height = typeof progress.strokeWidth === 'number' ? `${progress.strokeWidth}px` : progress.strokeWidth;

          expect(instance.querySelector(`.${progress.targetClass}`)).toHaveStyle(
            `height: ${height}; border-radius: ${height};`,
          );

          expect(instance.querySelector(`.t-progress__inner`)).toHaveStyle(`width: ${progress.percentage}%;`);
        } else {
          const size = 112;
          const circleStokeWidth = getCircleStokeWidth(progress.strokeWidth, size);
          const strokeLinecap = circleStokeWidth < 30 ? 'round' : 'buff';
          expect(instance.querySelector(`.${progress.targetClass}`)).toHaveStyle(
            `stroke: ${progress.color}; stroke-linecap: ${strokeLinecap}`,
          );
        }
      };
      await createProgressTest(progressList[0]);
      await createProgressTest(progressList[1]);
      await createProgressTest(progressList[2]);
      await createProgressTest(progressList[3]);
      await createProgressTest(progressList[4]);
      await createProgressTest(progressList[5]);
      await createProgressTest(progressList[6]);
    });
  });
});
