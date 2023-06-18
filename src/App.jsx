import { Provider } from 'react-redux';
import DataProvider from './components/data/DataContext';
import AppRouter from './router/AppRouter';
import { store } from './store/store';

function App() {
  return (
    <DataProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </DataProvider>
  );
}

export default App;
