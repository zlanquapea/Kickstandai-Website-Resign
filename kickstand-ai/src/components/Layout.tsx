import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function Layout() {
  return (
    <div className="bg-bg-primary min-h-screen text-text-primary font-sans">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
