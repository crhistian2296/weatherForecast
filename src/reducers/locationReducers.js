import { types } from '../types/types';
/**
 * Reducer que recibe las acciones despachadas y actualiza el estado
 * @param {Object} state
 * @param {Object} action
 * @returns Estado en forma de objeto
 */
export const locationReducer = (state = {}, action) => {
  switch (action.type) {
    case types.send:
      return { ...state, [action.name]: action.payload };

    default:
      return state;
  }
};
