import React from 'react';
import { describe, expect, it, render, vi } from '@test/utils';
import { UserIcon, UserAddIcon } from 'tdesign-icons-react';
import { Avatar, AvatarGroup } from '../index';

describe('Avatar', () => {
  describe('props', () => {
    it(': image', async () => {
      const image = 'https://tdesign.gtimg.com/mobile/demos/avatar1.png';
      const { container } = render(<Avatar image={image} />);

      expect(container.querySelector(`.t-image__img`)).toBeTruthy();
      expect((container.querySelector(`.t-image__img`) as HTMLImageElement).src).toBe(image);
    });

    it(': shape', () => {
      const testShape = (shape, target) => {
        const { container } = render(<Avatar shape={shape}>A</Avatar>);
        expect(container.querySelector(target)).toBeTruthy();
      };
      testShape(undefined, '.t-avatar--circle');
      testShape('circle', '.t-avatar--circle');
      testShape('round', '.t-avatar--round');
    });

    it(': slot', () => {
      const testSlot = (content) => {
        const { getByText } = render(<Avatar>{content}</Avatar>);
        expect(getByText(content).textContent).toBeTruthy();
      };
      testSlot('A');
      testSlot('B');
    });

    it(': icon', () => {
      const { container } = render(<Avatar icon={<UserIcon />} />);
      expect(container.querySelector('.t-avatar__icon')).toBeTruthy();
    });

    it(': badge', () => {
      const count = 8;
      const { container } = render(<Avatar badgeProps={{ count, offset: [6, 6] }} icon={<UserIcon />} />);
      expect(container.querySelector('.t-badge--basic')).toBeTruthy();
      expect(container.querySelector('.t-badge--basic').innerHTML.trim()).toBe(`${count}`);
    });

    it(': size', () => {
      const testSize = (size, target) => {
        const { container } = render(<Avatar size={size}>A</Avatar>);
        expect(container.querySelector(target)).toBeTruthy();
      };
      testSize(undefined, '.t-avatar--medium');
      testSize('small', '.t-avatar--small');
      testSize('large', '.t-avatar--large');
    });

    it(': error', async () => {
      const onError = vi.fn();
      const { container } = render(<Avatar image={' '} onError={onError} />);

      container.querySelector('img').dispatchEvent(new Event('error'));
      expect(onError).toHaveBeenCalled();
    });
  });
});

describe('AvatarGroup', () => {
  describe('props', () => {
    const imageList = [
      'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar1.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar2.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar3.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar4.png',
      'https://tdesign.gtimg.com/mobile/demos/avatar5.png',
    ];

    it(': max', () => {
      const max = 5;
      const { container } = render(
        <AvatarGroup cascading="left-up" max={max}>
          {imageList.map((url, index) => (
            <Avatar key={`exhibition-${index}`} shape="circle" image={url} />
          ))}
        </AvatarGroup>,
      );

      expect(container.querySelector('.t-avatar__wrapper')).toBeTruthy();
      expect(container.querySelectorAll('.t-avatar__wrapper').length).toBe(max + 1);
    });

    it(': collapseAvatar', () => {
      const { container } = render(
        <AvatarGroup max={5} collapseAvatar={<UserAddIcon style={{ fontSize: '24px' }} />}>
          {imageList.map((url, index) => (
            <Avatar key={`action-${index}`} shape="circle" image={url} />
          ))}
        </AvatarGroup>,
      );
      expect(container.querySelector('.t-icon-user-add')).toBeTruthy();
    });
  });
});
