import React from 'react';
import { render } from '@test/utils';
import AvatarGroup from '../AvatarGroup';
import Avatar from '../Avatar';

const IMAGE = 'https://tdesign.gtimg.com/site/avatar.jpg';

describe('avatar', async () => {
  it(': create', async () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
      </AvatarGroup>,
    );
    const groupNode = container.querySelector('.t-avatar-group');
    expect(groupNode).toBeTruthy();

    const avatarList = container.querySelectorAll('.t-avatar');
    expect(avatarList.length).toBe(2);
    expect(avatarList[0].classList.contains('t-avatar')).toBeTruthy();
    expect(avatarList[1].classList.contains('t-avatar')).toBeTruthy();
  });

  it(': cascading', async () => {
    const { container } = render(
      <AvatarGroup cascading="left-up">
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
      </AvatarGroup>,
    );
    const groupNode = container.querySelector('.t-avatar-group');
    expect(groupNode.classList.contains('t-avatar--offset-left')).toBeTruthy();
  });

  it(': max', async () => {
    const { container } = render(
      <AvatarGroup max={1}>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
        <Avatar image={IMAGE}></Avatar>
      </AvatarGroup>,
    );
    const avatarList = container.querySelectorAll('.t-avatar img');
    expect(avatarList.length).toBe(1);
  });
});
