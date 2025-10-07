import React, { useState } from "react";
import Select from "react-select";
import { themeOptions } from "../Utils/themeOptions.js";
import { useTheme } from "../Context/ThemeContext.jsx";
import { useFocus } from "../Context/FocusContext.jsx";
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const { theme, setTheme } = useTheme();
  const { focusInput } = useFocus();
  const handleChange = (e) => {
    // console.log(e); return object with label and value (all the info of the color)
    setTheme(e.value);
    localStorage.setItem("theme", JSON.stringify(e.value)); // key value pair
    focusInput();
  };
  return (
    <>
      <div className="footer">
        {/* <div className="links">Links</div> */} 
        <div className="actual-footer">
          <div className="links">
            <a href="https://github.com/Kunalkheda/TYPING-SPEED-TEST" target="_blank">
            {/* <a href="https://github.com/ojasm777" target="_blank"> */}
              <GitHubIcon style={{ marginRight: "4px", color: theme.buttonColor}} />
            </a>
            <a href="https://www.linkedin.com/in/imkunalsingh1/" target="_blank">
            {/* <a href="https://www.linkedin.com/in/ojasm777/" target="_blank"> */}
              <LinkedInIcon style={{ color: theme.buttonColor}}/>
            </a>
          </div>
        </div>
        <div className="themeButton">
          <Select
            onChange={handleChange}
            options={themeOptions}
            menuPlacement="top"
            defaultValue={{ label: theme.label, value: theme }}
            styles={{
              // control has the control of the box, but not the color of the text inside the box
              control: (styles) => ({
                ...styles,
                color: theme.typeBoxText,
                backgroundColor: theme.background,
                minWidth: "150px",
              }),
              // The color inside the select box was changed using this only after a lot of thinking
              // this is used to style the text inside the box and control is used to style the box
              singleValue: (styles) => ({
                ...styles,
                color: theme.typeBoxText,
              }),
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme.background,
              }),
              option: (styles, { isFocused }) => {
                return {
                  ...styles,
                  backgroundColor: !isFocused
                    ? theme.background
                    : theme.textColor,
                  color: isFocused ? theme.background : theme.typeBoxText,
                  cursor: "pointer",
                };
              },
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
