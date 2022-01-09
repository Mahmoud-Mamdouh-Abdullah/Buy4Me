import './App.css';
import './assets/js/app';
import './assets/css/normalize.css';
import Header from './components/Header';
import CartForm from './components/CartForm';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import ProductsList from './components/ProductsList';
import { RiArrowUpSLine } from 'react-icons/ri';
import ProductDetails from './components/ProductDetails';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import LoadingBar from 'react-redux-loading';
import { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import OrdersList from './components/OrdersList';
import OrderDetails from './components/OrderDetails';
import WishList from './components/WishList';
import Profile from './components/Profile';

function App() {

  const [showUpButton, setShowUpButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const handleScroll = () => {
    if (window.scrollY >= 400) {
      setShowUpButton(true);
    } else {
      setShowUpButton(false);
    }
  }


  return (
    <div className="App">
      <Header />
      <LoadingBar />
      <Routes>
        <Route path="/" element={
          <Home />
        } />

        <Route path="login" element={
          <Login />
        } />

        <Route path="register" element={
          <Registration />
        } />

        <Route path="cart" element={
          <ProtectedRoute component={CartForm} />
        } />

        <Route path="products/:category_name" element={
          <ProductsList />
        } />

        <Route path="product/:id" element={
          <ProductDetails />
        } />

        <Route path="/orders" element={
          <ProtectedRoute component={OrdersList} />
        } />

        <Route path="/orders/id/:id" element={
          <ProtectedRoute component={OrderDetails} />
        } />

        <Route path='/wishlist' element={
          <ProtectedRoute component={WishList} />
        } />

        <Route path='/profile' element={
          <ProtectedRoute component={Profile} />
        } />

        <Route path="/*" element={
          <NotFound />
        } />

      </Routes>

      <Footer />

      {showUpButton === true && (
        <a id='up-button' href="#header" className="to-top">
          <RiArrowUpSLine size={32} color="#FFF" />
        </a>
      )}

    </div>
  );
}

export default App;
