import React, { useState, useEffect } from 'react';

const UserAccount = () => {
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);

  useEffect(() => {
    // Fetch user's checked out books
  }, []);

  const handleReturn = (bookId) => {
    // Logic to return the book and update wallet balance
  };

  return (
    <div>
      <h2>Your Account</h2>
      <ul>
        {checkedOutBooks.map(book => (
          <li key={book._id}>
            {book.title} - <button onClick={() => handleReturn(book._id)}>Return</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAccount;