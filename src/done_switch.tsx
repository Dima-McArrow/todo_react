import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

// Custom styled switch for the done state
const TaskDoneSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    "&::before, &::after": {
      content: '""',
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
    },
    "&::before": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    "&::after": {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main)
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "none",
    width: 16,
    height: 16,
    margin: 2,
  },
}));

export default function SwitchIsDone({ taskId }: { taskId: number }) {
  const [done, setDone] = React.useState<boolean | null>(null); // Set initial state as null
  const token = localStorage.getItem("jwt"); // Retrieve the JWT from local storage

  // Fetch the initial task state
  useEffect(() => {
    const fetchTaskStatus = async () => {
      try {
        const response = await fetch(
          "https://todoback.osc-fr1.scalingo.io/api/set_task_is_done.php",
          {
            method: "POST", // Use POST to fetch task status
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
            },
            body: new URLSearchParams({
              fetch: "true", // Indicate that this is a fetch request
              taskId: taskId.toString(), // Pass the task ID in the body
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.success) {
          setDone(data.is_completed === 1); // Assuming is_completed is a boolean
        } else {
          console.error("Error fetching task status:", data.error);
        }
      } catch (error) {
        console.error("Error fetching task status:", error);
      }
    };

    fetchTaskStatus(); // Call the fetch function
  }, [taskId, token]);

  // Handle switch toggle
  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDoneStatus = event.target.checked ? true : false;

    // Update state locally
    setDone(newDoneStatus);

    // Send the updated status to the back-end
    try {
      const response = await fetch(
        "https://todoback.osc-fr1.scalingo.io/api/set_task_is_done.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`, // Include the JWT in the Authorization header
          },
          body: new URLSearchParams({
            taskId: taskId.toString(), // Pass the task ID in the body
            done: newDoneStatus ? "1" : "0", // Send '1' for true, '0' for false
          }),
        }
      );

      const data = await response.json();
      if (!data.success) {
        console.error("Error updating task status:", data.error);
        // Optionally revert the switch state if update fails
        setDone(!newDoneStatus);
      }
    } catch (error) {
      console.error("Error updating task status:", error);
      // Optionally revert the switch state if update fails
      setDone(!newDoneStatus);
    }
  };

  // Refresh tasks after setting the done state
  /* const refreshTasks = async () => {
    setLoading(true); // Start loading
    const token = localStorage.getItem('jwt');
    try {
      const response = await fetch('https://to-do-back-a6f40cecf847.herokuapp.com/api/get_tasks.php', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data); // Update task list after deletion
    } catch (error) {
      console.error('Error refreshing tasks', error);
    } finally {
      setLoading(false); // Stop loading
    }
  }; */

  return (
    <FormControlLabel
      control={
        <TaskDoneSwitch checked={done === true} onChange={handleChange} />
      } // Ensure checked is a boolean
      label="Done"
    />
  );
}
