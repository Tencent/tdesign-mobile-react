import React, { lazy, Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import siteConfig from './mobile.config.js';
import { getRoute } from './utils';

const docRoutes = getRoute(siteConfig.docs, []);
const renderRouter = () => {
  return docRoutes.map((nav, i) => {
    const LazyCom = lazy(nav.component);

    return (
      <Route
        key={i}
        path={nav.path}
        component={() => <LazyCom />}
      />
    );
  });
}

function App() {
  return (
    <HashRouter>
      <Switch>
        <Redirect from="/react-mobile" to="/react-mobile/components/button" />
        <Suspense fallback={<h2>loading...</h2>}>
          {renderRouter()}
        </Suspense>
        <Redirect from="*" to="/react-mobile/components/button" />
        {/* TODO: 404 */}
      </Switch>
    </HashRouter>
  );
}

export default App;
