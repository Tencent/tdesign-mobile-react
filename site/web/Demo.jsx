import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from 'tdesign-mobile-react/button';

export const demoFiles = import.meta.globEager('../../src/**/_example/*.jsx');

const demoObject = {};
Object.keys(demoFiles).forEach((key) => {
  const match = key.match(/([\w-]+)._example.([\w-]+).jsx/);
  const [, componentName, demoName] = match;

  demoObject[`${componentName}/${demoName}`] = demoFiles[key].default;
  if (demoObject[componentName]) {
    demoObject[componentName].push(demoName);
  } else {
    demoObject[componentName] = [demoName];
  }
});

export default function Demo() {
  const location = useLocation();
  const match = location.pathname.match(/\/mobile-react\/demos\/([\w-]+)\/?([\w-]+)?/);
  const [, componentName, demoName] = match;
  const demoList = demoObject[componentName];
  const demoFunc = demoObject[`${componentName}/${demoName}`];

  return demoFunc ? demoFunc() : (
    <ul style={{ margin: '48px 200px' }}>
      {
        demoList.map(demoName => (
          <li key={demoName}>
            <Link to={`/mobile-react/demos/${componentName}/${demoName}`}>
              <Button style={{ fontSize: 18 }} variant="text">{demoName}</Button>
            </Link>
          </li>
        ))
      }
    </ul>
  );
}
