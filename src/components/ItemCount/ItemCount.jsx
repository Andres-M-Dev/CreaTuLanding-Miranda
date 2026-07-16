import { useState } from 'react'
import './ItemCount.css'

const ItemCount = ({ stock, addToCart }) => {
  const [count, setCount] = useState(1)

  const decrease = () => {
    if (count > 1) setCount(count - 1)
  }

  const increase = () => {
    if (count < stock) setCount(count + 1)
  }

  return (
    <div className="itemcount">
      <div className="itemcount-controls">
        <button className="itemcount-btn" onClick={decrease}>−</button>
        <span className="itemcount-value">{count}</span>
        <button className="itemcount-btn" onClick={increase}>+</button>
      </div>
      <button className="itemcount-add" onClick={() => addToCart(count)}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount
