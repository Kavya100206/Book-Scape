const SearchBar = ({ setBooks }) => {
    const [query, setQuery] = useState('');
  
    const handleSearch = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
          params: { q: query, maxResults: 40 },
        });
        setBooks(response.data.items);  // Update books state in HomePage
      } catch (err) {
        console.error('Error fetching books:', err);
      }
    };
  
    return (
      <div className="flex items-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a book..."
          className="p-2 w-full border border-gray-300 rounded-l-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded-r-lg hover:bg-blue-700"
        >
          Search
        </button>
      </div>
    );
  };
  