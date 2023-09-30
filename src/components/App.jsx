// import { Home } from '../pages/Home';
// import { Movies } from '../pages/Movies';
// import { Details } from '../pages/Details';
// import { Cast } from './Cast/Cast';
// import { Reviews } from './Reviews/Reviews';
// import NotFound from 'pages/NotFound';
import { Layout } from './Layout/Layout';
import { Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { GlobalStyle } from 'GlobalStyle';

const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const Details = lazy(() => import('../pages/Details'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));
const NotFound = lazy(() => import('../pages/NotFound'));


export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="movies/:id" element={<Details />} >
            <Route path='reviews' element={<Reviews />} />
            <Route path='cast' element={<Cast />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
      <GlobalStyle />
    </div>
  );
};
