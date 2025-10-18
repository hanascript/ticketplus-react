import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home';
import Movies from './pages/movies';
import SiteLayout from './components/site-layout';
import MovieDetails from './pages/movie-details';
import { SearchProvider } from './context/search-context';

function App() {
  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route path='/' element={<Home />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/movies/:movieId' element={<MovieDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  );
}

export default App;
