import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Logout from './logout';
import PositionedMenu from './menu';

interface ButtonAppBarProps {
  onFilterChange: (filter: number | undefined) => void; // Change prop type to number or undefined
}

export default function ButtonAppBar({ onFilterChange }: ButtonAppBarProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <PositionedMenu onFilterChange={onFilterChange} /> {/* Pass the filter change handler to the menu */}
          <Typography variant="h6" textTransform={'uppercase'} component="div" sx={{ flexGrow: 1 }}>
            Vite + React ToDo app
          </Typography>
          <Logout />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
