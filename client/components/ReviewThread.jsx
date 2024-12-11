import React, { useState } from 'react';

const ReviewThread = ({ reviews }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Hide Reviews' : 'Show Reviews'}
      </button>
      {expanded && (
        <ul>
          {reviews.map((review, index) => (
            <li key={index}>
              <strong>{review.user}</strong>: {review.comment} ({new Date(review.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewThread;