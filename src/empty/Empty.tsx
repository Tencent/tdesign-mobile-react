import React from 'react';
import TImage from '../image';
import { TdEmptyProps } from './type';
import { StyledProps } from '../common';
import { parseContentTNode } from '../_util/parseTNode';
import { usePrefixClass } from '../hooks/useClass';

export interface EmptyProps extends TdEmptyProps, StyledProps {}

const Empty: React.FC<EmptyProps> = (props) => {
  const { action, description, icon, image } = props;

  const emptyClass = usePrefixClass('empty');

  const renderThumb = () => {
    const tNodeImage = parseContentTNode(image, {});
    if (tNodeImage) {
      if (typeof image === 'string') {
        return typeof tNodeImage === 'string' && <TImage src={image} />;
      }
      return tNodeImage;
    }

    const tNodeIcon = parseContentTNode(icon, {});
    if (tNodeIcon) {
      return <div className={`${emptyClass}__icon`}>{tNodeIcon}</div>;
    }
    return null;
  };

  return (
    <div className={`${emptyClass}`}>
      <div className={`${emptyClass}__thumb`}>{renderThumb()}</div>
      {description && <div className={`${emptyClass}__description`}>{description}</div>}
      {action && <div className={`${emptyClass}__actions`}>{action}</div>}
    </div>
  );
};

export default Empty;
