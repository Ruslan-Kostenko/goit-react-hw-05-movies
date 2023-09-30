import { fetchMovies } from 'API';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        const array = await data.results.map(({ id, title, poster_path }) => {
          return { id, title, poster_path };
        });
        setMovies(array);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <main>
      <h2>Trending movies</h2>
      <ul>
        {movies.map(movie => {
          const poster = `http://image.tmdb.org/t/p/w200${movie.poster_path}`;
          return (
            <li key={movie.id}>
              {movie.poster_path ? (
                <img src={poster} alt={movie.title} width="200px"></img>
              ) : (
                <p></p>
              )}
              <Link to={`movies/${movie.id}`}>{movie.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Home;
