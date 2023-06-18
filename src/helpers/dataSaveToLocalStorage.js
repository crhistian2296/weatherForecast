/**
 *  Guarda una copia del estado introducido en el localStorage
 * @param {Object} reduxState
 */
export const dataSaveToLocalStorage = (reduxState) => {
  localStorage.setItem('reduxState', JSON.stringify(reduxState));
};
