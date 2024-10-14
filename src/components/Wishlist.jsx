import { useState } from "react";
import { Link } from "react-router-dom";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl mb-4">Wishlist</h2>
            {wishlist.length === 0 ? (
                <p>Your wishlist is empty.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {wishlist.map((book) => (
                        <div key={book.id} className="border p-3 rounded-md relative">
                            <div className='p-3 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1)] rounded-md bg-gray-50 relative'>
                                <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover rounded-md hover:scale-105 transition-all delay-75" />
                            </div>
                            <div className='pb-10'>
                                <h3 className="mt-2 text-lg font-semibold">
                                    <span
                                        className="block overflow-hidden whitespace-nowrap text-ellipsis hover:whitespace-normal hover:overflow-visible hover:max-h-full transition-all"
                                    >
                                        {book.title}
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
            )
            }
        </div >
    );
};

export default Wishlist;