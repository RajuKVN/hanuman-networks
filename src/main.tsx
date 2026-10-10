import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from '@/App';
import { system } from '@/config/theme';
import { ErrorBoundary } from '@/ErrorBoundary';
import '@/i18n/index';
import '@/styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element #root not found in document');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ChakraProvider value={system}>
        <App />
      </ChakraProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
