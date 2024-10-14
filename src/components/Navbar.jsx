const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <a href="/" className="text-white text-lg">Book Finder</a>
                <a href="/wishlist" className="text-white">Wishlist</a>
            </div>
        </nav>
    );
};

export default Navbar;