import axios from 'axios';
import { useEffect, useState } from 'react';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
    const [genre, setGenre] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchBooks();
    }, [searchQuery, genre, page]);

    const fetchBooks = async () => {
        const response = await axios.get(`https://gutendex.com/books`, {
            params: {
                search: searchQuery,
                topic: genre,
                page: page
            }
        });
        setBooks(response.data.results);
    };

    const toggleWishlist = (book) => {
        let updatedWishlist = [...wishlist];
        if (wishlist.find(item => item.id === book.id)) {
            updatedWishlist = wishlist.filter(item => item.id !== book.id);
        } else {
            updatedWishlist.push(book);
        }
        setWishlist(updatedWishlist);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search books..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border"
                />
                <select value={genre} onChange={(e) => setGenre(e.target.value)} className="p-2 border">
                    <option value="">All Genres</option>
                    <option value="fiction">Fiction</option>
                    <option value="non-fiction">Non-Fiction</option>
                    {/* Add more genre options */}
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {books.map((book) => (
                    <div key={book.id} className="border p-4">
                        <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover" />
                        <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
                        <p>{book.authors.map(author => author.name).join(', ')}</p>
                        <button
                            onClick={() => toggleWishlist(book)}
                            className={`mt-2 ${wishlist.find(item => item.id === book.id) ? 'text-red-600' : 'text-gray-500'}`}
                        >
                            {wishlist.find(item => item.id === book.id) ? '❤️' : '🤍'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <button onClick={() => setPage(page - 1)} disabled={page === 1} className="p-2 border">Previous</button>
                <button onClick={() => setPage(page + 1)} className="p-2 border ml-2">Next</button>
            </div>
        </div>
    );
};

export default BookList;