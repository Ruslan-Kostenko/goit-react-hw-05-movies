import { fetchMovieByQuery } from 'API';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('search') ?? '');
  const location = useLocation();

  const onSubmitHandle = e => {
    e.preventDefault();
    const newQuery = e.target.elements.search.value;
    setQuery(newQuery);

    if (newQuery === '') {
      return toast.error('Sorry, please provide a search word');
    }
    setSearchParams({search: newQuery});
    
  };

  useEffect(() => {
    if (query === '') {
      return;
    }
    const getMovieByQuery = async () => {
      try {
        const data = await fetchMovieByQuery(query);
        data.results.length !== 0 && setMovies(data.results);
        toast.success(`Okey! Found ${data.results.length} movies`);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieByQuery();
  }, [query]);

  return (
    <main>
      <Toaster position="top-right" reverseOrder={true} />
      <form onSubmit={onSubmitHandle}>
        <input type="text" name="search" defaultValue={query} />
        <button>Search</button>
      </form>
      {movies.length !== 0 && (
        <section>
          <ul>
            {movies.map(movie => (
              <li key={movie.id}>
                <Link to={`${movie.id}`} state={{ from: location }}>{movie.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
};

export default Movies;
