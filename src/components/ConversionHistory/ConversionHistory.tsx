import { useContext } from 'react';
import { ExchangeHistoryContext } from '@/context/ExchangeHistoryContext';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DeleteForever, RemoveRedEye } from '@mui/icons-material';

function ConversionHistory() {
  const { t } = useTranslation();

  const { currencyExchangeTransactions, deleteCurrencyExchangeTransaction } =
    useContext(ExchangeHistoryContext);

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Event</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyExchangeTransactions.map((exchangeTransaction) => (
            <TableRow
              key={exchangeTransaction.id}
              sx={{
                '&:hover .actions-button': {
                  visibility: 'visible',
                },
              }}
            >
              <TableCell>
                {DateTime.fromISO(exchangeTransaction.date).toFormat(
                  "dd/MM/yyyy ' @ ' HH:mm"
                )}
              </TableCell>
              <TableCell>
                {t(
                  'ConversionHistory.Table.title',
                  'Converted an amount of {{amount}} from {{sourceCurrency}} to {{ targetCurrency }}',
                  {
                    amount: exchangeTransaction.sourceAmount,
                    sourceCurrency: exchangeTransaction.sourceCurrency,
                    targetCurrency: exchangeTransaction.targetCurrency,
                  }
                )}
              </TableCell>
              <TableCell>
                <Button
                  className="actions-button"
                  sx={{ visibility: 'hidden' }}
                  startIcon={<RemoveRedEye />}
                >
                  View
                </Button>
                <Button
                  className="actions-button"
                  sx={{ visibility: 'hidden' }}
                  color="error"
                  startIcon={<DeleteForever />}
                  onClick={() =>
                    deleteCurrencyExchangeTransaction(exchangeTransaction.id)
                  }
                >
                  Delete from history
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {currencyExchangeTransactions?.length === 0 && (
            <TableRow>
              <TableCell colSpan={3}>
                {t('ConversionHistory.Table.no_data', 'No data')}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default ConversionHistory;
