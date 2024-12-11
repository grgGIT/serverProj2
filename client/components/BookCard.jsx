import React from 'react';
import ReviewThread from './ReviewThread';

const BookCard = ({ book }) => {
  const handleRent = () => {
    // Logic to rent the book and update wallet balance
  };

  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Price: ${book.price}</p>
      <button onClick={handleRent}>Rent</button>
      <ReviewThread reviews={book.reviews} />
    </div>
  );
};

export default BookCard;