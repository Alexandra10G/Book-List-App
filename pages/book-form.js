import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const BookFormPage = () => {
  const router = useRouter();
  const { username, bookId, title, author, status } = router.query;

  const [formData, setFormData] = useState({
    title: title || '',
    author: author || '',
    status: status || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = bookId ? `/api/readers/update-book` : `/api/readers/add-book`;
  const method = bookId ? 'PUT' : 'POST';

  // Prepare the request body
  const body = bookId
    ? { username, bookId, updates: formData } // For updating a book
    : { username, book: formData }; // For adding a new book

  try {
    const response = await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      alert(bookId ? 'Book updated successfully!' : 'Book added successfully!');
      router.push('/'); // Redirect back to the main page
    } else {
      const errorData = await response.json();
      alert(errorData.message || 'Failed to save book');
    }
  } catch (err) {
    console.error('Error saving book:', err);
    alert('Failed to connect to the server');
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
          {bookId ? 'Update Book' : 'Add New Book'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium">Status</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={() => router.push('/')}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookFormPage;