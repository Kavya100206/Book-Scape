import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Make sure Firebase is properly set up
import { useNavigate } from "react-router-dom";
import ReviewModal from "./ReviewModal";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [bookshelf, setBookshelf] = useState({
    wantToRead: [],
    favorites: [],
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [selectedBook, setSelectedBook] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  const [monthlyBooksRead, setMonthlyBooksRead] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const handleReviewClick = (book) => {
    setSelectedBook(book);
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmit = (review) => {
    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    storedReviews.push(review); // Ensure review contains title and description
    localStorage.setItem("reviews", JSON.stringify(storedReviews));
  
    const booksReviewedCount = storedReviews.length;
    localStorage.setItem("booksReviewedCount", booksReviewedCount);
    setReviewCount(booksReviewedCount);
  
    setIsReviewModalOpen(false); // Close modal after submit
  };
  

  useEffect(() => {
    const savedBookshelf = localStorage.getItem("bookshelf");
    if (savedBookshelf) {
      setBookshelf(JSON.parse(savedBookshelf));
    }

    const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
    setReviewCount(storedReviews.length);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleFavoriteToggle = (book) => {
    const updatedBookshelf = { ...bookshelf };
    updatedBookshelf.favorites = updatedBookshelf.favorites || [];

    const bookExistsInFavorites = updatedBookshelf.favorites.some(
      (favBook) => favBook.id === book.id
    );

    if (bookExistsInFavorites) {
      updatedBookshelf.favorites = updatedBookshelf.favorites.filter(
        (favBook) => favBook.id !== book.id
      );
    } else {
      updatedBookshelf.favorites.push(book);
    }

    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);
  };

  const handleRemoveFromShelf = (book, shelfType) => {
    const updatedBookshelf = { ...bookshelf };
    updatedBookshelf[shelfType] = updatedBookshelf[shelfType].filter(
      (item) => item.id !== book.id
    );

    localStorage.setItem("bookshelf", JSON.stringify(updatedBookshelf));
    setBookshelf(updatedBookshelf);

    const booksRead = JSON.parse(localStorage.getItem("booksRead")) || [];
    booksRead.push({
      ...book,
      removedDate: new Date().toISOString(),
    });

    localStorage.setItem("booksRead", JSON.stringify(booksRead));

    updateMonthlyBooksRead();
  };

  const updateMonthlyBooksRead = () => {
    const booksRead = JSON.parse(localStorage.getItem("booksRead")) || [];
    const booksThisMonth = booksRead.filter((book) => {
      const date = new Date(book.removedDate);
      return (
        date.getMonth() === new Date().getMonth() &&
        date.getFullYear() === new Date().getFullYear()
      );
    });
  
    console.log("Books Read This Month: ", booksThisMonth.length);  // Add this line for debugging
    setMonthlyBooksRead(booksThisMonth.length);
  };
  

  useEffect(() => {
    updateMonthlyBooksRead();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <div>You must be logged in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gradient-to-br from-indigo-500 via-blue-500 to-teal-500 text-white rounded-xl p-6 mb-8 shadow-xl w-full max-w-sm">
        <h3 className="text-3xl font-bold mb-2">
          Hi, {user.displayName || "Reader"}
        </h3>
        <p className="text-md font-medium">📧 {user.email}</p>
      </div>

      <button className="px-6 py-2 bg-gradient-to-r from-blue-400 to-indigo-600 text-white rounded-lg hover:bg-gradient-to-l mb-6 transition-all duration-300">
        Edit Profile
      </button>

      <section>
        <h3 className="text-3xl font-semibold text-gray-800 mb-6">
          📚 Your Bookshelf
        </h3>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-700">Want to Read</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {bookshelf.wantToRead && bookshelf.wantToRead.length > 0 ? (
              bookshelf.wantToRead.map((book, index) => {
                const key = book.id
                  ? book.id
                  : `${book.volumeInfo.title}-${index}`;
                return (
                  <div
                    key={key}
                    className="w-55 h-110 bg-cover bg-white p-2 border border-gray-200 rounded-lg shadow-lg flex flex-col"
                  >
                    <img
                      src={
                        book.volumeInfo?.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x192"
                      }
                      alt={book.volumeInfo?.title}
                      className="w-full h-full bg-cover object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                    <h5 className="text-lg font-semibold mt-2">
                      {book.volumeInfo?.title}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {book.volumeInfo?.authors?.[0]}
                    </p>

                    <div className="flex justify-end mt-auto space-x-3 text-xl">
                      <span
                        title="Remove from Shelf"
                        className="cursor-pointer hover:text-red-600 transition"
                        onClick={() =>
                          handleRemoveFromShelf(book, "wantToRead")
                        }
                      >
                        ❌
                      </span>
                      <span
                        title="Add to Favorites"
                        className="cursor-pointer hover:text-red-600 transition"
                        onClick={() => handleFavoriteToggle(book)}
                      >
                        ❤️
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-lg">No books in this section.</p>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-2xl font-semibold text-gray-700 flex items-center space-x-2">
            <span role="img" aria-label="Favorites" className="text-2xl">
              ❤️
            </span>
            <span>Your Favorites</span>
          </h4>
          <p className="text-sm text-gray-600 mb-2">
            Books Reviewed: {reviewCount}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-2">
            {bookshelf.favorites && bookshelf.favorites.length > 0 ? (
              bookshelf.favorites.map((book, index) => {
                const key = book.id
                  ? book.id
                  : `${book.volumeInfo.title}-${index}`;
                return (
                  <div
                    key={key}
                    className="w-55 h-110 bg-cover bg-white p-2 border border-gray-200 rounded-lg shadow-lg flex flex-col"
                  >
                    <img
                      src={
                        book.volumeInfo?.imageLinks?.thumbnail ||
                        "https://via.placeholder.com/128x192"
                      }
                      alt={book.volumeInfo?.title}
                      className="w-full h-full bg-cover object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                    />
                    <h5 className="text-lg font-semibold mt-2">
                      {book.volumeInfo?.title}
                    </h5>
                    <p className="text-sm text-gray-500">
                      {book.volumeInfo?.authors?.[0]}
                    </p>

                    <div className="flex justify-end mt-auto space-x-3 text-xl">
                      <span
                        title="Remove from Favorites"
                        className="cursor-pointer hover:text-red-600 transition"
                        onClick={() => handleFavoriteToggle(book)}
                      >
                        ❌
                      </span>
                      <span
                        className="text-2xl cursor-pointer hover:text-blue-500"
                        onClick={() => handleReviewClick(book)}
                      >
                        💬
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-lg">No books in this section.</p>
            )}
            {isReviewModalOpen && (
              <ReviewModal
                book={selectedBook}
                onClose={() => setIsReviewModalOpen(false)}
                onSubmit={handleReviewSubmit}
              />
            )}
          </div>
        </div>
      </section>

      <button
        onClick={() => auth.signOut()}
        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
      >
        Log Out
      </button>
    </div>
  );
};

export default ProfilePage;



