import './footer.css'
import Box from '@mui/material/Box';

export default function Footer() {
  return (
    <Box sx={{ flexGrow: 1, position: 'relative', marginTop: '5rem' }}>
      <footer className="footer">
        <p> DiMa &copy; 2021</p>
      </footer>
    </Box>
  );
}
