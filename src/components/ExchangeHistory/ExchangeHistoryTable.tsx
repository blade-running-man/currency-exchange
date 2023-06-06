import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';
import { DateTime } from 'luxon';

interface TableData {
  date: string;
  rate: number;
}

interface ExchangeHistoryTableProps {
  tableData: TableData[];
}

function ExchangeHistoryTable({ tableData }: ExchangeHistoryTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Date</TableCell>
          <TableCell>Exchange rate</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tableData.map((item) => (
          <TableRow key={`item-${item.date}`}>
            <TableCell>
              {DateTime.fromISO(item.date).toFormat('dd/MM/yyyy')}
            </TableCell>
            <TableCell>{item.rate}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default ExchangeHistoryTable;
