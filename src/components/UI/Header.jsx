import { faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { DataContext } from '../data/DataContext';

/**
 * Header de la aplicacion que contiene el logo y el control del tema
 * @returns JSX Element
 */
const Header = () => {
  const { themeToggle } = useContext(DataContext);
  const { theme, toggleTheme } = themeToggle;

  const handleToggle = () => toggleTheme();
  return (
    <header className='d-flex px-5 py-4 justify-content-between align-items-center'>
      <h1 className='display-1'>
        Meteo<span className={`${theme ? 'text-white' : 'text-muted'}`}>App</span>
      </h1>
      <div className='form-check form-switch'>
        <input
          className='form-check-input'
          type='checkbox'
          role='switch'
          id='flexSwitchCheckDefault'
          onChange={handleToggle}
        />
        <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
          <FontAwesomeIcon icon={faCircleHalfStroke} />
        </label>
      </div>
    </header>
  );
};

export default Header;
