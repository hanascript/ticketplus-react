import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/home';
import Movies from './pages/movies';
import SiteLayout from './components/site-layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route path='/' element={<Home />} />
          <Route path='/movies' element={<Movies />} />
          {/* <Route path='/settings' element={<Settings />} /> */}
          {/* <Route path='/help' element={<Help />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
