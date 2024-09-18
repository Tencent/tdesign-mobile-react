import { describe, vi } from '@test/utils';
import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import { Stepper } from '../index';

const prefix = 't';
const baseClass = `.${prefix}-stepper`;

describe('stepper', () => {
  describe('props', () => {
    it(': disableInput', () => {
      const { container } = render(<Stepper disableInput></Stepper>);
      const $stepperItem = container.querySelector('.t-stepper__input') as HTMLElement;
      expect($stepperItem.classList.contains(`${baseClass}--disabled`));
    });

    it(': disabled', () => {
      const { container } = render(<Stepper disabled></Stepper>);
      const $stepperItem = container.querySelector('.t-stepper__input') as HTMLElement;
      expect($stepperItem.classList.contains(`${baseClass}--disabled`));
    });

    it(': inputWidth', () => {
      const { container } = render(<Stepper inputWidth={100}></Stepper>);
      const $stepperItem = container.querySelector('.t-stepper__input') as HTMLElement;
      expect($stepperItem.style.width).toBe('100px');
    });

    it(': integer', () => {
      const { container } = render(<Stepper integer={false} value={0.5}></Stepper>);
      const $stepperItem = container.querySelector('.t-stepper__input') as HTMLElement;
      expect($stepperItem.getAttribute('value')).toBe('0.5');
    });

    it(': max', () => {
      const { container } = render(<Stepper max={10} value={10}></Stepper>);
      const $stepperItem = container.querySelector('.t-stepper__plus') as HTMLElement;
      expect($stepperItem.classList.contains(`${baseClass}--filled-disabled`));
    });

    it(': min', () => {
      const { container } = render(<Stepper min={1} value={1}></Stepper>);
      const $stepperItem = container.querySelector(`${baseClass}__minus`) as HTMLElement;
      expect($stepperItem.classList.contains(`${baseClass}--filled-disabled`));
    });

    it(': size', () => {
      const size = ['small', 'medium', 'large'] as ('small' | 'medium' | 'large')[];
      size.forEach((s) => {
        const { container } = render(<Stepper size={s}></Stepper>);
        const $stepperItem = container.querySelector(`${baseClass}`) as HTMLElement;
        expect($stepperItem.classList.contains(`${baseClass}--${s}`));
      });
    });

    it(': step', () => {
      const { container } = render(<Stepper theme="filled" defaultValue={0.5} integer={false} step={0.5}></Stepper>);
      const $stepperPlus = container.querySelector('.t-stepper__plus') as HTMLElement;
      const $stepperItem = container.querySelector('.t-stepper__input') as HTMLElement;
      fireEvent.click($stepperPlus);
      expect($stepperItem.getAttribute('value')).toBe('1.0');
    });

    it(': theme', () => {
      const theme = ['normal', 'filled', 'outline'] as ('normal' | 'filled' | 'outline')[];
      theme.forEach((t) => {
        const { container } = render(<Stepper theme={t}></Stepper>);
        const $stepperItem = container.querySelector(`${baseClass}`) as HTMLElement;
        expect($stepperItem.classList.contains(`${baseClass}--${t}`));
      });
    });

    it(': value', () => {
      const { container } = render(<Stepper value={10}></Stepper>);
      const $stepperItem = container.querySelector(`${baseClass}__input`) as HTMLElement;
      expect($stepperItem.getAttribute('value')).toBe('10');
    });

    it(': defaultValue', () => {
      const { container } = render(<Stepper defaultValue={10}></Stepper>);
      const $stepperItem = container.querySelector(`${baseClass}__input`) as HTMLElement;
      expect($stepperItem.getAttribute('value')).toBe('10');
    });
  });

  describe('event', () => {
    it(': blur', async () => {
      const onChange = vi.fn();
      const onBlur = vi.fn();
      const { container } = render(<Stepper defaultValue={99} onBlur={onBlur} onChange={onChange} />);
      const $input = container.querySelector(`${baseClass}__input`) as HTMLElement;
      fireEvent.blur($input);
      expect(onBlur).toHaveBeenCalled();
    });

    it(': change', async () => {
      const onChange = vi.fn();
      const { container } = render(<Stepper defaultValue={99} onChange={onChange} />);
      const $minusBtn = container.querySelector(`${baseClass}__minus`) as HTMLElement;
      fireEvent.click($minusBtn);
      expect(onChange).toHaveBeenCalled();
    });

    it(': overlimit', async () => {
      const onOverlimit = vi.fn();
      const { container } = render(<Stepper defaultValue={10} max={10} onOverlimit={onOverlimit} />);
      const $plusBtn = container.querySelector(`${baseClass}__plus`) as HTMLElement;
      fireEvent.click($plusBtn);
      expect(onOverlimit).toHaveBeenCalled();
    });

    it(': focus', async () => {
      const onFocus = vi.fn();
      const { container } = render(<Stepper defaultValue={10} max={10} onFocus={onFocus} />);
      const $input = container.querySelector(`${baseClass}__input`) as HTMLElement;
      fireEvent.focus($input);
      expect(onFocus).toHaveBeenCalled();
    });
  });
});
