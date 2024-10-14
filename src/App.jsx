import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import BookList from './components/BoookList';
import Navbar from './components/Navbar';
import Wishlist from './components/Wishlist';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </Router>
  )
}

export default App
