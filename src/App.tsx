import React, { Fragment, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom';
import DefaultLayout from './layout/default';
import AdminLayout from './layout/admin';
import modulesConfig from './layouts_and_modules.json';
import PageNotFound from '@/PageNotFound';

const ModuleWrapper: React.FC = () => {
  const { module } = useParams();
  const [LazyComponent, setLazyComponent] = React.useState<React.LazyExoticComponent<React.ComponentType> | null>(null);

  React.useEffect(() => {
    if (module) {
      const load = async () => {
        const loaded = await import(`./module/${module.toLowerCase()}/index.tsx`);
        setLazyComponent(() => React.lazy(() => Promise.resolve({ default: loaded.default })));
      };
      load();
    }
  }, [module]);

  return LazyComponent ? (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  ) : null;
};

const AdminModuleWrapper: React.FC = () => {
  const { module } = useParams();
  const [LazyComponent, setLazyComponent] = React.useState<React.LazyExoticComponent<React.ComponentType> | null>(null);

  React.useEffect(() => {
    if (module) {
      const load = async () => {
        const loaded = await import(`./module/${module.toLowerCase()}/admin/index.tsx`);
        setLazyComponent(() => React.lazy(() => Promise.resolve({ default: loaded.default })));
      };
      load();
    }
  }, [module]);

  return LazyComponent ? (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  ) : null;
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default Layout */}
        <Route path="/" element={<DefaultLayout />}>
          <Route path=":module/:action/:id/:tabPage/:tabPageAction" element={<ModuleWrapper />} />
          <Route path=":module/:action/:id/:tabPage" element={<ModuleWrapper />} />
          <Route path=":module/:action/:id" element={<ModuleWrapper />} />
          <Route path=":module/:action" element={<ModuleWrapper />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>

        {/* Admin Layout */}
        <Route path="admin/" element={<AdminLayout />}>
          <Route path=":module/:action/:id/:tabPage/:tabPageAction" element={<AdminModuleWrapper />} />
          <Route path=":module/:action/:id/:tabPage" element={<AdminModuleWrapper />} />
          <Route path=":module/:action/:id" element={<AdminModuleWrapper />} />
          <Route path=":module/:action" element={<AdminModuleWrapper />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;