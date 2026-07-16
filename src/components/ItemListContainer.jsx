import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getProducts } from '../services/firestore'
import ItemList from './ItemList/ItemList'
import Loading from './Loading/Loading'
import './ItemListContainer.css'

const ItemListContainer = ({ saludo }) => {
  const { category } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getProducts(category)
        setProducts(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [category])

  if (isLoading) return <Loading />

  if (error) return (
    <div className="item-list-container">
      <p className="item-list-container-saludo">{error}</p>
    </div>
  )

  return (
    <div className="item-list-container-wrapper">
      <div className="item-list-header">
        {category && (
          <button className="btn-volver" onClick={() => navigate(-1)}>
            ← Volver
          </button>
        )}
        <h2 className="item-list-titulo">
          {category ? `${saludo} ${category}` : saludo}
        </h2>
      </div>

      <ItemList products={products} />
    </div>
  )
}

export default ItemListContainer
