import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBooks from './LoadingBooks';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [genre, setGenre] = useState('');
    const [nextPage, setNextPage] = useState(null);
    const [prevPage, setPrevPage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [noBooksFound, setNoBooksFound] = useState(false);

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_URL;
        fetchBooks(apiUrl);
    }, []);

    const fetchBooks = async (url) => {
        setLoading(true);
        try {
            const response = await axios.get(url);
            const { results, next, previous } = response.data;
            setBooks(results);
            setFilteredBooks(results);
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

        const filtered = books.filter((book) =>
            book.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredBooks(filtered);
        setNoBooksFound(filtered.length === 0);
    };

    const handleGenreChange = (e) => {
        setGenre(e.target.value);

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

    const truncateTitle = (title, wordLimit) => {
        const words = title.split(' ');
        return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : title;
    };

    return (
        <div className="container mx-auto py-4">
            <div className="flex justify-between mb-4">
                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search books by title..."
                    value={searchQuery}
                    onChange={handleSearch}
                    className="p-2 border rounded-md"
                />

                {/* Genre Dropdown */}
                <select value={genre} onChange={handleGenreChange} className="p-2 border rounded-md">
                    <option value="">All Genres</option>
                    <option value="fiction">Fiction</option>
                    <option value="science fiction">Science Fiction</option>
                    <option value="horror">Horror</option>
                </select>
            </div>

            {/* Loading Spinner */}
            {loading && <div><LoadingBooks /></div>}

            {/* No books found */}
            {!loading && noBooksFound && <div className="text-center text-gray-500">No books found</div>}

            {/* Book List */}
            {!loading && !noBooksFound && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="border p-3 rounded-md relative">
                            <div className='p-3 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] rounded-md bg-gray-50 relative'>
                                <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover rounded-md hover:scale-105 transition-all delay-75" />
                                <button
                                    onClick={() => toggleWishlist(book)}
                                    className={`absolute rounded-tr-md rounded-bl-md shadow-md top-0 right-0 bg-blue-600 p-1 ${wishlist.find((item) => item.id === book.id) ? 'text-red-600' : 'text-gray-500'}`}
                                >
                                    {wishlist.find((item) => item.id === book.id) ? '❤️' : '🤍'}
                                </button>
                            </div>
                            <div className='pb-10'>
                                <h3 className="mt-2 text-lg font-semibold">
                                    <span
                                        className="block overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible hover:max-h-full transition-all"
                                        title={book.title}
                                    >
                                        {truncateTitle(book.title, 20)}
                                    </span>
                                </h3>
                                <div className='py-2'>
                                    <p className='text-left'><span className='font-bold'>ID:</span> {book.id}</p>
                                    <p className='text-left'><span className='font-bold'>Authors:</span> {book.authors.map((author) => author.name).join(', ')}</p>
                                    <p className='text-left'><span className='font-bold'>Genres:</span> {book.subjects.join(', ')}</p>
                                </div>
                            </div>
                            <div className='absolute bottom-[10px] w-full'>
                                <Link
                                    to={`/book/${book.id}`}
                                    className="w-full bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-700 transition"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="mt-4 flex justify-center">
                {prevPage && (
                    <button onClick={() => handlePagination(prevPage)} className="p-2 border rounded-md">
                        Previous
                    </button>
                )}
                {nextPage && (
                    <button onClick={() => handlePagination(nextPage)} className="p-2 border rounded-md ml-2">
                        Next
                    </button>
                )}
            </div>
        </div>
    );
};

export default BookList;