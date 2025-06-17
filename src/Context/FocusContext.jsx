import { createContext, useContext, useRef } from "react";

// 1. Create the context
const FocusContext = createContext();


// 3. FocusContextProvider component (provides focus management to children)
export const FocusContextProvider = ({ children }) => {
  const inputRef = useRef(null);

  // Function to focus the input element
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // 4. Values to provide (focusInput and inputRef)
  const values = {
    focusInput,
    inputRef,
  };

  // 5. Provide context to children
  return <FocusContext.Provider value={values}>{children}</FocusContext.Provider>;
};

// 2. Custom hook to use FocusContext
export const useFocus = () => {
  return useContext(FocusContext);
};