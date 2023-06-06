import { createContext, ReactNode } from 'react';
import { nanoid } from 'nanoid';
import useLocalStorage from '@/hooks/useLocalStorage';
import { DateTime } from 'luxon';
import http from '@/services/http';

type AddCurrencyExchangeTransactionType = {
  sourceCurrency: string;
  targetCurrency: string;
  amount: number;
};

type CurrencyExchangeTransactionType = {
  id: string;
  sourceCurrency: string;
  targetCurrency: string;
  sourceAmount: number;
  targetAmount: number;
  date: string;
  rate: number;
};

export type ExchangeHistoryContextType = {
  currencyExchangeTransactions: CurrencyExchangeTransactionType[];
  addCurrencyExchangeTransaction: ({
    sourceCurrency,
    targetCurrency,
    amount,
  }: AddCurrencyExchangeTransactionType) => void;
  deleteCurrencyExchangeTransaction: (id: string) => void;
};

export const ExchangeHistoryContext = createContext<ExchangeHistoryContextType>(
  {
    currencyExchangeTransactions: [],
    addCurrencyExchangeTransaction: () => {},
    deleteCurrencyExchangeTransaction: () => {},
  }
);

type SettingsProviderProps = {
  children: ReactNode;
};

export function ExchangeHistoryProvider({ children }: SettingsProviderProps) {
  const [currencyExchangeTransactions, seyCurrencyExchangeTransactions] =
    useLocalStorage<CurrencyExchangeTransactionType[]>(
      'currency-exchange-transactions',
      []
    );

  const addCurrencyExchangeTransaction = async ({
    sourceCurrency,
    targetCurrency,
    amount,
  }: AddCurrencyExchangeTransactionType) => {
    try {
      const { data } = await http('convert', {
        params: {
          from: sourceCurrency,
          to: targetCurrency,
          amount,
        },
      });

      const newTransaction = {
        id: nanoid(),
        sourceCurrency,
        targetCurrency,
        sourceAmount: amount,
        targetAmount: data.result,
        date: DateTime.utc().toString(),
        rate: data.info.rate,
      };

      seyCurrencyExchangeTransactions((prev) => [...prev, newTransaction]);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCurrencyExchangeTransaction = (id: string) => {
    seyCurrencyExchangeTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  };

  return (
    <ExchangeHistoryContext.Provider
      value={{
        currencyExchangeTransactions,
        addCurrencyExchangeTransaction,
        deleteCurrencyExchangeTransaction,
      }}
    >
      {children}
    </ExchangeHistoryContext.Provider>
  );
}
