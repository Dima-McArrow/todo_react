import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function SelectImportance({ importance, setImportance }: { importance: string; setImportance: React.Dispatch<React.SetStateAction<string>> }) {

  const handleChange = (event: SelectChangeEvent) => {
    setImportance(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="importance-select-label">Importance</InputLabel>
        <Select
          labelId="importance-select-label"
          id="importance"
          value={importance}
          label="Importance"
          onChange={handleChange}
        >
          <MenuItem value="1">High</MenuItem>
          <MenuItem value="2">Medium</MenuItem>
          <MenuItem value="3">Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
