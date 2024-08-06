import { Link, useLocation } from "react-router-dom";
import css from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  if (movies.length > 0) {
    return (
      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className={css.moviesItem}>
            <Link
              to={`/movies/${movie.id}`}
              state={location}
              className={css.moviesLink}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  } else return;
}