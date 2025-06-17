import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { TestModeContextProvider } from "./Context/TestModeContext.jsx";
import { ThemeContextProvider } from "./Context/ThemeContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FocusContextProvider } from "./Context/FocusContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FocusContextProvider>
      <ThemeContextProvider>
        <TestModeContextProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </TestModeContextProvider>
      </ThemeContextProvider>
    </FocusContextProvider>
  </React.StrictMode>
);

// The app will become children to this provider
// app will go as the children
// so the whole app will have access to testTimer and setTestTimer
