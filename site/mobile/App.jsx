import React, { lazy, Suspense } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation, Outlet } from 'react-router-dom';
import { Loading  } from 'tdesign-mobile-react';
import siteConfig from './mobile.config.js';
import { getRoute, getCurrentRoute } from './utils';
import THeader from './components/Header.jsx';

const docRoutes = getRoute(siteConfig.docs, []);
const renderRouter = () =>
  docRoutes.map((nav, i) => {
    const LazyCom = lazy(nav.component);
    const loading = (<div style={{textAlign: 'center', marginTop: 100}}>
      <Loading text="拼命加载中" />
    </div>)

    return (
      <Route
        key={i}
        path={nav.name}
        element={
          <Suspense fallback={loading}>
            <LazyCom />
          </Suspense>
        }
      />
    );
  });

function Components() {
  const location = useLocation();
  const name = location.pathname.slice(1);
  const title = getCurrentRoute(siteConfig.docs, name)?.title;

  return (
    <>
      <THeader title={title} />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path="/" element={<Navigate replace to="/button" />} />
        <Route path="/*" element={<Components />}>
          {renderRouter()}
        </Route>
        <Route path="*" element={<Navigate replace to="/button" />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
