import React, { useContext, useState, useMemo, useCallback } from 'react';
import { DateTime } from 'luxon';
import { Grid, Card, Typography, SelectChangeEvent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useExchangeHistory } from '@/hooks/useExchangeHistory';
import { ExchangeHistoryContext } from '@/context/ExchangeHistoryContext';
import LineChart from '@/components/LineChart';
import {
  DEFAULT_TARGET_CURRENCY,
  DEFAULT_SOURCE_CURRENCY,
} from '@/constants/currency';
import { DATE_RANGE_OPTIONS } from './constants';
import ExchangeHistoryTable from './ExchangeHistoryTable';
import StatisticsTable from './StatisticsTable';
import DurationAndViewSelection from './DurationAndViewSelection';

function ExchangeHistory() {
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState('table');
  const { currencyExchangeTransactions } = useContext(ExchangeHistoryContext);

  const { sourceCurrency, targetCurrency } = useMemo(() => {
    const lastTransaction =
      currencyExchangeTransactions[currencyExchangeTransactions.length - 1];
    return {
      sourceCurrency:
        lastTransaction?.sourceCurrency ?? DEFAULT_SOURCE_CURRENCY,
      targetCurrency:
        lastTransaction?.targetCurrency ?? DEFAULT_TARGET_CURRENCY,
    };
  }, [currencyExchangeTransactions]);

  const dateRangeOptions = useMemo(() => {
    const now = DateTime.local();
    return DATE_RANGE_OPTIONS.map((option) => ({
      label: option.label,
      value: now.minus({ days: option.value - 1 }).toFormat('yyyy-MM-dd'),
    }));
  }, []);

  const [startDate, setStartDate] = useState<string>(dateRangeOptions[0].value);

  const handleStartDateChange = useCallback((event: SelectChangeEvent) => {
    setStartDate(event.target.value as string);
  }, []);

  const { data } = useExchangeHistory({
    startDate,
    endDate: DateTime.local().toFormat('yyyy-MM-dd'),
    sourceCurrency,
  });

  const tableData = useMemo(() => {
    if (data?.rates) {
      return Object.entries(data.rates).map(([date, rates]) => ({
        date,
        rate: rates[targetCurrency],
      }));
    }
    return [];
  }, [data, targetCurrency]);

  const { min, max, average } = useMemo(() => {
    if (data?.rates) {
      const rates = Object.values(data.rates)
        .filter((rate) => rate[targetCurrency])
        .map((rate) => rate[targetCurrency]);

      const minRate = Math.min(...rates);
      const maxRate = Math.max(...rates);
      const averageRate =
        rates.reduce((acc, rate) => acc + rate, 0) / rates.length;
      return {
        min: minRate,
        max: maxRate,
        average: averageRate,
      };
    }
    return {
      min: 0,
      max: 0,
      average: 0,
    };
  }, [data, targetCurrency]);

  return (
    <>
      <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 5 }}>
        {t('ExchangeHistory.Title', 'Exchange History')}
      </Typography>
      <Grid container mb={3} spacing={2}>
        <Grid item xs={12} sm={7}>
          <DurationAndViewSelection
            dateRangeOptions={dateRangeOptions}
            startDate={startDate}
            onStartDateChange={handleStartDateChange}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        sx={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <Grid item xs={12} sm={7}>
          <Card variant="outlined">
            {viewMode === 'table' && (
              <ExchangeHistoryTable tableData={tableData} />
            )}
            {viewMode === 'chart' && (
              <LineChart
                seriesData={tableData.map((item) => item.rate)}
                xAxisData={tableData.map((item) => item.date)}
              />
            )}
          </Card>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card variant="outlined">
            <StatisticsTable min={min} max={max} average={average} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ExchangeHistory;
