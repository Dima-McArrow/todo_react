import Button from '@mui/material/Button';

export default function Logout() {
  const handleLogout = async () => {
    try {
      // Fetch the logout PHP script
      const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/logout.php', {
        method: 'POST',
        credentials: 'include', // Include cookies in the request
        headers: {
          'Content-Type': 'application/json', // Optional, based on your PHP script
        },
      });

      // Handle the response
      if (response.ok) {
        console.log('Logout successful');
        // Redirect to the login page
        window.location.href = '/'; // Redirect to the login page
      } else {
        console.error('Logout failed', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <Button color="inherit" onClick={handleLogout}>Logout</Button>
  );
}
