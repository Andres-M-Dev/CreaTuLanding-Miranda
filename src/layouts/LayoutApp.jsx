import NavBar from '../components/NavBar'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './LayoutApp.css'

const LayoutApp = () => {
  return (
    <>
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  )
}

export default LayoutApp
