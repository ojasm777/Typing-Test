import { useEffect } from 'react'; 
import { useTheme } from '../Context/ThemeContext.jsx';
import { changeFaviconColor } from '../Utils/faviconUtil.js';

const FaviconUpdater = () => {
  const { theme } = useTheme(); 

  useEffect(() => { 
    changeFaviconColor(theme.buttonColor);
  }, [theme]); 

  return null; // No UI rendering is needed for this component
};

export default FaviconUpdater;
