



import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Flashcard from "./Flashcard";
import { auth } from "../firebase";

const HomePage = () => {
  const bookQuote = "“The only way to do great work is to love what you do.” — Steve Jobs";
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [genres, setGenres] = useState([
    "Fiction", "Non-fiction", "Science", "Fantasy", "Biography", "Mystery"
  ]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        setError(null);

        const featuredResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: 'bestsellers', maxResults: 5 },
        });
        setFeaturedBooks(featuredResponse.data.items || []);

        const trendingResponse = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: 'trending', maxResults: 5 },
        });
        setTrendingBooks(trendingResponse.data.items || []);
      } catch (err) {
        setError("Failed to load books. Please try again later.");
        console.error('Error fetching books:', err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });

    fetchBooks();

    return () => unsubscribe();
  }, []);

  const [bookshelf, setBookshelf] = useState(() => {
    return JSON.parse(localStorage.getItem('bookshelf')) || {
      wantToRead: [],
    };
  });

  const handleAddToShelf = (book) => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || {
      wantToRead: [],
    };

    const isBookAlreadyAdded = storedBookshelf.wantToRead.some(
      (existingBook) => existingBook.id === book.id
    );

    if (isBookAlreadyAdded) {
      console.log('This book is already in your bookshelf.');
      return;
    }

    storedBookshelf.wantToRead.push(book);
    localStorage.setItem('bookshelf', JSON.stringify(storedBookshelf));
    setBookshelf(storedBookshelf);
    console.log(`${book.title} added to the bookshelf!`);
  };

  const handleGenreClick = async (genre) => {
    setSelectedGenre(genre);
    try {
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: { q: genre, maxResults: 10 },
      });
      setTrendingBooks(response.data.items || []);
    } catch (err) {
      setError("Failed to load books for this genre. Please try again later.");
      console.error('Error fetching genre books:', err);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
        <p className="text-lg text-gray-700 animate-pulse">Loading books...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-red-50">
        <p className="text-lg text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  return (
    

    <div className="container mx-auto px-6 py-12 max-w-7xl">
  {/* Welcome Section */}
  <section className="text-center mb-16">
    <h1 className="text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 text-transparent bg-clip-text mb-4 drop-shadow-md">
      Welcome to BookScape
    </h1>
    <p className="text-xl text-gray-600 italic max-w-2xl mx-auto">
      {bookQuote}
    </p>
  </section>

  {/* Featured Books */}
  <section className="mb-20">
    <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <span className="text-blue-500">📚</span> Featured Books
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {featuredBooks.length ? (
        featuredBooks.map((book) => (
          <Flashcard key={book.id} book={book} onAddToShelf={() => handleAddToShelf(book)} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No featured books available at the moment.</p>
      )}
    </div>
  </section>

  {/* Trending Books */}
  <section className="mb-20">
    <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <span className="text-purple-500">🔥</span> Trending Books
    </h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
      {trendingBooks.length ? (
        trendingBooks.map((book) => (
          <Flashcard key={book.id} book={book} onAddToShelf={() => handleAddToShelf(book)} />
        ))
      ) : (
        <p className="text-gray-500 col-span-full">No trending books available at the moment.</p>
      )}
    </div>
  </section>

  {/* Genre Filter */}
  <section className="mb-20">
    <h2 className="text-4xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <span className="text-green-500">🎨</span> Explore by Genre
    </h2>
    <div className="flex flex-wrap gap-4 mb-8">
      {genres.map((genre, index) => (
        <button
          key={index}
          onClick={() => handleGenreClick(genre)}
          className={`px-6 py-2 rounded-full font-medium shadow-md transition duration-200 ease-in-out border hover:scale-105 ${
            selectedGenre === genre
              ? "bg-green-600 text-white border-green-700"
              : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {genre}
        </button>
      ))}
    </div>

    {selectedGenre && (
      <>
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">
          Books in <span className="text-green-600">{selectedGenre}</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {trendingBooks.length ? (
            trendingBooks.map((book) => (
              <Flashcard key={book.id} book={book} onAddToShelf={() => handleAddToShelf(book)} />
            ))
          ) : (
            <p className="text-gray-500 col-span-full">No books found for this genre.</p>
          )}
        </div>
      </>
    )}
  </section>
</div>

  );
};

export default HomePage;
