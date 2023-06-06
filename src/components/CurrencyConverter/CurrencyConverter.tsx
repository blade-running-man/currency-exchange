import { useMemo, useContext } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSupportedCurrencies } from '@/hooks/useSupportedCurrencies';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ExchangeHistoryContext } from '@/context/ExchangeHistoryContext';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

import {
  DEFAULT_SOURCE_CURRENCY,
  DEFAULT_TARGET_CURRENCY,
} from '@/constants/currency';

interface FormData {
  amount: number;
  sourceCurrency: string;
  targetCurrency: string;
}

function CurrencyConverter() {
  const { t } = useTranslation();

  const { addCurrencyExchangeTransaction } = useContext(ExchangeHistoryContext);

  const { data } = useSupportedCurrencies();

  const supportedCurrencies = useMemo(() => {
    return data ? Object.keys(data.supportedCurrencies) : [];
  }, [data]);

  const { control, handleSubmit, getValues, setValue } = useForm<FormData>({
    defaultValues: {
      amount: 100,
      sourceCurrency: DEFAULT_SOURCE_CURRENCY,
      targetCurrency: DEFAULT_TARGET_CURRENCY,
    },
  });

  const onFormSubmit = async (formData: FormData) => {
    try {
      await addCurrencyExchangeTransaction({
        amount: formData.amount,
        sourceCurrency: formData.sourceCurrency,
        targetCurrency: formData.targetCurrency,
      });
    } catch (e) {
      console.log(e);
    }
  };

  const onSwapHandler = () => {
    const sourceCurrencyValue = getValues('sourceCurrency');
    const targetCurrencyValue = getValues('targetCurrency');

    setValue('sourceCurrency', targetCurrencyValue);
    setValue('targetCurrency', sourceCurrencyValue);
  };

  if (!supportedCurrencies.length) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <Grid container spacing={2} alignItems="flex-end">
        <Grid item xs={12} sm={2}>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                variant="standard"
                label={t('CurrencyConverterForm.Amount', 'Amount')}
                fullWidth
              />
            )}
          />
        </Grid>
        <Grid item xs={12} gap={2} sm={8} sx={{ display: 'flex' }}>
          <FormControl variant="standard" fullWidth>
            <InputLabel>From</InputLabel>
            <Controller
              name="sourceCurrency"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {supportedCurrencies.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
          <Button
            type="button"
            sx={{ backgroundColor: '#ffffff', color: 'primary.main' }}
            onClick={onSwapHandler}
            variant="contained"
          >
            <CompareArrowsIcon />
          </Button>
          <FormControl variant="standard" fullWidth>
            <InputLabel>To</InputLabel>
            <Controller
              name="targetCurrency"
              control={control}
              render={({ field }) => (
                <Select {...field}>
                  {supportedCurrencies.map((item) => (
                    <MenuItem key={`from-${item}`} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Button type="submit" id="button" variant="contained" fullWidth>
            {t('CurrencyConverterForm.SubmitButton', 'Convert')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CurrencyConverter;
