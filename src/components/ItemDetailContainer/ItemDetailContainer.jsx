import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import { getProductById } from '../../services/firestore'
import ItemDetail from '../ItemDetail/ItemDetail'
import Loading from '../Loading/Loading'

const ItemDetailContainer = () => {
  const { productId } = useParams()
  const navigate = useNavigate()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const data = await getProductById(productId)
        setProduct(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  if (isLoading) return <Loading />

  if (error) return (
    <div style={{ textAlign: 'center', padding: '60px 0' }}>
      <p style={{ fontFamily: "'IM Fell English', serif", fontStyle: 'italic', color: 'var(--color-parchment)', fontSize: '18px' }}>
        {error}
      </p>
      <button
        onClick={() => navigate(-1)}
        style={{ marginTop: '20px', fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.12em', background: 'transparent', border: '1px solid rgba(184,134,11,0.45)', color: 'var(--color-gold-bright)', padding: '10px 24px', cursor: 'pointer' }}
      >
        ← Volver
      </button>
    </div>
  )

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        style={{ fontFamily: "'Cinzel', serif", fontSize: '12px', letterSpacing: '0.1em', background: 'transparent', border: '1px solid rgba(184,134,11,0.4)', color: 'var(--color-gold-bright)', padding: '8px 20px', cursor: 'pointer', marginBottom: '32px' }}
      >
        ← Volver
      </button>
      <ItemDetail product={product} />
    </div>
  )
}

export default ItemDetailContainer
