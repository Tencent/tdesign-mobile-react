import React from 'react';
import './style/index.less';

const TDemoBlock = (prop) => {
  const { children, title, summary } = prop;
  return (
    <>
      <div className="tdesign-mobile-demo-block">
        {title && <h2 className="tdesign-mobile-demo-block__title">{title}</h2>}
        {summary && <p className="tdesign-mobile-demo-block__summary">{summary}</p>}
        {children}
      </div>
    </>
  );
};

export default TDemoBlock;
