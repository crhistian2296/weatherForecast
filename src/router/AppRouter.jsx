import { useContext } from 'react';
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { CitySelection } from '../components/CitySelection';
import Header from '../components/UI/Header';
import Navbar from '../components/UI/Navbar';
import { DataContext } from '../components/data/DataContext';
import BlanckPage from '../components/pages/BlanckPage';
import CurrentForecast from '../components/pages/CurrentForecast';
import Login from '../components/pages/Login';
import Next48hForecast from '../components/pages/Next48hForecast';
import { PrivateRoutes } from '../components/pages/PrivateRoutes';
import { PublicRoutes } from '../components/pages/PublicRoutes';
import SignUp from '../components/pages/SignUp';
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

  // Todo
  const user = {
    name: 'cris',
    id: 1234,
    logged: false,
  };

  return (
    <div
      className={`d-flex flex-column h-100 ${user.logged && 'px-md-5'} ${
        theme && 'bg-secondary bg-opacity-75'
      }`}
      style={{ minHeight: '100vh' }}
    >
      <Router>
        {user.logged && <Header />}
        {user.logged && <Navbar />}
        {sendedSearch && <CitySelection />}
        <div className={`${user.logged && 'm-5 mt-3'}`}>
          <Routes>
            <Route path='protected' element={<PrivateRoutes user={user} />}>
              <Route path='today' element={<CurrentForecast />} />
              <Route path='next48h' element={<Next48hForecast />} />
              <Route path='week' element={<WeekForecast />} />
              <Route path='' element={<BlanckPage />} />
              <Route path='*' element={<Navigate to='pretected/' />} />
            </Route>
            <Route path='/' element={<PublicRoutes user={user} />}>
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<SignUp />} />
              <Route path='*' element={<Navigate to='login' />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
};

export default AppRouter;
