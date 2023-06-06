import http from '@/services/http';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DEFAULT_SOURCE_CURRENCY } from '@/constants/currency';

interface Rate {
  [key: string]: number;
}
interface Data {
  [date: string]: Rate;
}

export const useExchangeHistory = ({
  startDate,
  endDate,
  sourceCurrency = DEFAULT_SOURCE_CURRENCY,
}: {
  startDate: string;
  endDate: string | null;
  sourceCurrency?: string;
}): UseQueryResult<{ rates: Data; date: string; base: string }> =>
  useQuery(
    ['supported-currencies', sourceCurrency, startDate, endDate],
    async () => {
      const { data } = await http('timeseries', {
        params: {
          start_date: startDate,
          end_date: endDate,
          base: sourceCurrency,
        },
      });
      return { rates: data.rates, date: data.date, base: data.base };
    }
  );
