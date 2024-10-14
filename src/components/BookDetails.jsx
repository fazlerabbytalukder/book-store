import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingBookDetails from './LoadingBookDetails';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await axios.get(`https://gutendex.com/books/?ids=${id}`);
                setBook(response.data.results[0]);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching book details:", error);
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (loading) {
        return <div><LoadingBookDetails /></div>;
    }

    if (!book) {
        return <div className="text-center mt-10">Book not found</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex flex-col md:flex-row gap-5">
                <div className='w-full md:w-[30%]'>
                    <img src={book.formats['image/jpeg']} alt={book.title} className="w-full h-auto" />
                </div>
                <div className='w-full md:w-[70%]'>
                    <div className='text-left'>
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <h2 className="text-xl mt-2"><span className='font-bold'>Author:</span> {book.authors[0].name}</h2>
                        <p className="mt-2"><span className='font-bold'>ID:</span> {book.id}</p>
                        <p className="mt-2"><span className='font-bold'>Genres:</span> {book.subjects.join(', ')}</p>
                        <p className="mt-2"><span className='font-bold'>Bookshelves:</span> {book.bookshelves.join(', ')}</p>
                        <p className="mt-2"><span className='font-bold'>Download:</span> {book.download_count}</p>
                        <p className="mt-2"><span className='font-bold'>Languages:</span> {book.languages.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;