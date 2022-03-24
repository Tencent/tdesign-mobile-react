import React from 'react';
import { LocationIcon } from 'tdesign-icons-react';
import { Button } from 'tdesign-mobile-react/button';
import { Toast } from 'tdesign-mobile-react';
import TDemoBlock from '../../../site/mobile/components/DemoBlock';

export default function () {
  const onlyText = () => {
    Toast({ message: '轻提示文字内容', duration: 11000 });
  };

  const iconColumn = () => {
    Toast({ icon: <LocationIcon />, direction: 'column' });
  };

  const iconHori = () => {
    Toast({ message: '地点', icon: <LocationIcon /> });
  };

  const textMaxHeight = () => {
    Toast({
      message: '这是一段很长的文字超级长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
    });
  };

  const successHori = () => {
    Toast.success({ message: '成功' });
  };

  const failHori = () => {
    Toast.fail({ message: '失败' });
  };

  const warningHori = () => {
    Toast.warning({ message: '警告' });
  };

  const successColumn = () => {
    Toast.success({ message: '成功', direction: 'column' });
  };

  const failColumn = () => {
    Toast.fail({ message: '失败', direction: 'column' });
  };

  const warningColumn = () => {
    Toast.warning({ message: '警告', direction: 'column' });
  };

  const loadingHori = () => {
    Toast.loading({ message: '加载中' });
  };

  const loadingColumn = () => {
    Toast.loading({ message: '加载中', direction: 'column' });
  };

  return (
    <div className="tdesign-mobile-demo">
      <TDemoBlock title="01 类型" summary="基础提示">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={onlyText}>
              纯文本
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={iconHori}>
              带图标-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={iconColumn}>
              带图标-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={textMaxHeight}>
              纯文本最大高度
            </Button>
          </li>
        </ul>
      </TDemoBlock>
      <TDemoBlock title="" summary="默认提示">
        <ul className="toast-container">
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={successHori}>
              成功-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={failHori}>
              失败-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={warningHori}>
              警告-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={loadingHori}>
              加载-横向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={successColumn}>
              成功-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={failColumn}>
              失败-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={warningColumn}>
              警告-竖向
            </Button>
          </li>
          <li>
            <Button className="toast-btn" theme="primary" variant="outline" onClick={loadingColumn}>
              加载-竖向
            </Button>
          </li>
        </ul>
      </TDemoBlock>
    </div>
  );
}
