import { applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import { storeConfig } from '../helpers/storeConfig';
import { locationReducer } from '../reducers/locationReducer';

// Reducers de la aplicacion
const reducers = combineReducers({
  location: locationReducer,
});

// Configuracion para posterior uso del middleware
const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// Asignacion del principal contenedor de estado de la webapp
export const store = storeConfig(reducers, composeEnhancers(applyMiddleware(thunk)));
