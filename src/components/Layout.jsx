import Header from './Header';
import Footer from './Footer';
import { Routes, Route } from 'react-router-dom';
import Shop from '../pages/Shop';
import Cart from '../pages/Cart';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="container content">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
