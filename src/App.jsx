import { RouterProvider } from 'react-router'
import { router } from './router'
import CartProvider from './context/CartProvider'
import './App.css'

function App() {
  return (
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  )
}

export default App
