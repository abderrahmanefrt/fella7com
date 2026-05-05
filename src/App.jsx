import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';
import Home from './pages/Home';
import ListingDetail from './pages/ListingDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Premium from './pages/Premium';
import CreateListing from './pages/CreateListing';
import Products from './pages/Products';
import Profile from './pages/Profile';
import NewArrivals from './pages/NewArrivals';
import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/premium" element={<Premium />} />
          <Route path="/post" element={<CreateListing />} />
          <Route path="/search" element={<Products />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/new" element={<NewArrivals />} />
        </Routes>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default App;
