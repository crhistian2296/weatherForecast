/* eslint-disable camelcase */
import moment from 'moment';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { capitalizeText } from '../helpers/capitalizeText';
import { getIcon } from '../services/apiQuerys';
import { DataContext } from './data/DataContext';

/**
 * Recibe un objeto con la informacion concerniente a cada hora necesaria para representarla en una tarjeta
 * @param {Object} hourValues
 * @param {Number} timezone_offset
 * @returns JSX Element
 */
export const HourWeatherCard = ({ hourvalues, timezone_offset }) => {
  const { themeToggle } = useContext(DataContext);
  const { theme } = themeToggle;

  const { dt, temp, weather } = hourvalues;

  // Time
  const day = moment.unix(dt + timezone_offset);
  const localTime = day.format('kk:mm');

  return (
    <div className='p-2 my-0'>
      <div
        className={`card ${
          theme && `bg-dark bg-opacity-25 text-light`
        } border border-3 border-secondary rounded d-flex flex-column justify-content-center align-items-center`}
      >
        <div className='fs-4'>{localTime}</div>
        <div>{getIcon(weather.at(0).icon, weather.at(0).main, '80px')}</div>
        <div className='d-flex flex-column'>
          <p className='m-0'>{capitalizeText(weather.at(0).description)}</p>
          <p className='mb-2'>{`${temp.toFixed(1)}°C`}</p>
        </div>
      </div>
    </div>
  );
};
HourWeatherCard.propTypes = {
  hourvalues: PropTypes.object.isRequired,
  timezone_offset: PropTypes.number.isRequired,
};
