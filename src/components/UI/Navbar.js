import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getCoordinates } from '../../actions/actions';
import useForm from '../../hooks/useForm';
import { DataContext } from '../data/DataContext';

/**
 * Barra de navegacion que permite buscar localizaciones y una adecuada navegacion por la webapp
 * @returns JSX Element
 */
const Navbar = () => {
  const { themeToggle } = useContext(DataContext);
  const { theme } = themeToggle;

  const { searchToggle } = useContext(DataContext);
  const { sendedSearch, toggleSearch } = searchToggle;
  const dispatch = useDispatch();

  const weatherForecast = useSelector((state) => state.location.weatherForecast);

  const { formValues, handleInputChange, reset } = useForm({
    location: '',
  });

  const { location } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (location) {
      dispatch(getCoordinates(location));
      if (sendedSearch === false) toggleSearch();

      reset();
    }
  };

  return (
    <nav
      className={`navbar navbar-expand-md ${
        theme ? `navbar-dark bg-dark bg-opacity-25` : `navbar-light bg-light`
      } my-3 mx-md-5 px-md-3`}
    >
      <div className='container-fluid'>
        <div className='navbar-collapse justify-content-between '>
          <div className='nav navbar-nav'>
            <ul className='nav-fill d-flex justify-content-center p-0 m-0'>
              <NavLink
                className={`nav-item nav-link ${!weatherForecast && 'disabled'} fs-3 px-md-3`}
                to='/today'
              >
                Now
              </NavLink>
              <NavLink
                className={`nav-item nav-link ${!weatherForecast && 'disabled'} fs-3 px-md-3`}
                to='/next48h'
              >
                48H
              </NavLink>
              <NavLink
                className={`nav-item nav-link ${!weatherForecast && 'disabled'} fs-3 px-md-3`}
                to='/week'
              >
                Week
              </NavLink>
            </ul>
          </div>

          <div className='navbar-nav col-md-6'>
            <form className='d-flex col' onSubmit={handleSubmit}>
              <input
                className='form-control me-2'
                name='location'
                onChange={handleInputChange}
                value={location}
                type='search'
                placeholder='Location'
              />
              <button className='btn btn-outline-dark' type='submit'>
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
