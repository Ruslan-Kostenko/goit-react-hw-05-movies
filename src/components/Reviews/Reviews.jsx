import { fetchReviews } from 'API';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Reviews = () => {
  const { id } = useParams();

  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchReviews(id);
        data.results.length !== 0 && setReviews(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    getReviews();
  }, [id]);

  return (
    <>
      {reviews ? (
        <ul>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>Author:{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div> Sorry, here is not reviews! </div>
      )}
    </>
  );
};

export default Reviews;
