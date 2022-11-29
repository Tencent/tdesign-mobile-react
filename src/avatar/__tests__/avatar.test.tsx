import { UserIcon } from 'tdesign-icons-react';
import React from 'react';
import { render, vi, fireEvent } from '@test/utils';
import Avatar from '../Avatar';
import { ShapeEnum } from '../type';

const userIcon = <UserIcon />;

const shapeList = ['circle', 'round'] as ShapeEnum[];
const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';

const sizeList = ['small', 'medium', 'large'];

describe('avatar', () => {
  describe('props', async () => {
    it(': icon', async () => {
      const { container } = render(<Avatar icon={userIcon} />);
      expect(container.getElementsByClassName('t-icon-user')).toBeTruthy();
      expect(container.getElementsByClassName('t-icon-user')).toHaveLength(1);
    });

    it(': text', async () => {
      const { container } = render(<Avatar>A</Avatar>);
      const span = container.getElementsByClassName('t-avatar__inner');
      expect(span.length).toBe(1);
      expect(span[0].textContent).toBe('A');
    });

    it(': shape', async () => {
      shapeList.forEach((s) => {
        const { container } = render(<Avatar image={IMAGE} shape={s}></Avatar>);
        const AvatarNodes = container.getElementsByClassName('t-avatar');
        expect(AvatarNodes).toHaveLength(1);
        expect(AvatarNodes[0].classList.contains(`t-avatar--${s}`)).toBeTruthy();
      });
    });

    it(': size', async () => {
      sizeList.forEach((s) => {
        const { container } = render(<Avatar image={IMAGE} size={s}></Avatar>);
        const el = container.querySelector('.t-avatar');
        expect(el.classList.contains(`t-size-${s?.slice(0, 1)}`)).toBe(true);
      });
    });

    it(': badge', async () => {
      const { container } = render(<Avatar image={IMAGE} badgeProps={{ count: 10 }}></Avatar>);
      const badgeNode = container.querySelector('.t-badge');
      expect(badgeNode).toBeTruthy();
      expect(badgeNode.textContent).toBe('10');
    });

    it(': onLoad', async () => {
      const onError = vi.fn();
      const { container } = render(<Avatar image={IMAGE} onError={onError} />);
      const img = container.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe(IMAGE);
      fireEvent.error(img);
      expect(onError).toBeCalledTimes(1);
    });
  });
});
