import React from 'react';
import TImage from '../image';
import { TdFooterProps } from './type';
import { StyledProps } from '../common';
import { footerDefaultProps } from './defaultProps';
import { usePrefixClass } from '../hooks/useClass';
import useDefaultProps from '../hooks/useDefaultProps';

export interface FooterProps extends TdFooterProps, StyledProps {}

const Footer: React.FC<FooterProps> = (originProps) => {
  const props = useDefaultProps(originProps, footerDefaultProps);

  const { links, text, logo } = props;

  const footerClass = usePrefixClass('footer');
  const footerLinkClass = usePrefixClass('footer__link');

  const renderLogo = () =>
    logo && (
      <a className={`${footerClass}__logo`} href={logo.url} target={logo.target}>
        {logo.icon && <TImage className={`${footerClass}__icon`} src={logo.icon} />}
        {logo.title && <span className={`${footerClass}__title`}>{logo.title}</span>}
      </a>
    );

  const renderText = () => text && <div className={`${footerClass}__text`}>{text}</div>;

  const renderLink = () => {
    const linksLength = links.length - 1;
    if (logo || linksLength < 0) {
      return;
    }

    return (
      <div className={`${footerLinkClass}-list`}>
        {links.map((link, index) => (
          <>
            <a href={link.url} target={link.target} className={`${footerLinkClass}-item`}>
              {link.name}
            </a>
            {linksLength !== index && <div className={`${footerLinkClass}-line`}>|</div>}
          </>
        ))}
      </div>
    );
  };

  return (
    <div className={`${footerClass}`}>
      {renderLogo()}
      {renderLink()}
      {renderText()}
    </div>
  );
};

Footer.displayName = 'Footer';

export default Footer;
