import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <>
      <nav className="nav">
        <NavLink to="/" className="nav-logo">
          <div className="nav-logo-mark">ॐ</div>
          <div>Kashi <span style={{ fontWeight: 400 }}>Shakti</span></div>
        </NavLink>
        
        <div className="nav-menu">
          <NavLink to="/vrat" className="nav-link">Vrat & Upvas</NavLink>
          <NavLink to="/festivals" className="nav-link">Festivals</NavLink>
          <NavLink to="/puja" className="nav-link">Puja</NavLink>
          <NavLink to="/temples" className="nav-link">Temples</NavLink>
          <NavLink to="/blogs" className="nav-link">Blogs</NavLink>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span className="lang-toggle" style={{ cursor: 'pointer' }}>A/अ</span>
          <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
      
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/vrat" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Vrat & Upvas</NavLink>
          <NavLink to="/festivals" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Festivals</NavLink>
          <NavLink to="/puja" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Puja</NavLink>
          <NavLink to="/temples" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Temples</NavLink>
          <NavLink to="/blogs" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>Blogs</NavLink>
        </div>
      )}
    </>
  )
}

export default Navbar
