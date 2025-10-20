import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import SiteLayout from './components/site-layout';
import { useMovie } from './context/movie-context';
import Home from './pages/home';
import MovieDetails from './pages/movie-details';
import Movies from './pages/movies';
import NotFound from './pages/not-found';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/firebase';
import Likes from './pages/likes';

function App() {
  const { setUser } = useMovie();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [setUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movies/:movieId' element={<MovieDetails />} />
          <Route path='/likes' element={<Likes />} />
          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
