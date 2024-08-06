/* eslint-disable react-hooks/exhaustive-deps */
import css from "./MovieDetailsPage.module.css";
import { useEffect, useState, useRef, Suspense } from "react";
import getTrendMovie from "../../request-function.js";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { ThreeCircles } from "react-loader-spinner";

const Loader = (
  <ThreeCircles
    visible={true}
    height="50"
    width="50"
    color="darkgrey"
    ariaLabel="three-circles-loading"
    wrapperStyle={{}}
    wrapperClass="loader"
  />
);
const defaultImg =
  "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
export default function MovieDetailsPage() {
  const location = useLocation();
  const locationRef = useRef(location.state ?? "/movies");
  const movieId = useParams().movieId;
  const [movieDetails, setMovieDetails] = useState([]);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoad(true);
        const movieResult = await getTrendMovie(
          `/movie/${movieId}?language=en-US`
        );
        setMovieDetails(movieResult);
        setLoad(false);
      } catch {
        console.error();
      } finally {
        setLoad(false);
      }
    }
    fetchMovie();
  }, [movieId]);
  const { poster_path, title, release_date, genres, overview, vote_average } =
    movieDetails;
  const movieYear = Number.parseInt(release_date);
  return (
    <div className={css.container}>
      <Link to={locationRef.current} className={css.returnLink}>
        {<GoArrowLeft className={css.linkIcon} />} Go back
      </Link>
      {load && Loader}
      {!load && (
        <div className={css.movieWrapper}>
          {poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300/${poster_path}`}
              alt={title}
              className={css.movieCard}
            />
          ) : (
            <img src={defaultImg} alt="poster" width="270" />
          )}
          <div className={css.textWrapper}>
            {!isNaN(movieYear) && (
              <div>
                <h2 className={css.movieTitle}>
                  {title} ({movieYear})
                </h2>
                <p className={css.movieText}>
                  User Score: {Math.round(vote_average * 10)}%
                </p>
              </div>
            )}
            {overview !== undefined && (
              <div className={css.detailsConteiner}>
                <h3 className={css.movieDetails}>Overview</h3>
                <p className={css.movieText}>{overview}</p>
              </div>
            )}
            {genres !== undefined && (
              <div className={css.detailsConteiner}>
                <h3 className={css.movieDetails}>Genres</h3>
                <ul className={css.movieList}>
                  {genres.map((genre, index) => (
                    <li key={index}>
                      <p className={css.movieText}>{genre.name}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
      {!load && (
        <div className={css.linkContainer}>
          <h4>Additional information :</h4>
          <div className={css.linkWrapper}>
            <Link to="cast" className={css.additionalLink}>
              Cast
            </Link>
            <Link to="reviews" className={css.additionalLink}>
              Reviews
            </Link>
          </div>
        </div>
      )}
      <Suspense fallback={Loader}>
        <Outlet />
      </Suspense>
    </div>
  );
}