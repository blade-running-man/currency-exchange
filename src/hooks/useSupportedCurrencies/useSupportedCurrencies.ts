import { useQuery, UseQueryResult } from '@tanstack/react-query';
import http from "@/services/http";

type SupportedCurrencies = {
    [key: string]: {
      description: string;
      code: string;
    };
};

export const useSupportedCurrencies = (): UseQueryResult<{supportedCurrencies: SupportedCurrencies}> =>
  useQuery(
    ['supported-currencies'],
    async () => {

      const { data } = await http('symbols', {});
      return { supportedCurrencies: data.symbols};
    },
  );

