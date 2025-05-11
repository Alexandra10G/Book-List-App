import React, { useState, useEffect } from 'react';
import BookList from './BookList';
import { useRouter } from 'next/router';

const MainPage = () => {
  const [username, setUsername] = useState('');
  const [reader, setReader] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  const handleCheckUser = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`/api/readers/get-reader`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        setReader(data.reader);
        localStorage.setItem('username', username);
      } else if (response.status === 404) {
        const confirmCreate = window.confirm(
          `User "${username}" does not exist. Do you want to create a new user?`
        );
        if (confirmCreate) {
          await handleCreateUser();
        }
      } else {
        setError(data.message || 'An error occurred');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    try {
      const response = await fetch(`/api/readers/create-reader`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('username', username);
        alert(`User "${username}" created successfully!`);
        setReader({ username, readingList: [] });
      } else {
        setError(data.message || 'Failed to create user');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  const handleAddBook = () => {
    router.push({
      pathname: '/book-form',
      query: { username },
    });
  };

  const handleUpdateBook = (book) => {
    router.push({
      pathname: '/book-form',
      query: { username, ...book },
    });
  };

  const handleDeleteBook = async (bookId) => {
    try {
      const response = await fetch(`/api/readers/delete-book`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, bookId }),
      });

      if (response.ok) {
        setReader((prev) => ({
          ...prev,
          readingList: prev.readingList.filter((book) => book.bookId !== bookId),
        }));
        alert('Book deleted successfully!');
      } else {
        setError('Failed to delete book');
      }
    } catch (err) {
      setError('Failed to connect to the server');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Welcome to the Reading List App
        </h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleCheckUser}
          disabled={loading || !username}
          className={`w-full px-4 py-2 text-white font-semibold rounded-md ${
            loading || !username
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
      {reader && (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md mt-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Books for {reader.username}
          </h2>
          <button
            onClick={handleAddBook}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add New Book
          </button>
          <BookList
            books={reader.readingList}
            onUpdate={handleUpdateBook}
            onDelete={handleDeleteBook}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;