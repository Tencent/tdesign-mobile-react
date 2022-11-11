import React from 'react';
import { render, screen, vi, fireEvent } from '@test/utils';
import { ChevronRightIcon, AppIcon } from 'tdesign-icons-react';
import { Avatar } from 'tdesign-mobile-react';
import Cell from '../Cell';

const alignList = ['top', 'middle', 'bottom'] as const;
const avatarUrl = 'https://tdesign.gtimg.com/mobile/demos/avatar_1.png';

describe('Cell 组件测试', () => {
  it('create', () => {
    const { container } = render(<Cell title="单行标题" />);
    expect(container.firstChild).toHaveClass('t-cell');
    const title = container.querySelector('.t-cell__title');
    expect(title.textContent.trim()).toBe('单行标题');
    expect(screen.getByText('单行标题')).toBeDefined();
  });

  it('required render', () => {
    const { container } = render(<Cell title="单行标题" required />);
    expect(container.querySelector('.t-cell--required')).toBeTruthy();
    expect(container.querySelector('.t-cell--required').textContent.trim()).toBe('*');
  });

  it('arrow render', () => {
    const { container } = render(<Cell title="单行标题" arrow />);
    expect(container.querySelector('.t-cell__right-icon')).toBeTruthy();
    expect(container.querySelector('.t-icon-chevron-right')).toBeTruthy();
  });

  it('note render', async () => {
    const { container } = render(<Cell title="单行标题" note="辅助信息" />);
    const note = container.querySelector('.t-cell__note');
    expect(note).toBeTruthy();
    expect(note.textContent).toBe('辅助信息');
  });

  it('left icon render', async () => {
    const { container } = render(<Cell title="单行标题" leftIcon={<AppIcon />}></Cell>);
    const icon = container.querySelector('.t-cell__left-icon');
    expect(icon).toBeTruthy();
    expect(icon.querySelector('.t-icon-app')).toBeTruthy();
  });

  it('border render', async () => {
    const { container: container1 } = render(<Cell title="单行标题"></Cell>);
    expect(container1.firstChild).toHaveClass('t-cell--bordered');
    const { container: container2 } = render(<Cell title="单行标题" bordered={false}></Cell>);
    expect(container2.firstChild).not.toHaveClass('t-cell--bordered');
  });

  it('align render', async () => {
    alignList.forEach((a) => {
      const { container } = render(<Cell title="单行标题" align={a}></Cell>);
      expect(container.firstChild).toHaveClass(`t-cell--${a}`);
    });
  });

  it('description render', async () => {
    const { container } = render(<Cell title="单行标题" description="描述信息"></Cell>);
    expect(screen.findByText('描述信息')).toBeDefined();
    expect(container.querySelector('.t-cell__description')).toBeTruthy();
    expect(container.querySelector('.t-cell__description').textContent).toBe('描述信息');
  });

  it('image render', async () => {
    const { container } = render(<Cell title="单行标题" image={avatarUrl}></Cell>);
    const img = container.querySelector('.t-cell__left-icon > img');
    expect(img).toBeTruthy();
    expect(img.getAttribute('src')).toBe(avatarUrl);
  });

  it('slot render', async () => {
    const slots = {
      leftIcon: <Avatar shape="circle" image={avatarUrl}></Avatar>,
      rightIcon: <ChevronRightIcon />,
    };
    const { container } = render(<Cell title="单行标题" leftIcon={slots.leftIcon} rightIcon={slots.rightIcon}></Cell>);
    const leftIcon = container.querySelector('.t-cell__left-icon');
    expect(leftIcon).toBeTruthy();
    expect(leftIcon.querySelector('.t-avatar')).toBeTruthy();
    const rightIcon = container.querySelector('.t-cell__right-icon');
    expect(rightIcon).toBeTruthy();
    expect(rightIcon.querySelector('.t-icon-chevron-right')).toBeTruthy();
  });

  it('click trigger', async () => {
    const mockClickEvent = vi.fn();
    const { container } = render(<Cell title="单行标题" onClick={mockClickEvent}></Cell>);
    fireEvent.click(container.firstChild);
    expect(mockClickEvent).toHaveBeenCalled();
    expect(mockClickEvent).toHaveBeenCalledTimes(1);
  });
});
