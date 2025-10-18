import { MovieItem } from './movie-item';

const movie = {
  Title: 'The Dark Knight',
  Poster: '/sample-poster.jpg',
};

export const MovieList = () => {
  return (
    <div>
      <MovieItem movie={movie} />
    </div>
  );
};
