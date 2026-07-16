import CartWidget from './CartWidget'
import { Link, NavLink } from 'react-router'
import './NavBar.css'

const categories = [
  { id: 1, label: 'Hidromieles', path: 'hidromieles' },
  { id: 2, label: 'Productos de Cera', path: 'cera' },
]

const NavBar = () => {
  return (
    <nav className="navbar">

      <div className="navbar-brand">
        <Link to="/" className="navbar-brand-link">
          <img src="/logo.png" alt="Yggdralixir logo" className="navbar-logo" />
          <div className="navbar-brand-text">
            <span className="navbar-title">Yggdralixir</span>
            <span className="navbar-subtitle">Hidromiel Artesanal</span>
          </div>
        </Link>
      </div>

      <ul className="navbar-links">
        {categories.map((cat) => (
          <li key={cat.id}>
            <NavLink
              to={`/category/${cat.path}`}
              className={({ isActive }) =>
                isActive ? 'navbar-item navbar-item--active' : 'navbar-item'
              }
            >
              {cat.label}
            </NavLink>
          </li>
        ))}
      </ul>

      <CartWidget />

    </nav>
  )
}

export default NavBar
