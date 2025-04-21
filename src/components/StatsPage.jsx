

// import React, { useEffect, useState } from "react";
// import { useAuth } from "../Context/AuthContext"  // Import the auth context (adjust the path)


// const StatsPage = () => {
//   const { user } = useAuth();  // Get the logged-in user

//   const [bookshelf, setBookshelf] = useState({ wantToRead: [] });
//   const [monthlyBooksRead, setMonthlyBooksRead] = useState(0);
//   const [readingGoalProgress, setReadingGoalProgress] = useState(0);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const stored = localStorage.getItem("reviews");
//     if (stored) {
//       setReviews(JSON.parse(stored));
//     }
//   }, []);
//   const updateStats = () => {
//     const bookshelf = JSON.parse(localStorage.getItem(`bookshelf-${user.uid}`)) || { wantToRead: [], finished: [] };
    
//     // Update total books
//     const totalBooks = bookshelf.wantToRead.length + bookshelf.finished.length;
//     localStorage.setItem('totalBooks', totalBooks);
  
//     // Update books read this month
//     const booksReadThisMonth = bookshelf.finished.filter(book => {
//       const bookDate = new Date(book.dateAdded);  // Assuming dateAdded is stored with each book
//       const currentDate = new Date();
//       return (
//         bookDate.getMonth() === currentDate.getMonth() && bookDate.getFullYear() === currentDate.getFullYear()
//       );
//     }).length;
  
//     localStorage.setItem('booksReadThisMonth', booksReadThisMonth);
//     bookshelf(totalBooks);
//     setMonthlyBooksRead(booksReadThisMonth);
//   };

//   const handleRemoveBook = (book, shelfType) => {
//     const updatedBookshelf = { ...bookshelf };
//     updatedBookshelf[shelfType] = updatedBookshelf[shelfType].filter((item) => item.id !== book.id);
  
//     localStorage.setItem(`bookshelf-${user.uid}`, JSON.stringify(updatedBookshelf));
  
//     // Update stats
//     updateStats();
//     setBookshelf(updatedBookshelf);
//   };
  
  

 
//   useEffect(() => {
//     // Ensure we get the updated bookshelf after any changes
//     const savedBookshelf = localStorage.getItem(`bookshelf-${user.uid}`);
//     if (savedBookshelf) {
//       const bookshelfData = JSON.parse(savedBookshelf);
//       setBookshelf(bookshelfData);
//     }
//   }, [user.uid]); // Run when user changes
  
//   useEffect(() => {
//     // Get books read this month after bookshelf is updated
//     const booksRead = JSON.parse(localStorage.getItem(`booksRead-${user.uid}`)) || [];
//     const booksThisMonth = booksRead.filter((book) => {
//       const date = new Date(book.removedDate);
//       return (
//         date.getMonth() === new Date().getMonth() &&
//         date.getFullYear() === new Date().getFullYear()
//       );
//     });
//     setMonthlyBooksRead(booksThisMonth.length);
//   }, [user.uid, bookshelf]);  // Update monthly books when bookshelf changes
  

//   const totalBooks = bookshelf.wantToRead.length;

//   const handleAddReview = (book, reviewText, rating) => {
//     const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    
//     const newReview = {
//       bookName: book.volumeInfo.title,
//       reviewText,
//       rating,
//       bookId: book.id,
//     };
    
//     reviews.push(newReview);
//     localStorage.setItem('reviews', JSON.stringify(reviews));
//   };
  


  

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10 px-6">
//       <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
//         📊 Your Reading Stats
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//         {[
//           {
//             title: "📚 Total Books",
//             value: totalBooks,
//             color: "text-blue-600",
//             bg: "bg-white",
//           },
//           {
//             title: "📅 Books Read This Month",
//             value: monthlyBooksRead,
//             color: "text-green-600",
//             bg: "bg-white",
//           },
//           {
//             title: "🌟 Reviews Added",
//             value: reviews.length,
//             color: "text-yellow-600",
//             bg: "bg-white",
//           },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className={`rounded-2xl shadow-md p-6 text-center ${item.bg}`}
//           >
//             <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
//             <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
//           </div>
//         ))}
//       </div>

//       <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
//         <h3 className="text-2xl font-semibold mb-4 text-purple-700">
//           🎯 Reading Goal Progress
//         </h3>
//         <div className="mb-3 flex items-center justify-between">
//           <p className="text-lg font-medium">Goal: 50 Books</p>
//           <p className="text-lg font-semibold text-blue-700">
//             {readingGoalProgress.toFixed(0)}%
//           </p>
//         </div>
//         <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
//           <div
//             className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-500"
//             style={{ width: `${readingGoalProgress}%` }}
//           ></div>
//         </div>
//       </div>

      

//       <div className="bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-2xl font-semibold mb-6 text-teal-600">📝 Reviews</h2>
//         {reviews.length === 0 ? (
//           <p className="text-gray-500 text-center">No reviews submitted yet.</p>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {reviews.map((review, index) => (
//               <div
//                 key={index}
//                 className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
//               >
//                 <p className="mb-1">
//                   <strong>📖 Book:</strong> {review.title}
//                 </p>
//                 <p className="mb-1">
//                   <strong>⭐ Rating:</strong>{" "}
//                   <span className="text-yellow-500">
//                     {"⭐".repeat(review.rating)}
//                   </span>
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>🗒 Description:</strong> {review.description}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StatsPage;




import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext"; // Import the auth context (adjust the path)

