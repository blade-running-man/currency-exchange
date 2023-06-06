import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CurrencyConverter from '@/components/CurrencyConverter';
import CurrencyExchangeResult from '@/components/CurrencyExchangeResult';
import ExchangeHistory from '@/components/ExchangeHistory';
import Divider from '@mui/material/Divider';
import { Container } from '@mui/material';

function CurrencyConverterScreen() {
  return (
    <Container maxWidth="lg">
      <Typography variant="h3" component="h2" sx={{ fontWeight: 700, my: 5 }}>
        I want to convert
      </Typography>
      <Box sx={{ mb: 5 }}>
        <CurrencyConverter />
      </Box>
      <CurrencyExchangeResult />
      <Divider sx={{ my: { xs: 2, sm: 5 } }} />
      <ExchangeHistory />
    </Container>
  );
}

export default CurrencyConverterScreen;
