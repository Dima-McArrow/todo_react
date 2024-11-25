import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import todoLogo from "./assets/todo.svg";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./sign_in.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch(
        "https://todoback.osc-fr1.scalingo.io/api/create_user.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          credentials: "include", // Include cookies with the request
          body: new URLSearchParams({
            action: "create", // Include the action to create a user
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!data.success) {
        setError(data.error); // Set the error message from the response
      } else {
        console.info("User created successfully");
        navigate("/login"); // Redirect to the login page after successful registration
      }
    } catch (err) {
      setError("An error occurred during sign in");
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
      <h1>Sign In</h1>
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
        className="login_form"
        onSubmit={handleLogin}
      >
        <TextField
          id="name"
          label="Name"
          variant="outlined"
          name="name"
          type="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p>* required field</p>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="sign_in"
        >
          Create Account
        </Button>
      </Box>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </ThemeProvider>
  );
}
