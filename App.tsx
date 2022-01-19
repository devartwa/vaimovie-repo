import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';
import theme from './src/global/styles/theme';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}