const StatsPage = () => {
  const { user } = useAuth(); // Get the logged-in user
  const [totalBooks, setTotalBooks] = useState(0);

  const [bookshelf, setBookshelf] = useState({ wantToRead: [], finished: [] });
  const [monthlyBooksRead, setMonthlyBooksRead] = useState(0);
  const [readingGoalProgress, setReadingGoalProgress] = useState(0);
  const [reviews, setReviews] = useState([]);

  const goal=50;

  // Update stats from localStorage
  const updateStats = () => {
    const bookshelfData = JSON.parse(localStorage.getItem(`bookshelf-${user.uid}`)) || { wantToRead: [], finished: [] };

    // Update total books
    const totalBooks = bookshelfData.wantToRead.length + bookshelfData.finished.length;
    localStorage.setItem("totalBooks", totalBooks); // Store in localStorage for total books

    // Update reading goal progress
    const goal = 50; // Assuming the reading goal is 50 books
    const progress = Math.min((totalBooks / goal) * 100, 100);
    setReadingGoalProgress(progress);

    // Update books read this month
    const booksReadThisMonth = bookshelfData.finished.filter((book) => {
      const bookDate = new Date(book.dateAdded); // Assuming dateAdded is stored with each book
      const currentDate = new Date();
      return bookDate.getMonth() === currentDate.getMonth() && bookDate.getFullYear() === currentDate.getFullYear();
    }).length;

    localStorage.setItem("booksReadThisMonth", booksReadThisMonth);
    setMonthlyBooksRead(booksReadThisMonth);
  };

  // Handle the removal of a book from the bookshelf
  const handleRemoveBook = (book, shelfType) => {
    const updatedBookshelf = { ...bookshelf };
    updatedBookshelf[shelfType] = updatedBookshelf[shelfType].filter((item) => item.id !== book.id);

    localStorage.setItem(`bookshelf-${user.uid}`, JSON.stringify(updatedBookshelf));

    // Update stats after removing the book
    updateStats();
    setBookshelf(updatedBookshelf);
  };

  // Handle adding a book to the bookshelf
  const handleAddBook = (book, shelfType) => {
    const updatedBookshelf = { ...bookshelf };
    updatedBookshelf[shelfType].push(book);

    localStorage.setItem(`bookshelf-${user.uid}`, JSON.stringify(updatedBookshelf));

    // Update stats after adding the book
    updateStats();
    setBookshelf(updatedBookshelf);
  };

  // Fetch reviews from localStorage
  useEffect(() => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviews(storedReviews);
  }, []);

  // Fetch the bookshelf data from localStorage when the page loads
  useEffect(() => {
    const savedBookshelf = localStorage.getItem(`bookshelf-${user.uid}`);
    if (savedBookshelf) {
      const bookshelfData = JSON.parse(savedBookshelf);
      setBookshelf(bookshelfData);
    }
  }, [user.uid]); // This will run whenever user.uid changes

  // Update monthly books read when bookshelf changes
  useEffect(() => {
    updateStats(); // This ensures that stats get updated correctly when bookshelf changes
  }, [user.uid, bookshelf]); // Update when bookshelf changes

  // Handle adding a review
  const handleAddReview = (book, reviewText, rating) => {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const newReview = {
      bookName: book.volumeInfo.title, // Book name should be stored as bookName
      reviewText,
      rating,
      bookId: book.id,
    };

    reviews.push(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));
    setReviews(reviews);
  };


  useEffect(() => {
    const bookshelf = JSON.parse(localStorage.getItem("bookshelf")) || {};
    const totalBooksInProfile = (bookshelf.wantToRead || []).length + (bookshelf.favorites || []).length;
    setTotalBooks(totalBooksInProfile);

    const booksRead = JSON.parse(localStorage.getItem("booksRead")) || [];
    const booksThisMonth = booksRead.filter((book) => {
      const date = new Date(book.removedDate);
      return (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      );
    });

    setMonthlyBooksRead(booksThisMonth.length);
    // setTotalBooks(booksRead.length); // Set total books here

  }, []);

  useEffect(() => {
    // Calculate the progress percentage
    const progress = (monthlyBooksRead / goal) * 100;
    setReadingGoalProgress(progress);
  }, [monthlyBooksRead]);

  // Get total books (combining wantToRead and finished)
  // const totalBooks = bookshelf.wantToRead.length + bookshelf.finished.length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white py-10 px-6">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">📊 Your Reading Stats</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {[{
          title: "📚 Total Books",
          value: totalBooks,
          color: "text-blue-600",
          bg: "bg-white",
        }, {
          title: "📅 Books Read This Month",
          value: monthlyBooksRead,
          color: "text-green-600",
          bg: "bg-white",
        }, {
          title: "🌟 Reviews Added",
          value: reviews.length,
          color: "text-yellow-600",
          bg: "bg-white",
        }].map((item, i) => (
          <div key={i} className={`rounded-2xl shadow-md p-6 text-center ${item.bg}`}>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className={`text-3xl font-bold ${item.color}`}>{item.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md mb-10">
        <h3 className="text-2xl font-semibold mb-4 text-purple-700">🎯 Reading Goal Progress</h3>
        <div className="mb-3 flex items-center justify-between">
          <p className="text-lg font-medium">Goal: 50 Books</p>
          <p className="text-lg font-semibold text-blue-700">{readingGoalProgress.toFixed(0)}%</p>
        </div>
        <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transition-all duration-500"
            style={{ width: `${readingGoalProgress}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-teal-600">📝 Reviews</h2>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center">No reviews submitted yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((review, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                <p className="mb-1">
                  <strong>📖 Book:</strong> {review.title} {/* Fix book name */}
                </p>
                <p className="mb-1">
                  <strong>⭐ Rating:</strong>{" "}
                  <span className="text-yellow-500">{"⭐".repeat(review.rating)}</span>
                </p>
                <p className="text-sm text-gray-600">
                  <strong>🗒 Description:</strong> {review.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsPage;


