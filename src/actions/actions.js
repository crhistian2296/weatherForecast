import { getArrOfCoordinates, getWeatherForecast } from '../services/apiQuerys';
import { types } from '../types/types';

//* Acciones sincrona
/**
 * Accion que crea propiedades con el nombre y valor especificados
 * @param {any} res
 * @param {String} name
 * @returns Object
 */
export const send = (res, name) => ({
  type: types.send,
  payload: res,
  name,
});

//* Acciones asincronas
/**
 * Recupera un array de ciudades usando una llamada a openWeatherAPI
 * @param {String} locationName
 * @returns Array
 */
export const getCoordinates = locationName => {
  return dispatch => {
    getArrOfCoordinates(locationName)
      .then(res => dispatch(send(res.data, 'cities')))
      .catch(err => console.error(err));
  };
};
/**
 * Recupera un objeto con todos datos de previsiones temporales
 * @param {Number} lat
 * @param {Number} lon
 * @returns Object
 */
export const weatherForecast = (lat, lon) => {
  return dispatch => {
    getWeatherForecast(lat, lon)
      .then(res => dispatch(send(res.data, 'weatherForecast')))
      .catch(err => console.error(err));
  };
};
