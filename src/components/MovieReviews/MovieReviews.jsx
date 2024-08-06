import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import getReviewsInfo from "../../request-function.js";
import css from "./MovieReviews.module.css";

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
export default function MovieReviews() {
  const [load, setLoad] = useState(false);
  const movieId = useParams().movieId;
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function getReviews() {
      try {
        setError(false);
        setLoad(true);
        const result = await getReviewsInfo(
          `/movie/${movieId}/reviews?language=en-US&page=1`
        );
        setReviews(result.results);
      } catch {
        setError(true);
      } finally {
        setLoad(false);
      }
    }
    getReviews();
  }, [movieId]);
  return (
    <div className={css.container}>
      {load && Loader}
      {error && <p className="notFound">Opps... Please, reload page</p>}
      {reviews.length === 0 && !load && (
        <p className="notFound">We do not have any reviews for this film.</p>
      )}
      <ul className={css.reviewsList}>
        {reviews.map(({ id, author, content }) => (
          <li key={id} className={css.reviewsItem}>
            <h4 className={css.reviewsTitle}>Author: {author}</h4>
            <p className={css.reviewsText}>{content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}