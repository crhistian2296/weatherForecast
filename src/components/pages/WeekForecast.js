import moment from 'moment';
import { useSelector } from 'react-redux';
import { DayWeatherCard } from '../DayWeatherCard';
import { WeatherSheet } from '../WeatherSheet';

/**
 * Ruta que muestra informacion meteorologica concerntiente a los siguientes 7 dias
 * @returns JSX Element
 */
const WeekForecast = () => {
  // Obtencion de informacion concerniente a localizacion y meteorologia
  const reduxState = useSelector((state) => state);
  const { selectedCity } = reduxState.location;
  const { timezone_offset = 0, daily, current } = reduxState.location.weatherForecast;
  const timezoneOffsetCorrected = timezone_offset - 2 * 3600;
  const { dt } = current;

  // Manejo de tiempo en segundos en formato unix con la libreria momentJS
  const day = moment.unix(dt + timezoneOffsetCorrected);
  const localTime = day.format('dddd, kk:mm');

  return (
    <>
      <div className='display-5 mb-3'>Week Weather Forecast</div>
      <WeatherSheet localTime={`${localTime} ${selectedCity}`}>
        <div className='row row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-3 p-4 pb-2'>
          {daily.map((dayValues) => (
            <DayWeatherCard
              key={window.crypto.randomUUID()}
              dayValues={dayValues}
              timezone_offset={timezoneOffsetCorrected}
            />
          ))}
        </div>
      </WeatherSheet>
    </>
  );
};

export default WeekForecast;
