import React, { useState } from 'react';

const Wallet = () => {
  const [balance, setBalance] = useState(0);

  // Logic to update balance based on rentals and returns

  return (
    <div>
      <h2>Wallet Balance: ${balance}</h2>
    </div>
  );
};

export default Wallet;