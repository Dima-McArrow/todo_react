import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function BasicSelect() {
  const [importance, setImportance] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setImportance(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="importance-select-label">Importance</InputLabel>
        <Select
          labelId="Importance"
          id="importance"
          value={importance}
          label="Importance"
          onChange={handleChange}
        >
          <MenuItem value={1}>Hight</MenuItem>
          <MenuItem value={2}>Medium</MenuItem>
          <MenuItem value={3}>Low</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}