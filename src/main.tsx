import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AppShell from '@/components/AppShell';
import App from '@/App';

import '@/services/i18n/i18n';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <AppShell>
      <App />
    </AppShell>
  </StrictMode>
);
