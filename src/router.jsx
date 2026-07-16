import { createBrowserRouter } from 'react-router'
import LayoutApp from './layouts/LayoutApp'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ErrorPage from './pages/ErrorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'category/:category',
        element: <CategoryPage />
      },
      {
        path: 'detail/:productId',
        element: <ProductDetailPage />
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'checkout',
        element: <CheckoutPage />
      },
      {
        path: '*',
        element: <ErrorPage statusCode={404} message="Página no encontrada" />
      }
    ]
  }
])
