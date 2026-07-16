import './CheckoutForm.css'

const CheckoutForm = ({ values, errors, onChange, onSubmit, isSubmitting }) => {
  return (
    <form className="checkout-form" onSubmit={onSubmit} noValidate>
      <div className="checkout-form-field">
        <label htmlFor="nombre">Nombre completo</label>
        <input id="nombre" name="nombre" type="text" value={values.nombre} onChange={onChange} />
        {errors.nombre && <p className="checkout-form-error">{errors.nombre}</p>}
      </div>

      <div className="checkout-form-field">
        <label htmlFor="telefono">Teléfono</label>
        <input id="telefono" name="telefono" type="tel" value={values.telefono} onChange={onChange} />
        {errors.telefono && <p className="checkout-form-error">{errors.telefono}</p>}
      </div>

      <div className="checkout-form-field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" value={values.email} onChange={onChange} />
        {errors.email && <p className="checkout-form-error">{errors.email}</p>}
      </div>

      <button className="checkout-form-submit" type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Generando orden...' : 'Confirmar compra'}
      </button>
    </form>
  )
}

export default CheckoutForm
