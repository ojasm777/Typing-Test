import React, { useState } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, Modal, Tab, Tabs } from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import GoogleButton from "react-google-button";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { toast } from "react-toastify";
import errorMapping from "../Utils/errorMapping";
import LogoutIcon from '@mui/icons-material/Logout'; 
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

const AccountCircle = () => { 
  const {theme} = useTheme();

  // state for opening and closing of modal
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  // const user = auth.currentUser;
  const [user] = useAuthState(auth); // automatically changes as log in log out


  // for navigation
  const navigate = useNavigate();
  const handleModalOpen = () => {
    if(user) {
      // navigate to the /user page
      navigate('/user');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  // v given by tabs component
  const handleValueChange = (e, v) => {
    setValue(v);
  };


  // google log in
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = () => {
    // signInWithPopup(auth, googleProvider); // that's it
    signInWithPopup(auth, googleProvider).then((res) => {  
            toast.success("Google Log in successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            // setOpen(false);
            handleClose();
    }).catch((err) => { 
      toast.error(errorMapping[err.code] || "Not able to use Google Authentication", {
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
  }

  const logout = () => {
    signOut(auth).then((res) => {
      toast.success("Log out successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
      navigate('/');
    }).catch((err) => {
      toast.error("Not able to log out", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      })
    });
  }
  return (
    <div>
      <AccountCircleIcon
        onClick={handleModalOpen}
        style={{ cursor: "pointer" }}
      />
      {user && <LogoutIcon onClick={logout}/>}
      <Modal
        open={open}
        onClose={handleClose}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="modaldiv" style={{textAlign: "center", padding: "20px", borderRadius: "8px", zIndex: '1'}}>
          <AppBar position="static" style={{ background: "transparent" }}>
            <Tabs
              value={value}
              variant="fullWidth"
              onChange={handleValueChange}
            >
              <Tab label="login" style={{color: theme.textColor}}></Tab>
              <Tab label="signup" style={{color: theme.textColor}}></Tab>
            </Tabs>
          </AppBar>
          {value === 0 && <LoginForm handleClose={handleClose}/>}
          {value === 1 && <SignupForm handleClose={handleClose}/>}

          <Box>
            <span>OR</span>
            <GoogleButton style={{width: '85%', marginTop: '12px', marginLeft: 'auto', marginRight: 'auto'}} onClick={handleGoogleLogin}/>
          </Box>
        </div>
      </Modal>
    </div>
  );
};

export default AccountCircle;
