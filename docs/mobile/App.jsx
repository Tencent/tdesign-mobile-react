import React, { lazy, Suspense } from 'react';
import { HashRouter, Switch, Route, Redirect, useHistory } from 'react-router-dom';
import siteConfig from './mobile.config.js';
import { getRoute, getCurrentRoute } from './utils';
import THeader from './components/Header.jsx';

const docRoutes = getRoute(siteConfig.docs, []);
const renderRouter = () => docRoutes.map((nav, i) => {
    const LazyCom = lazy(nav.component);

    return (
      <Route
        key={i}
        path={nav.path}
        component={() => <LazyCom />}
      />
    );
})

const getHashName = (hash = '#/') => {
  const { length } = hash;
  return hash.substring(2, length);
}

function App() {

  const history = useHistory();

  const name = getHashName(history?.location?.hash)

  const title = getCurrentRoute(siteConfig.docs, name)?.title
  
  return (
    <>
      <THeader title={title}/>
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
    </>
  );
}

export default App;
