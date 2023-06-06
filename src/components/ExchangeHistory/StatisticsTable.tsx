import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

interface StatisticsTableProps {
  min: number;
  max: number;
  average: number;
}

function StatisticsTable({ min, max, average }: StatisticsTableProps) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2}>Statistics</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Lowest</TableCell>
          <TableCell>{min}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Highest</TableCell>
          <TableCell>{max}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Average</TableCell>
          <TableCell>{average}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default StatisticsTable;
