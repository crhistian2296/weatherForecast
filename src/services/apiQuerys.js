/* eslint-disable no-useless-catch */
import axios from 'axios';

/**
 * Llamada a openWeatherAPI que trae informacion de maximo 5 ciudades
 * @param {String} locationName
 * @returns {Array} Array
 */
export const getArrOfCoordinates = async locationName => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${locationName}&limit=5&appid=dc95562776b6b4eaf655bac72e985edb`.trim(),
    );
    return res;
  } catch (err) {
    throw err;
  }
};

/**
 *Llamada a openWeatherAPI que trae toda la informacion de previsiones
 * @param {NUmber} lat
 * @param {NUmber} lon
 * @returns {Object}
 */
export const getWeatherForecast = async (lat, lon) => {
  try {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&appid=dc95562776b6b4eaf655bac72e985edb`.trim(),
    );

    return res;
  } catch (err) {
    throw err;
  }
};

/**
 * Llamada a openWeatherAPI que devuelve una imagen con las caracteristicas especificadas
 * @param {String} iconId
 * @param {String} weatherMain
 * @param {String} size
 * @returns JSX Element
 */
export const getIcon = (iconId, weatherMain, size = '180px') => {
  return (
    <img
      loading='lazy'
      src={`https://openweathermap.org/img/wn/${iconId}@4x.png`}
      height={size}
      width={size}
      alt={`${weatherMain}`}
    />
  );
};
