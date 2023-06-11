import { useContext } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CitySelection } from '../components/CitySelection';
import Header from '../components/UI/Header';
import Navbar from '../components/UI/Navbar';
import { DataContext } from '../components/data/DataContext';
import BlanckPage from '../components/pages/BlanckPage';
import CurrentForecast from '../components/pages/CurrentForecast';
import Next48hForecast from '../components/pages/Next48hForecast';
import WeekForecast from '../components/pages/WeekForecast';
/**
 * Router que indexa las diferentes paginas creadas para mostrar informacion
 * @returns JSX Element
 */
const AppRouter = () => {
  // Manejo del tema y control de renderizacion para <citySelection />
  const { themeToggle, searchToggle } = useContext(DataContext);
  const { theme } = themeToggle;
  const { sendedSearch } = searchToggle;

  return (
    <div
      className={`d-flex flex-column h-100 px-md-5 ${
        theme && 'bg-secondary bg-opacity-75'
      }`}
      style={{ minHeight: '100vh' }}
    >
      <HashRouter>
        <Header />
        <Navbar />
        {sendedSearch && <CitySelection />}
        <div className='m-5 mt-3'>
          <Routes>
            <Route path='today' element={<CurrentForecast />} />
            <Route path='next48h' element={<Next48hForecast />} />
            <Route path='week' element={<WeekForecast />} />
            <Route path='' element={<BlanckPage />} />
            <Route path='*' element={<Navigate to='/' />} />
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
};

export default AppRouter;
