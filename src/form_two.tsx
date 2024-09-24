import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import SendIcon from '@mui/icons-material/Done';
import * as React from 'react';
import Button from '@mui/material/Button';
import './App.css';

function SimpleAlert() {
  return (
    <div className="myAlert" id='myAlert'>
      <Alert variant="filled" icon={<CheckIcon fontSize="inherit" />} severity="success">
      Task added successfully
      </Alert>
    </div>  
  );
}

export default function ButtonUsage() {
  const [showAlert, setShowAlert] = React.useState(false);

  const handleButtonClick = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    } , 2000);
  };

  return (
    <div>
      <Button variant="contained" color='success' startIcon={<SendIcon />} onClick={handleButtonClick}>
        Hello world
      </Button>
      {showAlert && <SimpleAlert />} {/* Conditionally render the alert */}
    </div>
  );
}
