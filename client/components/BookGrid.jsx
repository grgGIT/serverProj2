import React, { useEffect, useState } from 'react';
import BookCard from './BookCard';
import './BookGrid.css'; // Assuming you have a CSS file for styling

const BookGrid = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/api/books') // Adjust the endpoint as necessary
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(() => {
        // Fallback to local JSON if API fails
        import('./books.json').then(module => setBooks(module.default));
      });
  }, []);

  return (
    <div className="book-grid" style={{ backgroundImage: 'url(/hosted/background.jpg)' }}>
      {books.map(book => (
        <BookCard key={book._id} book={book} />
      ))}
    </div>
  );
};

export default BookGrid;