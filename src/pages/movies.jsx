import { MovieList } from '../components/movies/movie-list';
import { MoviesSearch } from '../components/movies/movies-search';
import { useSearch } from '../context/search-context';

export default function Movies() {
  const { searchQuery } = useSearch();

  return (
    <>
      <MoviesSearch />
      <div className='w-full margin-auto'>
        {!searchQuery && (
          <figure className='movies-image-wrapper margin-auto'>
            <img src='/start-search.svg' alt='start-search' />
            <h2>Waiting for your Search...</h2>
          </figure>
        )}
      </div>
      {searchQuery && <MovieList searchQuery={searchQuery} />}
    </>
  );
}
