import { Link } from 'react-router'
import './Item.css'

const Item = ({ product }) => {
  return (
    <li className="item-card">
      <div className="item-card-img-container">
        <img className="item-card-img" src={product.image} alt={product.name} />
      </div>
      <div className="item-card-body">
        <p className="item-card-name">{product.name}</p>
        <p className="item-card-price">${product.price.toLocaleString('es-CL')}</p>
        <Link to={`/detail/${product.id}`} className="item-card-btn">
          Ver detalle
        </Link>
      </div>
    </li>
  )
}

export default Item
