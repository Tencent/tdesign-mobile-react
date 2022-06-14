import React from 'react';
import cls from 'classnames'

const TDemoBlock = (prop) => {
  const { children, title, summary } = prop;
  return (
    <>
      <div className="tdesign-mobile-demo-block">
        <h2 v-if="title" className={cls([
          "tdesign-mobile-demo-block__title", 
          !summary && 'tdesign-mobile-demo-block__title-padding-bottom'
        ])} hidden={!title}>
          {title}
        </h2>
        <p v-if="summary" className="tdesign-mobile-demo-block__summary" hidden={!summary}>
          {summary}
        </p>
        {children}
      </div>
    </>
  );
};

export default TDemoBlock;
