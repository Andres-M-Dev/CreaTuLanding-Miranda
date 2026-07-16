import { useContext } from 'react'
import { Link } from 'react-router'
import { CartContext } from '../context/CartContext'
import './CartWidget.css'

const CartWidget = () => {
  const { getTotalQuantity } = useContext(CartContext)
  const totalQuantity = getTotalQuantity()

  return (
    <Link to="/cart" className="cart-widget">
      <img src="/cart.svg" alt="carrito" className="cart-widget-icon" />
      {totalQuantity > 0 && <p className="contador">{totalQuantity}</p>}
    </Link>
  )
}

export default CartWidget
