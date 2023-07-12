/* eslint-disable camelcase */
import moment from 'moment';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { capitalizeText } from '../helpers/capitalizeText';
import { getIcon } from '../services/apiQuerys';
import { DataContext } from './data/DataContext';

/**
 * Recibe un objeto con la informacion concerniente a cada dia necesaria para representarla en una tarjeta
 * @param {Object} dayValues
 * @returns JSX Element
 */
export const DayWeatherCard = ({ dayValues, timezone_offset }) => {
  const { themeToggle } = useContext(DataContext);
  const { theme } = themeToggle;

  const { dt, temp, feels_like, weather } = dayValues;
  const { day: tempDay, night: tempNight } = temp;
  const { day: feelsLikeDay, night: feelsLikeNight } = feels_like;

  // Manejo de tiempo en segundos en formato unix con la libreria momentJS
  const day = moment.unix(dt + timezone_offset);
  const dayOfWeek = day.format('dddd');

  return (
    <div className='p-2 my-0'>
      <div
        className={`card border ${
          theme && `bg-dark bg-opacity-25 text-light`
        } border-3 border-secondary rounded d-flex flex-column justify-content-center align-items-center`}
      >
        <div className='fs-4'>{dayOfWeek}</div>
        <div>{getIcon(weather.at(0).icon, weather.at(0).main, '120px')}</div>
        <div className='d-flex flex-column'>
          <p className='m-0'>{capitalizeText(weather.at(0).description)}</p>
          <p className='m-0'>
            Daytime temperature: <strong>{tempDay.toFixed(1)}°C</strong>
          </p>
          <p className='m-0'>
            Nighttime temperature: <strong>{tempNight.toFixed(1)}°C</strong>
          </p>
          <p className='m-0'>
            Daytime real feel: <strong>{feelsLikeDay.toFixed(1)}°C</strong>
          </p>
          <p className='mb-2'>
            Nighttime real feel: <strong>{feelsLikeNight.toFixed(1)}°C</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

DayWeatherCard.propTypes = {
  dayValues: PropTypes.object.isRequired,
  timezone_offset: PropTypes.number.isRequired,
};
