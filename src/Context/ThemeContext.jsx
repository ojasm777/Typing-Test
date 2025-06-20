import { createContext, useContext, useState } from "react";
import { themeOptions } from "../Utils/themeOptions";

const ThemeContext = createContext();

export const ThemeContextProvider = ({children}) => {
    const defualtValue = JSON.parse(localStorage.getItem('theme')) || themeOptions[0].value;
    const [theme, setTheme] = useState(defualtValue); // value has all the color info
    const values = {
        theme,
        setTheme,
    }
    return (<ThemeContext.Provider value = {values}> {children} </ThemeContext.Provider>);
}


export const useTheme = () => useContext(ThemeContext);