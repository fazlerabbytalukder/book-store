import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-lg font-semibold">BookApp</Link>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/" className="text-white">Home</Link>
                    </li>
                    <li>
                        <Link to="/wishlist" className="text-white">Wishlist</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;