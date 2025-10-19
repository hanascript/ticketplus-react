import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home';
import Movies from './pages/movies';
import SiteLayout from './components/site-layout';
import MovieDetails from './pages/movie-details';
import NotFound from './pages/not-found';
import { MovieProvider } from './context/movie-context';

function App() {
  return (
    <MovieProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movies/:movieId' element={<MovieDetails />} />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MovieProvider>
  );
}

export default App;
