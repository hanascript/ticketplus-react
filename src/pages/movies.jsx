import { MovieList } from '../components/movies/movie-list';
import { MoviesSearch } from '../components/movies/movies-search';
import { useMovie } from '../context/movie-context';

export default function Movies() {
  const { movieQuery } = useMovie();

  return (
    <>
      <MoviesSearch />
      <section className='w-full margin-auto'>
        {!movieQuery && (
          <figure className='movies-image-wrapper margin-auto'>
            <img src='/start-search.svg' alt='start-search' />
            <h2>Waiting for your Search...</h2>
          </figure>
        )}
      </section>
      {movieQuery && (
        <section className='movies-margin'>
          <MovieList movieQuery={movieQuery} spinner={true} />
        </section>
      )}
    </>
  );
}
