import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { send, weatherForecast } from '../actions/actions';
import { dataSaveToLocalStorage } from '../helpers/dataSaveToLocalStorage';
import { store } from '../store/store';
import { DataContext } from './data/DataContext';

/**
 * Lista que muestra las coincidencias en la busqueda con la informacion proveida por openWeatherAPI
 * @returns JSX Element
 */
export const CitySelection = () => {
  const { searchToggle } = useContext(DataContext);
  const { toggleSearch } = searchToggle;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cities = [] } = useSelector(state => state.location);

  const handleButton = (lat, lon, cityName) => {
    dispatch(weatherForecast(lat, lon));
    dispatch(send(cityName, 'selectedCity'));
    toggleSearch();
    navigate('today');
  };

  // Permite el actualizado de la informacion persistente en localStorage
  useEffect(() => {
    store.subscribe(() => dataSaveToLocalStorage(store.getState()));
  }, []);

  return (
    <div className='d-flex flex-column mx-5 my-3 col-md-5 col-lg-4'>
      <h6 className=' fs-4 p-3'>Select a city</h6>
      <ul className='list-group'>
        {cities.length !== 0 &&
          cities.map(city => {
            const { lat, lon, name, state, country } = city;
            return (
              <button
                key={window.crypto.randomUUID()}
                className='list-group-item btn btn-outline-secondary'
                onClick={() => handleButton(lat, lon, name)}
              >
                {name}, {state}, {country}
              </button>
            );
          })}
      </ul>
    </div>
  );
};
