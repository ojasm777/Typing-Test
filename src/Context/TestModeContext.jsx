import { createContext, useContext, useState } from "react";

const TestModeContext = createContext();

// There is concept of provider, is a way to give your states to children
// This is a Pseudo Provider 
export const TestModeContextProvider = ({children}) => {
    // There is a children prop by default 
    // so whatever the children are in component state comes as children

    const [testTime, setTestTime] = useState(15);
    // normal object
    const values = {
        testTime,
        setTestTime
    }
    // This is the actual Provider, whatever values that we are providing will be passed on to the children
    return(<TestModeContext.Provider value={values}>{children}</TestModeContext.Provider>);
}

// To fetch the values we can either use TestModeContext.Consumer
// Or we can use useContext

// We will make function self made hook
export const useTestMode = () => {
    return useContext(TestModeContext);
};

// When we wrap the whole app.jsx / index.jsx / main.jsx around this TestModeContext then all the children will have the access 
// to testTime and setTestTime