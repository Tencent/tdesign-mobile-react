import React from 'react';
import { describe, it, expect, render, vi, fireEvent, beforeEach, afterEach } from '@test/utils';

import Cascader from '../Cascader';

const prefix = 't';
const name = `.${prefix}-cascader`;

const data = {
  areaList: [
    {
      label: '北京市',
      value: '110000',
      children: [
        {
          value: '110100',
          label: '北京市',
          children: [
            { value: '110101', label: '东城区' },
            { value: '110102', label: '西城区' },
            { value: '110105', label: '朝阳区' },
            { value: '110106', label: '丰台区' },
            { value: '110107', label: '石景山区' },
            { value: '110108', label: '海淀区' },
            { value: '110109', label: '门头沟区' },
            { value: '110111', label: '房山区' },
            { value: '110112', label: '通州区' },
            { value: '110113', label: '顺义区' },
            { value: '110114', label: '昌平区' },
            { value: '110115', label: '大兴区' },
            { value: '110116', label: '怀柔区' },
            { value: '110117', label: '平谷区' },
            { value: '110118', label: '密云区' },
            { value: '', label: '' },
          ],
        },
      ],
    },
    {
      label: '天津市',
      value: '120000',
      children: [
        {
          value: '120100',
          label: '天津市',
          children: [
            { value: '120101', label: '和平区' },
            { value: '120102', label: '河东区' },
            { value: '120103', label: '河西区' },
            { value: '120104', label: '南开区' },
            { value: '120105', label: '河北区' },
            { value: '120106', label: '红桥区' },
            { value: '120110', label: '东丽区' },
            { value: '120111', label: '西青区' },
            { value: '120112', label: '津南区' },
            { value: '120113', label: '北辰区' },
            { value: '120114', label: '武清区' },
            { value: '120115', label: '宝坻区' },
            { value: '120116', label: '滨海新区' },
            { value: '120117', label: '宁河区' },
            { value: '120118', label: '静海区' },
            { value: '120119', label: '蓟州区' },
          ],
        },
      ],
    },
  ],
};

describe('Cascader', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('props', () => {
    it(': visible', async () => {
      const onClose = vi.fn();
      await render(<Cascader options={data.areaList} onClose={onClose} visible={true} value="110000" />);
      expect(document.querySelector(`.${prefix}-popup`)).not.toHaveStyle({ display: 'none' });
      fireEvent.click(document.querySelector('.t-overlay'));
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it(': closeBtn', async () => {
      await render(<Cascader options={data.areaList} closeBtn={true} visible={true} value="110000" theme="tab" />);
      expect(document.querySelector(`.${prefix}-icon-close`)).toBeTruthy();
    });

    it(': closeBtn - custom', async () => {
      await render(
        <Cascader
          options={data.areaList}
          closeBtn={<span className="close-button">Button</span>}
          visible={true}
          value="110000"
          theme="tab"
        />,
      );
      expect(document.querySelector('.close-button')).toBeTruthy();
    });

    it(': title', async () => {
      const title = '标题';
      await render(<Cascader options={data.areaList} title={title} visible={true} value="110000" theme="tab" />);
      expect(document.querySelector(`${name}__title`).innerHTML).toBe(title);
    });

    it(': options', async () => {
      await render(<Cascader options={data.areaList} visible={true} value="110000" theme="tab" />);
      expect(document.querySelectorAll(`${name}__options`).length).toBe(1);
      expect(document.querySelectorAll(`.${prefix}-radio`).length).toBe(2);
    });

    it(': value', async () => {
      await render(<Cascader options={data.areaList} visible={true} value="110114" />);
      expect(document.querySelector(`${name}__step-label--active`).innerHTML).toBe('昌平区');
    });

    it(': placeholder', async () => {
      const placeholder = '请选择';
      await render(<Cascader options={data.areaList} placeholder={placeholder} visible={true} />);
      expect(document.querySelector(`${name}__step-label--active`).innerHTML).toBe(placeholder);
    });

    it(': theme - step', async () => {
      await render(<Cascader options={data.areaList} visible={true} value="110000" theme="step" />);
      expect(document.querySelector(`${name}__steps`)).toBeTruthy();
    });

    it(': subTitles', async () => {
      const subTitles = ['一级', '二级', '三级'];
      await render(<Cascader options={data.areaList} subTitles={subTitles} visible={true} theme="tab" />);
      expect(document.querySelector(`${name}__options-title`).innerHTML).toBe(subTitles[0]);
    });

    it(': checkStrictly', async () => {
      const onChange = vi.fn();
      const { rerender } = await render(
        <Cascader
          options={data.areaList}
          onChange={onChange}
          closeBtn={<span style={{ color: '#0052d9' }}>确定</span>}
          checkStrictly={true}
          visible={true}
          value="110000"
        />,
      );
      fireEvent.click(document.querySelectorAll(`.${prefix}-radio`)[0]);
      fireEvent.click(document.querySelector(`${name}__close-btn`));
      expect(onChange).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith('110000', [{ value: '110000', label: '北京市' }]);

      rerender(
        <Cascader
          options={[
            {
              label: '',
              value: '',
            },
          ]}
          onChange={onChange}
          closeBtn={<span style={{ color: '#0052d9' }}>确定</span>}
          checkStrictly={true}
          visible={true}
          value="110000"
        />,
      );
      fireEvent.click(document.querySelectorAll(`.${prefix}-radio`)[0]);
      expect(onChange).toHaveBeenCalledWith('', [{ value: '', label: '' }]);
    });
  });

  describe('events', () => {
    it(': onChange', async () => {
      const onChange = vi.fn();
      const { rerender } = await render(
        <Cascader options={data.areaList} onChange={onChange} visible={true} value="110114" />,
      );
      fireEvent.click(document.querySelectorAll(`${name}__step`)[1]);
      fireEvent.click(document.querySelectorAll(`.${prefix}-radio`)[6]);
      expect(onChange).toHaveBeenCalled();

      rerender(<Cascader options={data.areaList} onChange={onChange} visible={true} value="110114" theme="tab" />);
      fireEvent.click(document.querySelectorAll(`.${prefix}-tabs__item`)[1]);
      fireEvent.click(document.querySelectorAll(`.${prefix}-radio`)[2]);
      fireEvent.click(document.querySelectorAll(`.${prefix}-tabs__item`)[2]);
      fireEvent.click(document.querySelectorAll(`.${prefix}-radio`)[4]);
      expect(onChange).toHaveBeenCalledTimes(2);
    });

    it(': onPick', async () => {
      const onPick = vi.fn();
      await render(<Cascader options={data.areaList} onPick={onPick} visible={true} value="110000" theme="tab" />);
      fireEvent.click(document.querySelectorAll(`.${prefix}-radio`)[1]);
      expect(onPick).toHaveBeenCalled();
    });

    it(': onClose', async () => {
      const onClose = vi.fn();
      await render(<Cascader options={data.areaList} onClose={onClose} visible={true} value="110000" theme="tab" />);
      fireEvent.click(document.querySelector(`.${prefix}-icon-close`));
      expect(onClose).toHaveBeenCalled();
    });
  });
});
