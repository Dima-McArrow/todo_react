import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PositionedMenu from './menu';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
        <PositionedMenu />
          <Typography variant="h6" textTransform={'uppercase'} component="div" sx={{ flexGrow: 1 }}>
          Vite + React ToDo app
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}