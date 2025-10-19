import { useParams } from 'react-router';
import { MovieList } from '../components/movies/movie-list';
import { MovieInfo } from '../components/movies/movie-info';

export default function MoviesDetails() {
  const { movieId } = useParams();
  return (
    <>
      <div className='movie-details-container'>
        <MovieInfo id={movieId} />
      </div>
      <div className='movie-details-margin'>
        <h3 className='movie-details-recommended-movies'>Recommended Movies</h3>
        <MovieList />
      </div>
    </>
  );
}
