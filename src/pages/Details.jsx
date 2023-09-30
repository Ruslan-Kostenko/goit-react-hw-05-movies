import { fetchMoviesByID } from 'API';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const Details = () => {
  const { id } = useParams();
  const [oneMovie, setOneMovie] = useState(null);
  const location = useLocation();
  const backButton = useRef(location.state?.from ?? '/');

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const data = await fetchMoviesByID(id);
        setOneMovie(data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovieById();
  }, [id]);

  if (oneMovie === null) {
    return;
  }

  const { title, poster_path, vote_average, overview, genres, release_date } = oneMovie;

  const poster = `http://image.tmdb.org/t/p/w300${poster_path}`;
  const date = release_date.slice(0,4);
  const score = Math.round(vote_average * 10);
  const tags =
    genres &&
    genres.map(genre => {
      return <li key={genre.id}>{genre.name}</li>;
    });

  return (
    <main>
      <Link to={backButton.current}>Get back</Link>
      <h2>{title}({date})</h2>
      <img src={poster} alt={title} />
      <p>User Score:{score}%</p>
      <h3>Overview</h3>
      <p>{overview}</p>
      <h3>Genres</h3>
      <ul>{tags}</ul>
      <p>Additional info</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>
      <Suspense>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default Details;
