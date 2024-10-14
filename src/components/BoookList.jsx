import axios from 'axios';
import { useEffect, useState } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]); // For storing filtered results
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [genre, setGenre] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noBooksFound, setNoBooksFound] = useState(false);

    useEffect(() => {
        fetchBooks(`https://gutendex.com/books`);
    }, []);

    const fetchBooks = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            const { results, next, previous } = response.data;
            setBooks(results);
            setFilteredBooks(results); // Initialize filtered books to all books
            setNextPage(next);
            setPrevPage(previous);
            setNoBooksFound(results.length === 0);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
        setLoading(false);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);

        // Filter books based on title
        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBooks(filtered);
        setNoBooksFound(filtered.length === 0);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);

        // Filter books by genre (if applicable) and search term (if any)
        const filtered = books.filter((book) =>
            (e.target.value === '' || book.subjects.some((subject) => subject.toLowerCase().includes(e.target.value.toLowerCase()))) &&
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBooks(filtered);
        setNoBooksFound(filtered.length === 0);
    };

    const handlePagination = (url) => {
        if (url) fetchBooks(url);
    };

    const toggleWishlist = (book) => {
        let updatedWishlist = [...wishlist];
        if (wishlist.find((item) => item.id === book.id)) {
            updatedWishlist = wishlist.filter((item) => item.id !== book.id);
        } else {
            updatedWishlist.push(book);
        }
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search books by title..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 border"
                />

                {/* Genre Dropdown */}
                <select value={genre} onChange={handleGenreChange} className="p-2 border">
                    <option value="">All Genres</option>
                    <option value="fiction">Fiction</option>
                    <option value="science fiction">Science Fiction</option>
                    <option value="horror">Horror</option>
                    {/* Add more genre options as needed */}
                </select>
            </div>

            {/* Loading Spinner */}
            {loading && <div className="text-center">Loading...</div>}

            {/* No books found */}
            {!loading && noBooksFound && <div className="text-center text-gray-500">No books found</div>}

            {/* Book List */}
            {!loading && !noBooksFound && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="border p-4">
                            <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
                            <p>{book.authors.map((author) => author.name).join(', ')}</p>
                            <button
                                onClick={() => toggleWishlist(book)}
                                className={`mt-2 ${wishlist.find((item) => item.id === book.id) ? 'text-red-600' : 'text-gray-500'}`}
                            >
                                {wishlist.find((item) => item.id === book.id) ? '❤️' : '🤍'}
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center">
                {prevPage && (
                    <button onClick={() => handlePagination(prevPage)} className="p-2 border">
                        Previous
                    </button>
                )}
                {nextPage && (
                    <button onClick={() => handlePagination(nextPage)} className="p-2 border ml-2">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookList;