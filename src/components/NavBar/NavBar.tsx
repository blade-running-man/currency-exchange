import { Link, useLocation } from 'react-router-dom';
import ROUTES from '@/constants/routes';
import { Tabs, Tab } from '@mui/material';
import { useTranslation } from 'react-i18next';

function NavBar() {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  return (
    <Tabs value={pathname}>
      <Tab
        label={t('MenuItems.CurrencyConverter', 'Currency converter')}
        value={ROUTES.ROOT}
        to={ROUTES.ROOT}
        component={Link}
      />
      <Tab
        label={t('MenuItems.ViewConversionHistory', 'View conversion history')}
        value={ROUTES.EXCHANGE_HISTORY}
        to={ROUTES.EXCHANGE_HISTORY}
        component={Link}
      />
    </Tabs>
  );
}

export default NavBar;
