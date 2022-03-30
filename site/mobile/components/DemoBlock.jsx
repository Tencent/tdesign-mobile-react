import React from 'react';

const TDemoBlock = (prop) => {
  const { children, title, summary } = prop;
  return (
    <>
      <div className="tdesign-mobile-demo-block">
        <h2 v-if="title" className="tdesign-mobile-demo-block__title" hidden={!title}>
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
