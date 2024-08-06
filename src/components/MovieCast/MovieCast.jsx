
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import getCastInfo from "../../request-function.js";
import css from "./MovieCast.module.css";
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
export default function MovieCast() {
  const [load, setLoad] = useState(false);
  const movieId = useParams().movieId;
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(false);
  const [actorsLenght, setActorsLenght] = useState(false);
  useEffect(() => {
    async function fechDetails() {
      try {
        setError(false);
        setActorsLenght(false);
        setLoad(true);
        const detailResult = await getCastInfo(
          `/movie/${movieId}/credits?language=en-US`
        );
        setActors(detailResult.cast);
        if (actors.length === 0) setActorsLenght(true);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    fechDetails();
  }, [movieId, actorsLenght, actors.length]);
  return (
    <div>
      {load && Loader}
      {error && <p className="notFound">Opps... Please, reload page</p>}
      {actorsLenght && <p className="notFound">Do not find details</p>}
      <ul className={css.actorsList}>
        {actors.map(({ name, character, profile_path, cast_id }) => (
          <li key={cast_id} className={css.actorsItem}>
            {profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${profile_path}`}
                alt={name}
                width="170"
              />
            ) : (
              <img src={defaultImg} alt="poster" width="170" />
            )}
            <p className={css.castText}>{name}</p>
            <p className={css.castText}>Character: {character}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}