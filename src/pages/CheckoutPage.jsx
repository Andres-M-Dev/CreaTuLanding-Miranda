import { useContext, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import { CartContext } from '../context/CartContext'
import { createOrder } from '../services/firestore'
import CheckoutForm from '../components/CheckoutForm/CheckoutForm'
import './CheckoutPage.css'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const CheckoutPage = () => {
  const { cart, clearCart, getTotalPrice } = useContext(CartContext)

  const [values, setValues] = useState({ nombre: '', telefono: '', email: '' })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderId, setOrderId] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const newErrors = {}

    if (!values.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio'
    if (!values.telefono.trim()) newErrors.telefono = 'El teléfono es obligatorio'
    if (!values.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!EMAIL_REGEX.test(values.email)) {
      newErrors.email = 'El email no es válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validate()) return

    setIsSubmitting(true)

    try {
      const order = {
        buyer: values,
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total: getTotalPrice()
      }

      const newOrderId = await createOrder(order, cart)

      clearCart()
      setOrderId(newOrderId)
      toast.success('¡Orden generada correctamente!')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (orderId) {
    return (
      <div className="checkout-success">
        <p className="checkout-success-rune">ᚠ</p>
        <p className="checkout-success-message">¡Gracias por tu compra!</p>
        <p className="checkout-success-order">Guarda el id de tu orden: {orderId}</p>
        <Link to="/" className="checkout-success-link">Volver al inicio</Link>
      </div>
    )
  }

  if (cart.length === 0) {
    return (
      <div className="checkout-success">
        <p className="checkout-success-message">No puedes finalizar una compra con el carrito vacío.</p>
        <Link to="/" className="checkout-success-link">Volver al inicio</Link>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <h2 className="checkout-titulo">Finalizar compra</h2>
      <p className="checkout-total">Total a pagar: ${getTotalPrice().toLocaleString('es-CL')}</p>
      <CheckoutForm
        values={values}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  )
}

export default CheckoutPage
