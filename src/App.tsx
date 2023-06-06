import { Route, Routes } from 'react-router-dom';

import DefaultLayout from '@/layout/DefaultLayout';

import CurrencyConverterScreen from '@/screens/CurrencyConverterScreen';
import ExchangeHistoryScreen from '@/screens/ExchangeHistoryScreen';
import NoMatchScreen from '@/screens/NoMatchScreen';

import ROUTES from '@/constants/routes';

function App() {
  return (
    <Routes>
      <Route path="*" element={<NoMatchScreen />} />
      <Route element={<DefaultLayout />}>
        <Route path={ROUTES.ROOT} element={<CurrencyConverterScreen />} />
        <Route
          path={ROUTES.EXCHANGE_HISTORY}
          element={<ExchangeHistoryScreen />}
        />
      </Route>
    </Routes>
  );
}

export default App;
