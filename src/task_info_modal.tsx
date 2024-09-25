import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column' as 'column',
  alignItems: 'center',
  justifyContent: 'center',
};

interface Task {
  id: number;
  title: string;
  description: string;
  importance: number;
  due_date: string;
  created_at: string;
  is_done: boolean;
  user_id: number;
}

interface BasicModalProps {
  readonly task: Task;
}

export default function BasicModal({ task }: Readonly<BasicModalProps>) {
  const [open, setOpen] = React.useState(false); // Modal open state
  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal

  return (
    <div>
      {/* Button to open the modal */}
      <Button onClick={handleOpen}>Task info</Button>

      {/* Modal that opens on button click */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task title: {task.title}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Task Description: {task.description}
          </Typography>
          <div className="due-date-container">
              <div className="calendar-tooltip">
                <DatePicker
                  selected={new Date(task.due_date)}
                  inline
                  readOnly
                  calendarStartDay={1}
                  disabled
                  disabledKeyboardNavigation
                />
              </div>
            </div>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </div>
  );
}
