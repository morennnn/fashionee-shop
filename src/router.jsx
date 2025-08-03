import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Shop from './pages/Shop';
import Cart from './pages/Cart';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Shop /> },
      { path: 'cart', element: <Cart /> },
    ],
  },
]);
