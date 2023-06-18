import { createStore } from 'redux';
/**
 * Crea un store dependiendo si existe un estado inicial o no
 * @param {Object} rootReducer
 * @param {*} composeEnhancers
 * @returns Funcion
 */
export const storeConfig = (rootReducer, composeEnhancers) => {
  const preloadedState = JSON.parse(localStorage.getItem('reduxState'));
  if (preloadedState) {
    return createStore(rootReducer, preloadedState, composeEnhancers);
  }
  return createStore(rootReducer, composeEnhancers);
};
