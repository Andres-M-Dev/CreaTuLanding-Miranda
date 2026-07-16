import { Link } from 'react-router'
import './ErrorPage.css'

const ErrorPage = ({ statusCode = 500, message = "Algo salió mal" }) => {
  return (
    <div className="error-page">
      <p className="error-rune">ᚠ</p>
      <h2 className="error-code">{statusCode}</h2>
      <p className="error-message">{message}</p>
      <Link to="/" className="error-link">Volver al inicio</Link>
    </div>
  )
}

export default ErrorPage
