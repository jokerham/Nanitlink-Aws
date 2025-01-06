import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DefaultLayout from './layout/default';
import AdminLayout from './layout/admin';
import modulesConfig from './layouts_and_modules.json';

// Lazy load modules
const loadModule = (moduleName: string) => lazy(() => import(`./module/${moduleName}`));
const loadAdminModule = (moduleName: string) => lazy(() => import(`./module/${moduleName}/admin`));

const App: React.FC = () => {
  // Generate and log the routes
  useEffect(() => {
    const defaultRoutes = modulesConfig.modules.map((module) => ({
      path: `/${module.name}/:action`,
      layout: 'DefaultLayout',
    }));

    const adminRoutes = modulesConfig.modules
      .filter((module) => module.hasAdmin)
      .map((module) => ({
        path: `/admin/${module.name}/:action`,
        layout: 'AdminLayout',
      }));

    console.log('Generated Routes:', [...defaultRoutes, ...adminRoutes]);
  }, []);

  return (
    <Router>
    <Routes>
      {/* Default Layout */}
      <Route path="/" element={<DefaultLayout />}>
        {modulesConfig.modules.map((module) => (
          <Route
            key={module.name}
            path={`${module.name}/:action`}
            element={
              <Suspense fallback={<div>Loading...</div>}>
                {React.createElement(loadModule(module.name))}
              </Suspense>
            }
          />
        ))}
      </Route>

      {/* Admin Layout */}
      <Route path="admin" element={<AdminLayout />}>
        {modulesConfig.modules
          .filter((module) => module.hasAdmin)
          .map((module) => (
            <Route
              key={module.name}
              path={`${module.name}/:action`}
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  {React.createElement(loadAdminModule(module.name))}
                </Suspense>
              }
            />
          ))}
      </Route>
    </Routes>
    </Router>
  );
};

export default App;