import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import './App.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

interface PositionedMenuProps {
  onFilterChange: (filter: number | undefined) => void; // Change prop type to number or undefined
}

export default function PositionedMenu({ onFilterChange }: PositionedMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const navigate = useNavigate(); // Initialize the navigate hook

  const handleAddTaskClick = () => {
    navigate('/new_task'); // Navigate to the new task page
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='dashboard'>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => { onFilterChange(undefined); handleClose(); }}>Show all</MenuItem>
        <MenuItem onClick={() => { onFilterChange(0); handleClose(); }}>Show to do tasks</MenuItem>
        <MenuItem onClick={() => { onFilterChange(1); handleClose(); }}>Show done</MenuItem>
        <Divider />
        <MenuItem onClick={handleAddTaskClick}>Create new task</MenuItem>
      </Menu>
    </div>
  );
}
