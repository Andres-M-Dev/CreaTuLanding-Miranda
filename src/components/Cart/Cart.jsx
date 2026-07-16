import { useContext } from 'react'
import { Link } from 'react-router'
import { CartContext } from '../../context/CartContext'
import CartItem from '../CartItem/CartItem'
import './Cart.css'

const Cart = () => {
  const { cart, removeProductById, clearCart, getTotalPrice } = useContext(CartContext)

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <p className="cart-empty-message">Tu carrito está vacío.</p>
        <Link to="/" className="cart-empty-link">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="cart">
      <h2 className="cart-titulo">Tu carrito</h2>

      <ul className="cart-list">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} onRemove={removeProductById} />
        ))}
      </ul>

      <div className="cart-footer">
        <button className="cart-vaciar" onClick={clearCart}>
          Vaciar carrito
        </button>
        <p className="cart-total">Total: ${getTotalPrice().toLocaleString('es-CL')}</p>
        <Link to="/checkout" className="cart-checkout-link">
          Finalizar compra
        </Link>
      </div>
    </div>
  )
}

export default Cart
