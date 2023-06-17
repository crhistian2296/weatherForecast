import React, { createContext } from 'react';
import { useToggle } from '../../hooks/useToggle';

export const DataContext = createContext();
/**
 * Contexto creado para manejar eventos sencillos como el color del tema
 * @returns JSX Element
 */
const DataProvider = ({ children }) => {
  const [theme, toggleTheme] = useToggle();
  const [sendedSearch, toggleSearch] = useToggle();

  const initialValue = {
    themeToggle: {
      theme,
      toggleTheme,
    },
    searchToggle: {
      sendedSearch,
      toggleSearch,
    },
  };
  return <DataContext.Provider value={initialValue}>{children}</DataContext.Provider>;
};

export default DataProvider;
