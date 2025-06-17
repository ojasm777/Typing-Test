import { Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTheme } from "../Context/ThemeContext";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify"; 
import errorMapping from "../Utils/errorMapping.js";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignupForm = ({handleClose}) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password || !confirmedPassword) {
      // alert("Please fill all the fields");
      // instead of alert we will use react toastify
      toast.warning("Please fill all the fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return;
    } else if (password !== confirmedPassword) {
      // alert("Passwords do not match");
        // instead of alert we will use react toastify
        toast.warning("Password Mismatch", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      return;
    } 

    // auth.createUserWithEmailAndPassword(email, password) old method
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => {
        // alert("user created");
        // instead of alert we will use react toastify
        toast.success("User Signed up successfully", {
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
        // alert('Not able to create user');
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
      <TextField
        variant="outlined"
        type="password"
        label="Confirm Password"
        onChange={(e) => setConfirmedPassword(e.target.value)}
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
        Sign Up
      </Button>
    </Box>
  );
};

export default SignupForm;
