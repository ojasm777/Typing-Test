import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginForm = ({handleClose}) => {
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      // alert("Please fill all the fields");
      // instead of alert we will use react toastify
      toast.warning("Fill all Details", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }

    // auth.signInWithEmailAndPassword(email, password) old method
      signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // alert("User logged in successfully");
        // instead of alert we will use react toastify
        toast.success("User logged in successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        handleClose();
      })
      .catch((err) => {
        // alert("invalid credentials");
        // instead of alert we will use react toastify
        toast.error(errorMapping[err.code] || "some error occured", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      });
  };
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {/* Two text fields one for email and other for password */}
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
        // input label props is used to target the color of the label
        InputLabelProps={{
          style: {
            color: theme.textColor,
          },
        }}
        // input props is used to target hte color of the input
        InputProps={{
          style: {
            color: theme.textColor,
          },
        }}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
        // input label props is used to target the color of the label
        InputLabelProps={{
          style: {
            color: theme.textColor,
          },
        }}
        // input props is used to target hte color of the input
        InputProps={{
          style: {
            color: theme.textColor,
          },
        }}
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: theme.background, color: theme.textColor }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
