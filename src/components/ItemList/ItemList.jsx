import Item from '../Item/Item'
import './ItemList.css'

const ItemList = ({ products }) => {
  if (products.length === 0) {
    return (
      <p className="itemlist-empty">
        No hay productos en esta categoría.
      </p>
    )
  }

  return (
    <ul className="itemlist">
      {products.map((product) => (
        <Item product={product} key={product.id} />
      ))}
    </ul>
  )
}

export default ItemList
