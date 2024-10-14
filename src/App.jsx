import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BookDetails from './components/BookDetails';
import BookList from './components/BoookList';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
