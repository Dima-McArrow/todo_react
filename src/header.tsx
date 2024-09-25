import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logout from './logout';
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
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}