import React from 'react';
import { Provider } from 'react-redux';

import { ErrorBoundary } from './components/global/error-boundary';
import { Router } from './router';
import { store } from './store';

const App = () => (
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <Router />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

export default App;
