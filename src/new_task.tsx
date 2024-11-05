import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import todoLogo from "./assets/todo.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./new_task.css";
import SelectImportance from "./select_importance";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Alert from "@mui/material/Alert";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function TaskDatePicker({
  dueDate,
  setDueDate,
}: {
  dueDate: Dayjs | null;
  setDueDate: React.Dispatch<React.SetStateAction<Dayjs | null>>;
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Due date"
        value={dueDate}
        onChange={(newDate) => setDueDate(newDate)}
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
  );
}

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [importance, setImportance] = useState("");
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [error, setError] = useState("");

  const handleTaskCreation = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    // Basic validation
    if (!title || !description || !importance || !dueDate) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      const formattedDueDate = dueDate
        ? dayjs(dueDate).format("YYYY-MM-DD")
        : "";

      // Retrieve JWT from localStorage or another source
      const token = localStorage.getItem("jwt"); // Adjust this according to your app logic

      const response = await fetch(
        "https://todoback.osc-fr1.scalingo.io/api/set_task.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Bearer ${token}`, // Include JWT in the Authorization header
          },
          body: new URLSearchParams({
            title,
            description,
            importance,
            due_date: formattedDueDate,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        console.info("Task created successfully:", data);
        // Clear form inputs after task creation
        setTitle("");
        setDescription("");
        setImportance("");
        setDueDate(null);
        setError("");
      } else {
        setError(data.error || "Failed to create task"); // Use 'error' from response
      }
    } catch (err) {
      setError("An error occurred while creating the task");
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="first_div">
        <a href="/">
          <img src={todoLogo} className="logo todo" alt="ToDo logo" />
        </a>
      </div>
      <h1>New task:</h1>
      <Box
        component="form"
        sx={{
          "& > :not(style)": {
            m: 1,
            width: {
              xs: "33ch", // For mobile
              md: "55ch", // For desktop
            },
          },
        }}
        noValidate
        autoComplete="off"
        className="new_task_form"
        onSubmit={handleTaskCreation}
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          name="title"
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          name="description"
          type="text"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TaskDatePicker dueDate={dueDate} setDueDate={setDueDate} />
        <SelectImportance
          importance={importance}
          setImportance={setImportance}
        />
        <p className="required_field">* required field</p>
        <Button
          sx={{
            "& > :not(style)": {
              m: 1,
              width: {
                xs: "23ch", // For mobile
                md: "45ch", // For desktop
              },
            },
          }}
          type="submit"
          variant="contained"
          color="primary"
        >
          Create Task
        </Button>
      </Box>
      {error && (
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      )}
    </ThemeProvider>
  );
}
