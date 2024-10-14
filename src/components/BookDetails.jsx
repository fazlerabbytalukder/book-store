import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://gutendex.com/books/?ids=${id}`);
                setBook(response.data.results[0]); // API returns an array, pick the first result
                setLoading(false);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    if (!book) {
        return <div className="text-center mt-10">Book not found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col items-center">
                <img src={book.formats['image/jpeg']} alt={book.title} className="w-64 h-auto" />
                <h1 className="text-3xl font-bold mt-4">{book.title}</h1>
                <h2 className="text-xl mt-2">Author: {book.authors[0].name}</h2>
                <p className="mt-2">Subjects: {book.subjects.join(', ')}</p>
                <p className="mt-2">Languages: {book.languages.join(', ')}</p>
                <a
                    href={book.formats['text/html']}
                    className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Read the Book
                </a>
            </div>
        </div>
    );
};

export default BookDetails;