import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { BrowserRouter, HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import siteConfig from './site.config.js';
import { getRoute } from './utils';
import packageJson from '@/package.json';

const { docs: routerList } = JSON.parse(JSON.stringify(siteConfig).replace(/component:.+/g, ''));

function Components(props) {
  const tdHeaderRef = useRef();
  const tdDocAsideRef = useRef();
  const tdDocContentRef = useRef();
  const tdDocSearch = useRef();
  const [version] = useState(packageJson.version);

  const docRoutes = getRoute(siteConfig.docs, []);
  const [renderRouter] = useState(renderRoutes(docRoutes));

  function renderRoutes(docRoutes) {
    return docRoutes.map((nav, i) => {
      const LazyCom = lazy(nav.component);

      return (
        <Route
          key={i}
          path={nav.path}
          component={() => <LazyCom {...props} />}
        />
      );
    });
  }

  function changeVersion(version) {
    if (version === packageJson.version) return;
    location.href = `//preview-${version}-tdesign-react.surge.sh`;
  }

  useEffect(() => {
    tdHeaderRef.current.framework = 'react';
    // tdDocSearch.current.docsearchInfo = { indexName: 'tdesign_doc_react' };
    tdDocAsideRef.current.routerList = routerList;
    tdDocAsideRef.current.onchange = ({ detail }) => {
      if (location.pathname === detail) return;
      tdDocContentRef.current.pageStatus = 'hidden';
      requestAnimationFrame(() => {
        props.history.push(detail);
      });
      requestAnimationFrame(() => {
        tdDocContentRef.current.pageStatus = 'show';
        window.scrollTo(0, 0);
      });
    };
  }, []);

  return (
    <td-doc-layout>
      <td-header ref={tdHeaderRef} slot="header" platform="mobile">
        {/* <td-doc-search slot="search" ref={tdDocSearch}></td-doc-search> */}
      </td-header>
      <td-doc-aside ref={tdDocAsideRef} title="React for Mobile"></td-doc-aside>

      <td-doc-content ref={tdDocContentRef} platform="mobile">
        <Suspense fallback={<h2>loading...</h2>}>
          {renderRouter}
        </Suspense>
        <td-doc-footer slot="doc-footer" platform="mobile"></td-doc-footer>
      </td-doc-content>
    </td-doc-layout>
  );
}

function App() {
  const Router = process.env.NODE_ENV === 'preview' ? HashRouter : BrowserRouter;

  return (
    <Router>
      <Switch>
        <Redirect exact from="/react-mobile" to="/react-mobile/components/button" />
        <Redirect exact from="/react-mobile/components" to="/react-mobile/components/button" />
        <Route path="/react-mobile/components/*" component={Components} />
        <Redirect from="*" to="/react-mobile/components/button" />
        {/* TODO: 404 */}
      </Switch>
    </Router>
  );
}

export default App;
