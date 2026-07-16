import { useContext } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { CartContext } from '../../context/CartContext'
import ItemCount from '../ItemCount/ItemCount'
import './ItemDetail.css'

const ItemDetail = ({ product }) => {
  const { addProductToCart, isInCart } = useContext(CartContext)

  const handleAddToCart = (quantity) => {
    addProductToCart(product, quantity)
    toast.success(`Agregaste ${quantity} unidad(es) de "${product.name}" al carrito`)
  }

  return (
    <div className="itemdetail">
      <div className="itemdetail-img-container">
        <img className="itemdetail-img" src={product.image} alt={product.name} />
      </div>
      <div className="itemdetail-info">
        <p className="itemdetail-name">{product.name}</p>
        <p className="itemdetail-description">{product.description}</p>
        <div className="itemdetail-divider" />
        <p className="itemdetail-price">${product.price?.toLocaleString('es-CL')}</p>
        <p className="itemdetail-stock">Stock disponible: {product.stock} unidades</p>

        {product.stock === 0 ? (
          <p className="itemdetail-sin-stock">Producto sin stock</p>
        ) : isInCart(product.id) ? (
          <Link to="/cart" className="itemdetail-ver-carrito">
            Ya está en tu carrito · Ver carrito
          </Link>
        ) : (
          <ItemCount stock={product.stock} addToCart={handleAddToCart} />
        )}
      </div>
    </div>
  )
}

export default ItemDetail
