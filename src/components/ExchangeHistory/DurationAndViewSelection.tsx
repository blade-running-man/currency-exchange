import { ChangeEvent } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  RadioGroup,
  Radio,
  SelectChangeEvent,
} from '@mui/material';

interface DateRangeOption {
  label: string;
  value: string;
}

interface DurationAndViewSelectionProps {
  dateRangeOptions: DateRangeOption[];
  startDate: string;
  onStartDateChange: (event: SelectChangeEvent) => void;
  viewMode: string;
  onViewModeChange: (value: string) => void;
}

function DurationAndViewSelection({
  dateRangeOptions,
  startDate,
  onStartDateChange,
  viewMode,
  onViewModeChange,
}: DurationAndViewSelectionProps) {
  const viewModeHandler = (event: ChangeEvent, value: string) => {
    onViewModeChange(value);
  };

  return (
    <Box sx={{ display: 'flex' }} justifyContent="space-between">
      <FormControl variant="standard">
        <InputLabel id="target-currency-label">Duration</InputLabel>
        <Select value={startDate} onChange={onStartDateChange}>
          {dateRangeOptions.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <RadioGroup onChange={viewModeHandler} value={viewMode} row>
          <FormControlLabel value="table" control={<Radio />} label="Table" />
          <FormControlLabel value="chart" control={<Radio />} label="Chart" />
        </RadioGroup>
      </FormControl>
    </Box>
  );
}

export default DurationAndViewSelection;
