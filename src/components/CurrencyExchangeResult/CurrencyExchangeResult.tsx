import { useMemo, useContext } from 'react';
import Typography from '@mui/material/Typography';
import { ExchangeHistoryContext } from '@/context/ExchangeHistoryContext';
import {
  DEFAULT_SOURCE_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
} from '@/constants/currency';

function CurrencyExchangeResult() {
  const { currencyExchangeTransactions } = useContext(ExchangeHistoryContext);

  const exchangeTransaction = useMemo(() => {
    const lastExchangeTransaction =
      currencyExchangeTransactions[currencyExchangeTransactions.length - 1];

    return (
      lastExchangeTransaction || {
        sourceCurrency: DEFAULT_SOURCE_CURRENCY,
        targetCurrency: DEFAULT_TARGET_CURRENCY,
        sourceAmount: 0,
        targetAmount: 0,
        rate: 1,
      }
    );
  }, [currencyExchangeTransactions]);

  return (
    <>
      <Typography variant="h3" component="h2" sx={{ textAlign: 'center' }}>
        <span>{exchangeTransaction.sourceCurrency} </span>
        {exchangeTransaction.sourceAmount}
        <span> = </span>
        <Typography
          variant="h3"
          component="span"
          sx={{ fontWeight: 700, color: 'success.main' }}
        >
          <span>{exchangeTransaction.targetAmount.toFixed(3)}</span>
          <span> {exchangeTransaction.targetCurrency}</span>
        </Typography>
      </Typography>
      <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}>
        1 {exchangeTransaction.sourceCurrency} = {exchangeTransaction.rate}{' '}
        {exchangeTransaction.targetCurrency}
      </Typography>
      {/* <Typography variant="body1" component="p" sx={{ textAlign: 'center' }}> */}
      {/*  1 {targetCurrency} = {1 / rate} {sourceCurrency} */}
      {/* </Typography> */}
    </>
  );
}

export default CurrencyExchangeResult;
