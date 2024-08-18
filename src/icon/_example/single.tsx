import React from 'react';
import {
  LettersTIcon,
  LettersDIcon,
  LettersSIcon,
  LettersEIcon,
  LettersIIcon,
  LettersNIcon,
  LettersGIcon,
  ComponentCheckboxIcon,
  ComponentInputIcon,
  ComponentSwitchIcon,
  ComponentBreadcrumbIcon,
  ComponentDropdownIcon,
  ComponentRadioIcon,
  ComponentStepsIcon,
} from 'tdesign-icons-react';

export default function SingleIcon() {
  return (
    <div className="t-demo-iconfont">
      <div className="t-demo-row">
        <LettersTIcon />
        <LettersDIcon />
        <LettersEIcon />
        <LettersSIcon />
        <LettersIIcon />
        <LettersGIcon />
        <LettersNIcon />
      </div>
      <br />
      <div className="t-demo-row">
        <ComponentCheckboxIcon />
        <ComponentBreadcrumbIcon />
        <ComponentInputIcon />
        <ComponentSwitchIcon />
        <ComponentDropdownIcon />
        <ComponentRadioIcon />
        <ComponentStepsIcon />
      </div>
    </div>
  );
}
