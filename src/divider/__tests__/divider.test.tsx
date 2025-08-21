// @ts-nocheck
import React from 'react';
import { describe, expect, it, render } from '@test/utils';
import Divider from '../Divider';

describe('Divider Component', () => {
  ['left', 'right', 'center'].forEach((item) => {
    it(`props.align is equal to ${item}`, () => {
      const { container } = render(<Divider align={item}>Text</Divider>);
      expect(container.firstChild).toHaveClass(`t-divider--${item}`);
      expect(container).toMatchSnapshot();
    });
  });

  ['horizontal', 'vertical'].forEach((item) => {
    it(`props.layout is equal to ${item}`, () => {
      const { container } = render(<Divider layout={item} />);
      expect(container.firstChild).toHaveClass(`t-divider--${item}`);
      expect(container).toMatchSnapshot();
    });
  });

  it('props.content works fine', () => {
    const { container } = render(<Divider content={() => <span className="custom-node">TNode</span>} />);
    expect(container.querySelector('.custom-node')).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it('props.content is a string', () => {
    const { container } = render(<Divider content="TDesign" />);
    expect(container.textContent).toBe('TDesign');
    expect(container).toMatchSnapshot();
  });

  it('props.dashed works fine', () => {
    // dashed default value is false
    const wrapper1 = render(<Divider />);
    expect(wrapper1.container.firstChild).not.toHaveClass('t-divider--dashed');
    expect(wrapper1.container).toMatchSnapshot();
    // dashed = true
    const wrapper2 = render(<Divider dashed={true} />);
    expect(wrapper2.container.firstChild).toHaveClass('t-divider--dashed');
    expect(wrapper2.container).toMatchSnapshot();
    // dashed = false
    const wrapper3 = render(<Divider dashed={false} />);
    expect(wrapper3.container.firstChild).not.toHaveClass('t-divider--dashed');
    expect(wrapper3.container).toMatchSnapshot();
  });

  describe('<slot>', () => {
    it('default', () => {
      const { container } = render(<Divider>TDesign</Divider>);
      expect(container).toMatchSnapshot();
    });

    it('content', () => {
      const { container } = render(
        <Divider>
          <span className="custom-node">TNode</span>
        </Divider>,
      );
      expect(container.querySelector('.custom-node')).toBeTruthy();
      expect(container).toMatchSnapshot();
    });
  });

  it('content prop and default slot exist meanwhile', () => {
    const { container } = render(<Divider content="prop content">TDesign</Divider>);
    expect(container.textContent).toBe('prop content');
    expect(container).toMatchSnapshot();
  });

  describe('vertical divider', () => {
    it('applies dashed class on vertical divider', () => {
      const { container } = render(<Divider layout="vertical" dashed={true} />);
      expect(container.firstChild).toHaveClass('t-divider--dashed');
      expect(container).toMatchSnapshot();
    });

    it('applies align class on vertical divider', () => {
      const { container } = render(
        <Divider layout="vertical" align="left">
          text
        </Divider>,
      );
      expect(container.firstChild).toHaveClass('t-divider--left');
      expect(container).toMatchSnapshot();
    });
  });
});
