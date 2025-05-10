import React from 'react';

const BookList = ({ books, onUpdate, onDelete }) => {
  if (!books || books.length === 0) {
    return <p className="text-gray-500">No books in your reading list.</p>;
  }

  return (
    <ul className="space-y-4">
      {books.map((book) => (
        <li
          key={book.bookId}
          className="p-4 border border-gray-300 rounded-md shadow-sm bg-gray-50"
        >
          <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
          <p className="text-gray-600">
            <span className="font-medium">Author:</span> {book.author}
          </p>
          <p className="text-gray-600">
            <span className="font-medium">Status:</span> {book.status || 'Unknown'}
          </p>
          <div className="mt-4 flex space-x-2">
            <button
              onClick={() => onUpdate(book)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Update
            </button>
            <button
              onClick={() => onDelete(book.bookId)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BookList;