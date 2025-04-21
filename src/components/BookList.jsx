// import Flashcard from './Flashcard';

// const BookList = ({ books }) => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//       {books.map((book, idx) => (
//         <Flashcard key={idx} book={book} />
//       ))}
//     </div>
//   );
// };

// export default BookList;



import Flashcard from './Flashcard';

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {books.map((book, idx) => (
        <Flashcard key={idx} book={book} />
      ))}
    </div>
  );
};

export default BookList;