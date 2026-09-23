import React, { useState } from 'react';
import { Button, Comment, Image, ImageViewer, Tag } from 'tdesign-mobile-react';
import { ThumbUpIcon, Uncomfortable1Icon } from 'tdesign-icons-react';

const images = [
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
  'https://tdesign.gtimg.com/mobile/demos/swiper1.png',
];

const MAX_SHOW = 3;

export default function ImageDemo() {
  const [visible, setVisible] = useState(false);
  const [viewerIndex, setViewerIndex] = useState(0);

  const showImages = images.slice(0, MAX_SHOW);

  const handleImageClick = (index: number) => {
    setViewerIndex(index);
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  return (
    <div className="mobile-comment">
      <Comment
        avatar={{ shape: 'circle', size: '32px', image: 'https://tdesign.gtimg.com/mobile/demos/avatar1.png' }}
        author={
          <div className="mobile-comment__author">
            <div>Name1 名称</div>
            <Tag className="mobile-comment__author-tag" variant="light" theme="primary" shape="round">
              作者
            </Tag>
          </div>
        }
        content={
          <div className="mobile-comment__images">
            {showImages.map((src, index) => (
              <div key={index} className="mobile-comment__images-item" onClick={() => handleImageClick(index)}>
                <Image src={src} fit="cover" shape="round" style={{ width: 78, height: 78 }} />
                {index === MAX_SHOW - 1 && images.length > MAX_SHOW && (
                  <div className="mobile-comment__images-badge">共{images.length}张</div>
                )}
              </div>
            ))}
          </div>
        }
        actions={[
          { placement: 'start', content: <div className="mobile-comment__reply-button">回复</div>, key: 'reply' },
          {
            placement: 'end',
            content: (
              <div className="mobile-comment__actions">
                <Button className="mobile-comment__actions-button" icon={<ThumbUpIcon size="14px" />} variant="text">
                  6
                </Button>
                <Button
                  icon={<Uncomfortable1Icon size="14px" />}
                  className="mobile-comment__actions-button"
                  variant="text"
                />
              </div>
            ),
            key: 'actions',
          },
        ]}
        datetime="今天16:38·广东"
      />
      <ImageViewer
        images={images}
        visible={visible}
        index={viewerIndex}
        onClose={handleClose}
        onIndexChange={(index) => setViewerIndex(index)}
      />
    </div>
  );
}
