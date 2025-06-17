import { GlobalStyle } from "./styles/global.js";
import { ThemeProvider } from "styled-components";
import { useTheme } from "./Context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage.jsx";
import UserPage from "./Pages/UserPage.jsx";
import FaviconUpdater from "./Components/FaviconUpdator.jsx";

function App() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <ThemeProvider theme={theme}>
        <FaviconUpdater />
        <ToastContainer />
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/user' element={<UserPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
