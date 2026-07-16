import './CartItem.css'

const CartItem = ({ item, onRemove }) => {
  return (
    <li className="cart-item">
      <img className="cart-item-img" src={item.image} alt={item.name} />
      <div className="cart-item-info">
        <p className="cart-item-name">{item.name}</p>
        <p className="cart-item-unit">Precio unitario: ${item.price.toLocaleString('es-CL')}</p>
        <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
      </div>
      <div className="cart-item-actions">
        <p className="cart-item-subtotal">
          ${(item.price * item.quantity).toLocaleString('es-CL')}
        </p>
        <button className="cart-item-remove" onClick={() => onRemove(item.id)}>
          Eliminar
        </button>
      </div>
    </li>
  )
}

export default CartItem
