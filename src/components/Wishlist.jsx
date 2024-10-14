import { useState } from "react";

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
                        <div key={book.id} className="border p-4">
                            <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-48 object-cover" />
                            <h3 className="mt-2 text-lg font-semibold">{book.title}</h3>
                            <p>{book.authors.map(author => author.name).join(', ')}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;