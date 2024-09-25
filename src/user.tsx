import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

export default function UserStatus() {
  console.info('UserStatus component loaded');
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  React.useEffect(() => {
    // Function to read cookies
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        const part = parts.pop();
        if (part) {
          const cookieValue = part.split(';').shift();
          console.info(`Cookie found: ${name} = ${cookieValue}`); // Log found cookie value
          return cookieValue;
        }
      }
      console.warn(`Cookie not found: ${name}`); // Warn if not found
      return null; // Return null if the cookie is not found
    };

    // Check if the auth_data cookie exists
    const authData = getCookie('auth_data');
    if (authData) {
      try {
        const decodedData = JSON.parse(atob(authData)); // Decode Base64 data
        console.info("Decoded data: ", decodedData); // Log the decoded data
        setAuth(decodedData.autenticated); // Use 'authenticated' correctly
      } catch (error) {
        console.error("Error decoding auth_data cookie: ", error); // Catch any JSON parse errors
      }
    }
  }, []);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {auth && (  // This checks if auth is true
        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
          </Menu>
        </div>
      )}
    </>
  );
}
