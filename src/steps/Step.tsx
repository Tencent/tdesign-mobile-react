import React, { FC, ReactNode } from 'react';
import c from 'classnames';

interface StepPropsTypes extends PubStepPropsTypes, InnerStepPropsTypes {}

interface PubStepPropsTypes {
  title: string | ReactNode;
  description: string | ReactNode;
  icon: string | ReactNode;
  status: 'wait' | 'process' | 'finish' | 'error';
}

interface InnerStepPropsTypes {
  active?: boolean;
  isLast?: boolean;
}

const Step: FC<StepPropsTypes> = (props) => {
  const { title, description, icon, status } = props;

  return (
    <div className={c('tdm-step-container', `step-stauts-${status}`)}>
      <div className="tdm-step-indicator">
        <div className="tdm-step-icon-container">
          <div className={c('tdm-step-icon-dot', { 'is-icon': icon })}>{icon}</div>
        </div>
      </div>
      <div className="tdm-step-content">
        <div className="tdm-step-title">{title}</div>
        <div className="tdm-step-description">{description}</div>
      </div>
    </div>
  );
};

export default Step;
