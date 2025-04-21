

// import React from 'react';

// const Flashcard = ({ book, onAddToShelf }) => {
//   const { volumeInfo } = book;
//   const { title, authors, imageLinks } = volumeInfo;

//   // Check if the book is already in the shelf
//   const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || { wantToRead: [] };
//   const alreadyAdded = bookshelf.wantToRead.some((b) => b.id === book.id);

//   return (
//     <div className="max-w-xs bg-white p-4 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 ease-in-out hover:scale-105">
//       <div className="relative overflow-hidden rounded-lg h-80">
//         <img
//           src={imageLinks?.thumbnail || 'https://via.placeholder.com/128x192'}
//           alt={title}
//           className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
//         />
//       </div>

//       <div className="mt-4">
//         <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
//         <p className="text-xs text-gray-600">{authors?.join(', ')}</p>

//         {alreadyAdded ? (
//           <button
//             disabled
//             className="mt-4 w-full bg-gray-400 text-white p-2 rounded-lg cursor-not-allowed"
//           >
//             ✅ Added to Shelf
//           </button>
//         ) : (
//           <button
//             onClick={() => onAddToShelf(book)}
//             className="mt-4 w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
//           >
//             Add to Shelf
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Flashcard;


import React from 'react';

const Flashcard = ({ book, onAddToShelf }) => {
  const { volumeInfo } = book;
  const { title, authors, imageLinks } = volumeInfo;

  // Check if the book is already in the shelf
  const bookshelf = JSON.parse(localStorage.getItem('bookshelf')) || { wantToRead: [] };
  const alreadyAdded = bookshelf.wantToRead.some((b) => b.id === book.id);

  return (
    <div className="max-w-xs bg-gray-100 p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
      <div className="relative overflow-hidden rounded-lg h-80 mb-4">
        <img
          src={imageLinks?.thumbnail || 'https://via.placeholder.com/128x192'}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-110"
        />
      </div>

      <div className="flex flex-col justify-between">
        <h3 className="text-lg font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-sm text-gray-500 mb-4 truncate">{authors?.join(', ')}</p>

        {/* Add to Shelf button */}
        {alreadyAdded ? (
          <button
            disabled
            className="w-full bg-gray-300 text-white p-2 rounded-lg cursor-not-allowed shadow-sm transition-all duration-300"
          >
            ✅ Added to Shelf
          </button>
        ) : (
          <button
            onClick={() => onAddToShelf(book)}
            className="w-full bg-indigo-400 text-white p-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:ring-opacity-50 transition-all duration-300"
          >
            Add to Shelf
          </button>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
