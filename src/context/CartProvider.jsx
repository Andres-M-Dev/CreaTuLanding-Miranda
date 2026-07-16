import { useEffect, useState } from 'react'
import { CartContext } from './CartContext'

const STORAGE_KEY = 'yggdralixir-cart'

const readCartFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY)
  return stored ? JSON.parse(stored) : []
}

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(readCartFromStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart))
  }, [cart])

  const addProductToCart = (product, quantity) => {
    setCart((prevCart) => {
      const alreadyInCart = prevCart.find((item) => item.id === product.id)

      if (alreadyInCart) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        )
      }

      return [...prevCart, { ...product, quantity }]
    })
  }

  const removeProductById = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const clearCart = () => setCart([])

  const isInCart = (productId) => cart.some((item) => item.id === productId)

  const getTotalQuantity = () => cart.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = () => cart.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addProductToCart,
        removeProductById,
        clearCart,
        isInCart,
        getTotalQuantity,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
