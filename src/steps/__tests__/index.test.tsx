import React from 'react';
import { describe, expect, it, render, fireEvent, vi } from '@test/utils';
import { Icon } from 'tdesign-icons-react';
import { Steps, StepItem, StepStatus } from '../index';
import { Image } from '../../image';

const prefix = 't';
const steps = `${prefix}-steps`;
const stepItem = `${prefix}-step-item`;

const items = [
  {
    title: '步骤描述1',
    content: '辅助信息文字最多两行1',
  },
  {
    title: '步骤描述2',
    content: '辅助信息文字最多两行2',
  },
  {
    title: '步骤描述3',
    content: '辅助信息文字最多两行3',
  },
];
const itemStatus = [
  {
    title: '步骤描述1',
    content: '辅助信息文字最多两行1',
    status: 'error',
  },
  {
    title: '步骤描述2',
    content: '辅助信息文字最多两行2',
    status: 'process',
  },
];

describe('Steps', () => {
  describe('props', () => {
    it('layout & theme', () => {
      const { container } = render(
        <Steps current={0} theme="dot" layout="vertical">
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      expect(container.querySelector(`.${steps}`).classList.contains(`${steps}--vertical`)).toBeTruthy();
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      expect($stepItems.length).toEqual(items.length);
      $stepItems.forEach((item, index) => {
        expect(item.querySelector(`.${stepItem}__dot`)).toBeTruthy();
        if (index === $stepItems.length - 1) {
          expect(item.querySelector(`.${stepItem}__line`)).toBeNull();
        } else {
          expect(item.querySelector(`.${stepItem}__line`)).toBeTruthy();
        }
      });
    });

    it('readonly', () => {
      const onClick = vi.fn();
      const { container } = render(
        <Steps current={0} readonly onChange={onClick}>
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      fireEvent.click($stepItems[1]);
      expect(onClick).toHaveBeenCalledTimes(0);
    });

    it('currentStatus', () => {
      const current = 1;
      const { container } = render(
        <Steps current={current} currentStatus="error" layout="vertical">
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} icon={<Icon name="cart" size="20px" />} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      const getStatus = (index) => {
        if (index < current) {
          return 'finish';
        }
        if (index === current) {
          return 'error';
        }
        return 'default';
      };
      $stepItems.forEach((item, index) => {
        expect(item.classList.contains(`${stepItem}--${getStatus(index)}`));
      });
    });

    it('sequence', () => {
      const { container } = render(
        <Steps current={0} sequence="reverse">
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      $stepItems.forEach((item, index) => {
        if (index === 0) {
          expect(item.querySelector(`.${stepItem}__line`)).toBeNull();
        } else {
          expect(item.querySelector(`.${stepItem}__line`)).toBeTruthy();
        }
      });
    });

    it('change steps', () => {
      const stepItems = [...items];
      const { container, rerender } = render(
        <Steps current={0} sequence="reverse">
          {stepItems.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      stepItems.pop();
      rerender(
        <Steps current={0} sequence="reverse">
          {stepItems.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      expect(container.querySelectorAll(`.${stepItem}`).length).toEqual(stepItems.length);
    });
  });

  describe('events', () => {
    it('onChange', () => {
      const onClick = vi.fn();
      const { container } = render(
        <Steps current={0} onChange={onClick}>
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      fireEvent.click($stepItems[1]);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(
        1,
        0,
        expect.objectContaining({
          e: expect.objectContaining({
            type: 'click',
          }),
        }),
      );
    });
  });
});

describe('StepItem', () => {
  describe('props', () => {
    it('title and content', () => {
      const { container } = render(
        <Steps current={0} theme="dot" layout="vertical">
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);

      $stepItems.forEach((item, index) => {
        expect(item.querySelector(`.${stepItem}__title`).textContent).toBe(items[index].title);
        expect(item.querySelector(`.${stepItem}__description`).textContent).toBe(items[index].content);
      });
    });

    it('icon', () => {
      const { container } = render(
        <Steps current={0} layout="vertical">
          {items.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} icon={<Icon name="cart" size="20px" />} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      $stepItems.forEach((item) => {
        expect(item.querySelector(`.${stepItem}__icon`)).toBeTruthy();
        expect(item.querySelector(`.${prefix}-icon-cart`)).toBeTruthy();
      });
    });

    it('extra', () => {
      const { container } = render(
        <Steps defaultCurrent={0}>
          {items.map((item, index) => (
            <StepItem
              key={index}
              title={item.title}
              content={item.content}
              extra={
                index === 1 && (
                  <Image src="https://tdesign.gtimg.com/mobile/demos/steps1.png" alt="图标" style={{ width: '100%' }} />
                )
              }
            />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      const $extra = $stepItems[1].querySelector(`.${stepItem}__extra`);
      expect($extra).toBeTruthy();
      expect($extra.querySelector('img')).toBeTruthy();
    });

    it('status', () => {
      const current = 1;
      const { container } = render(
        <Steps current={current}>
          {itemStatus.map((item, index) => (
            <StepItem key={index} title={item.title} content={item.content} status={item.status as StepStatus} />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      $stepItems.forEach((item, index) => {
        expect(item.classList.contains(`${stepItem}--${itemStatus[index].status}`));
      });
    });

    it('titleRight', () => {
      const { container } = render(
        <Steps defaultCurrent={0} layout="vertical">
          {items.map((item, index) => (
            <StepItem
              key={index}
              title={item.title}
              content={item.content}
              titleRight={<Icon name="chevron-right" size="22px" color="rgba(0, 0, 0, .4)" />}
            />
          ))}
        </Steps>,
      );
      const $stepItems = container.querySelectorAll(`.${stepItem}`);
      $stepItems.forEach((item) => {
        expect(item.querySelector(`.${prefix}-icon.${prefix}-icon-chevron-right`)).toBeTruthy();
      });
      const { container: container2 } = render(
        <Steps defaultCurrent={0}>
          {items.map((item, index) => (
            <StepItem
              key={index}
              title={item.title}
              content={item.content}
              titleRight={<Icon name="chevron-right" size="22px" color="rgba(0, 0, 0, .4)" />}
            />
          ))}
        </Steps>,
      );
      const $stepItems2 = container2.querySelectorAll(`.${stepItem}`);
      $stepItems2.forEach((item) => {
        expect(item.querySelector(`.${prefix}-icon`)).toBeNull();
      });
    });
  });
});
