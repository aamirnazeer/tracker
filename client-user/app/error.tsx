'use client'; // Error components must be Client components

import axios from 'axios';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  const accessTokenHandler = () => {
    axios
      .post(
        'http://localhost:5000/api/token',
        {},
        {
          withCredentials: true,
        }
      )
      .then(() => console.log('new token'))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          accessTokenHandler
        }
      >
        Try again
      </button>
    </div>
  );
}
