import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import ConversionHistory from '@/components/ConversionHistory';
import { Container } from '@mui/material';

function ExchangeHistoryScreen() {
  const { t } = useTranslation();

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" sx={{ fontWeight: 700, my: 5 }}>
        {t('conversion_history', 'Conversion history')}
      </Typography>
      <Card>
        <ConversionHistory />
      </Card>
    </Container>
  );
}

export default ExchangeHistoryScreen;
